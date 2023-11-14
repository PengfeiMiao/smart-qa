from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.encoders import jsonable_encoder
from typing import Optional

from backend.entity.dataset import Dataset
from backend.entity.page import Page
from backend.entity.question import Question
from backend.model.dataset_model import DatasetModel
from backend.model.question_model import QuestionModel
from backend.service.openai_helper import OpenAIHelper
from backend.service.pg_helper import PgDBHelper
from backend.util.mapper import clear_dict

app = FastAPI()
pgHelper = PgDBHelper()
openai = OpenAIHelper()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/datasets/{dataset_id}/questions")
async def get_questions(dataset_id: int, page: Optional[int] = 1, size: Optional[int] = 10):
    if page < 1:
        page = 1
    table = 'questions'
    filters = {'dataset_id': dataset_id}
    total = pgHelper.count(table, filters)
    rows = pgHelper.get_all(table, page, size, filters)
    return Page([Question.parse(row) for row in rows], total, page, size)


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
