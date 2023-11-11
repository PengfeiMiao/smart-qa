import json


class Question:
    def __init__(self, question: str, options: dict, answer: str, vote: str, id=None):
        self.id = id
        self.question = question
        self.options = options
        self.answer = answer
        self.vote = vote

    def to_dict(self):
        obj_dict = vars(self)
        obj_dict.pop('id', None)
        return obj_dict

    def to_string(self):
        options = '\n'.join(self.options)
        vote_answer = self.vote.split(' ')[0]
        return f"Question: {self.question}\n" \
               f"{options}\n" \
               f"Candidate Answer: {self.answer} or {vote_answer}\n"

    @staticmethod
    def parse(row):
        return Question(
            row[1],
            json.loads(row[2]),
            row[3],
            row[4],
            row[0]
        )
