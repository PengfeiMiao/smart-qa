from typing import Optional

from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import StreamingResponse, JSONResponse

from backend.config.config import SECRET_KEY
from backend.entity.dataset import Dataset
from backend.entity.note import Note
from backend.entity.page import Page
from backend.entity.question import Question
from backend.model.dataset_model import DatasetModel
from backend.model.note_model import NoteModel
from backend.model.note_query_model import NoteQueryModel
from backend.model.question_model import QuestionModel
from backend.model.user_model import UserModel
from backend.service.openai_helper import OpenAIHelper
from backend.service.pg_helper import PgDBHelper
from backend.util.mapper import clear_dict, group_dict

app = FastAPI()
pgHelper = PgDBHelper()
openai = OpenAIHelper()
unauthorized_res = JSONResponse(
    status_code=status.HTTP_401_UNAUTHORIZED,
    content={"detail": "Unauthorized"},
    headers={"WWW-Authenticate": "Bearer"})


@app.middleware("http")
async def check_authorization(request: Request, call_next):
    if request.url.path != "/login":
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith('Bearer ') or auth_header.split(' ')[1] != SECRET_KEY:
            return unauthorized_res

    response = await call_next(request)
    return response


@app.post("/login")
async def login(data: UserModel):
    data_dict = jsonable_encoder(data)
    if data_dict['password'] != SECRET_KEY:
        return unauthorized_res
    return {"status": True}


@app.get("/datasets/{dataset_id}/questions")
async def get_questions(dataset_id: int, page: Optional[int] = 1, size: Optional[int] = 10):
    if page < 1:
        page = 1
    table = 'questions'
    filters = {'dataset_id': dataset_id}
    total = pgHelper.count(table, filters)
    rows = pgHelper.get_all(table, page, size, filters)
    # filter notes by question_ids
    filters['question_id'] = [row[0] for row in rows]
    sub_rows = pgHelper.get_all('notes', filters=filters)
    note_dict = group_dict([Note.parse(sub_row) for sub_row in sub_rows], 'question_id')
    # compose notes to questions
    questions = []
    for row in rows:
        question = Question.parse(row)
        question.with_notes(note_dict.get(row[0], []))
        questions.append(question)
    return Page(questions, total, page, size)


@app.get("/datasets/{dataset_id}/questions/{id}")
async def analyze_question(dataset_id: int, id: int) -> StreamingResponse:
    config = pgHelper.get('datasets', dataset_id)
    prompts = Dataset.parse(config).prompts
    row = pgHelper.get('questions', id)
    message = Question.parse(row).to_string()
    return StreamingResponse(openai.completions(message, prompts), media_type="text/event-stream")


@app.patch("/datasets/{dataset_id}/questions/{id}")
async def update_question(dataset_id: int, id: int, data: QuestionModel):
    table = 'questions'
    data_dict = jsonable_encoder(data)
    data_dict['id'] = id
    data_dict['dataset_id'] = dataset_id
    pgHelper.update(table, clear_dict(data_dict))
    return Question.parse(pgHelper.get(table, id))


@app.get("/datasets")
async def get_datasets(page: Optional[int] = 1, size: Optional[int] = 10):
    if page < 1:
        page = 1
    table = 'datasets'
    total = pgHelper.count(table)
    rows = pgHelper.get_all(table, page, size)
    return Page([Dataset.parse(row) for row in rows], total, page, size)


@app.patch("/datasets/{id}")
async def update_dataset(id: int, data: DatasetModel):
    table = 'datasets'
    data_dict = jsonable_encoder(data)
    data_dict['id'] = id
    pgHelper.update(table, clear_dict(data_dict))
    return Dataset.parse(pgHelper.get(table, id))


@app.post("/notes")
async def create_note(data: NoteModel):
    table = 'notes'
    data_dict = jsonable_encoder(data)
    pid = pgHelper.save(table, clear_dict(data_dict))
    return Note.parse(pgHelper.get(table, pid))


@app.patch("/notes/{id}")
async def update_note(id: int, data: NoteModel):
    table = 'notes'
    data_dict = jsonable_encoder(data)
    data_dict['id'] = id
    pid = pgHelper.update(table, clear_dict(data_dict))
    return Note.parse(pgHelper.get(table, pid))


@app.put("/notes")
async def upsert_note(data: NoteModel):
    table = 'notes'
    data_dict = jsonable_encoder(data)
    if data_dict.get('question_id') is not None:
        filters = {'question_id': data_dict['question_id']}
        if data_dict.get('id') is not None:
            filters['id'] = data_dict.get('id')
        rows = pgHelper.get_all(table, filters=filters)
        if rows is not None and len(rows) > 0:
            updated = Note.parse(rows[0])
            updated.note = data_dict['note']
            updated.tags = data_dict['tags']
            updated.dataset_id = data_dict['dataset_id']
            pgHelper.update(table, updated.to_dict())
            return Note.parse(pgHelper.get(table, updated.id))

    pid = pgHelper.save(table, clear_dict(data_dict))
    return Note.parse(pgHelper.get(table, pid))


@app.post("/notes/search")
async def get_questions(query: NoteQueryModel, page: Optional[int] = 1, size: Optional[int] = 10):
    table = 'notes'
    data_dict = jsonable_encoder(query)
    filters = {'tags': data_dict['tags'], 'note': data_dict['note']}
    matches = {'tags': data_dict['tags_all_match'], 'note': True}
    total = pgHelper.count(table, filters, matches)
    rows = pgHelper.get_all(table, page, size, filters, matches)
    return Page([Note.parse(row) for row in rows], total, page, size)
