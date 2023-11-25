from typing import Union
from pydantic import BaseModel


class NoteQueryModel(BaseModel):
    note: Union[str, None] = None
    tags: Union[list, None] = None
    tags_all_match: Union[bool, None] = False
    dataset_id: Union[int, None] = None
    question_id: Union[int, None] = None
