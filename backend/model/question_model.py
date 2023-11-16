from typing import Union
from pydantic import BaseModel


class QuestionModel(BaseModel):
    id: int
    question: Union[str, None] = None
    options: Union[dict, None] = None
    answer: Union[str, None] = None
    vote: Union[str, None] = None
    dataset_id: Union[int, None] = None
    analysis: Union[str, None] = None
