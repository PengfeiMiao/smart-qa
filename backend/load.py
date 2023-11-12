import re

from backend.service.openai_helper import OpenAIHelper
from backend.service.pdf_helper import PDFHelper
from backend.service.pg_helper import PgDBHelper

question_regex = re.compile(
    # r'Question #(\d+)\n(.*?)(A\..*?)Correct Answer: ([A-Z])Community vote distribution([A-Z]? \(\d+%\).*?)\n',
    r'Question\s#(\d+)\sTopic\s\d+\n(.*?)(A\..*?)Correct Answer: ([A-ZΑΒС].*?)\nCommunity vote distribution\n([A-ZΑΒС]+\s\(\d+%\).*?(?=\n|$))',
    re.DOTALL
)
option_regex = re.compile(
    # r'(?:^|\.)([A-Z])\.\s(.*?)(?=\.[A-Z]\.\s|$)',
    r'(?:^|\n)([A-ZΑΒС])\.\s(.*?)(?=\n[A-ZΑΒС]\.\s|\n$)',
    re.DOTALL
)
pdfHelper = PDFHelper(option_regex=[option_regex], question_regex=[question_regex])
pgHelper = PgDBHelper()
openAIHelper = OpenAIHelper()


if __name__ == "__main__":
    # pgHelper.execute_sql('resource/db/schema.sql')
    file_path = 'resource/file/examtopics-all.pdf'
    questions = pdfHelper.load_file(file_path)
    pgHelper.clear('questions')
    for item in questions:
        print(item.to_dict())
        pgHelper.save('questions', item.to_dict())
    pgHelper.close()
    # openAIHelper.completions('请告诉我1加1等于几')

