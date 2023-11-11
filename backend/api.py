from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from typing import Optional

from backend.entity.page import Page
from backend.entity.question import Question
from backend.service.openai_helper import OpenAIHelper
from backend.service.pg_helper import PgDBHelper

app = FastAPI()
pgHelper = PgDBHelper()
openai = OpenAIHelper()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/saa")
async def get_saa(page: Optional[int] = 1, size: Optional[int] = 10):
    table = 'questions'
    total = pgHelper.count(table)
    rows = pgHelper.get_all(table, page, size)
    return Page([Question.parse(row) for row in rows], total, page, size)


@app.get("/saa/{id}")
async def analyze_saa(id: int):
    table = 'questions'
    row = pgHelper.get(table, id)
    prompt = '请结合 AWS 相关知识以及候选答案，帮我翻译并简要分析题干和各个选项，给出正确答案'
    message = Question.parse(row).to_string()

    return StreamingResponse(openai.completions(message, prompt), media_type="text/plain")
