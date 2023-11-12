from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.encoders import jsonable_encoder
from typing import Optional

from backend.entity.dataset import Dataset
from backend.entity.page import Page
from backend.entity.question import Question
from backend.model.dataset_model import DatasetModel
from backend.service.openai_helper import OpenAIHelper
from backend.service.pg_helper import PgDBHelper
from backend.util.mapper import clear_dict

app = FastAPI()
pgHelper = PgDBHelper()
openai = OpenAIHelper()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/saa")
async def get_saa(page: Optional[int] = 1, size: Optional[int] = 10):
    if page < 1:
        page = 1
    table = 'questions'
    total = pgHelper.count(table)
    rows = pgHelper.get_all(table, page, size)
    return Page([Question.parse(row) for row in rows], total, page, size)


@app.get("/saa/{id}")
async def analyze_saa(id: int) -> StreamingResponse:
    table = 'questions'
    row = pgHelper.get(table, id)
    prompt = """
    请结合 AWS 相关知识，完成以下步骤：
    1. 中文翻译题目；
    2. 中文翻译每一个选项并简要分析每个选项是否为最佳答案，
    【ex. 分析：\nA. 使用 某 AWS 服务A解决。因为,,,所以不是最佳答案；\nB. 使用 某 AWS 服务B解决。因为,,,所以是最佳答案】
    3. 根据可能的答案选出唯一的最佳答案。
    【ex. 最佳答案：X】
    4. 最后提取 2 到 4 个关键字，
    【ex. 关键字：S3、RDS、安全性、可扩展性、弹性、最小运营、最小成本】；
    """
    message = Question.parse(row).to_string()
    return StreamingResponse(openai.completions(message, prompt), media_type="text/event-stream")


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
