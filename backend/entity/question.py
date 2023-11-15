import json

from backend.util.mapper import to_dict


class Question:
    def __init__(self, question: str, options: dict, answer: str, vote: str, dataset_id: int, analysis: str, id=None):
        self.id = id
        self.question = question
        self.options = options
        self.answer = answer
        self.vote = vote
        self.dataset_id = dataset_id
        self.analysis = analysis
        self.notes = []

    def with_notes(self, notes: list):
        self.notes = notes

    def to_dict(self):
        return to_dict(self)

    def to_string(self):
        options = '\n'.join([f"{key}. {self.options[key]}" for key in self.options])
        vote_answer = self.vote.split(' ')[0]
        alter_answers = self.answer if self.answer == vote_answer else f"{self.answer} or {vote_answer}"
        return f"Question: {self.question}\n" \
               f"{options}\n" \
               f"Possible answers: {alter_answers}\n"

    @staticmethod
    def parse(row):
        return Question(
            row[1],
            json.loads(row[2]),
            row[3],
            row[4],
            row[5],
            row[6],
            row[0]
        )
