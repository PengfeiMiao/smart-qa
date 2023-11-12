from typing import Union
from pydantic import BaseModel


class DatasetModel(BaseModel):
    id: int
    name: Union[str, None] = None
    total: Union[str, None] = None
    tags: Union[list, None] = None
    prompts: Union[list, None] = None
    created_at: Union[str, None] = None
    visibility: Union[bool, None] = None
