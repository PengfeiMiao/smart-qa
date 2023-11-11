class Page:
    def __init__(self, data: list, total: int, page: int, size: int):
        self.data = data
        self.total = total
        self.page = page
        self.size = size

    def to_dict(self):
        return vars(self)
