import json

from backend.util.mapper import to_dict


class Note:
    def __init__(self, note: str, tags: list, dataset_id: int, question_id: int, created_at: str, id=None):
        self.id = id
        self.note = note
        self.tags = tags
        self.dataset_id = dataset_id
        self.question_id = question_id
        self.created_at = created_at

    def to_dict(self, ignore_id=False):
        return to_dict(self, ignore_id=ignore_id)

    @staticmethod
    def parse(row):
        return Note(
            row[1],
            json.loads(row[2]),
            row[3],
            row[4],
            row[5],
            row[0]
        )
