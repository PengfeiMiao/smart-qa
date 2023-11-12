import json

from backend.util.mapper import to_dict


class Dataset:
    def __init__(self, name: str, total: int, tags: list, prompts, created_at=None, visibility=True, id=None):
        self.id = id
        self.name = name
        self.total = total
        self.tags = tags
        self.prompts = prompts
        self.created_at = created_at
        self.visibility = visibility

    def to_dict(self):
        return to_dict(self)

    @staticmethod
    def parse(row: list):
        return Dataset(
            row[1],
            row[2],
            json.loads(row[3]),
            json.loads(row[4]),
            row[5],
            row[6],
            row[0]
        )
