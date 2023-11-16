from typing import Union
from pydantic import BaseModel


class NoteModel(BaseModel):
    id: Union[int, None] = None
    note: Union[str, None] = None
    tags: Union[list, None] = None
    dataset_id: Union[int, None] = None
    question_id: Union[int, None] = None
    created_at: Union[str, None] = None
