import re

from backend.entity.dataset import Dataset
from backend.entity.question import Question
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
    file_path = 'resource/file/examtopics-all.pdf'
    # questions = pdfHelper.load_file(file_path)
    # pgHelper.execute_sql('resource/db/schema.sql')
    # pgHelper.clear('questions')
    # for item in questions:
    #     print(item.to_dict())
    #     pgHelper.save('questions', item.to_dict())

    pgHelper.update('datasets', Dataset('AWS SAA C03', 623, ['S3', 'CloudFront', '最低成本', '最小运营'], [
        {"role": "user", "content": "{question}"},
        {"role": "system", "content": """
        请结合 AWS 相关知识，完成以下步骤：
        1. 中文翻译题目；
        2. 中文翻译每一个选项并简要分析每个选项是否为最佳答案，
        【ex. 分析：\nA. 使用 某 AWS 服务A解决。因为,,,所以不是最佳答案；\nB. 使用 某 AWS 服务B解决。因为,,,所以是最佳答案】
        3. 根据可能的答案选出唯一的最佳答案。
        【ex. 最佳答案：X】
        4. 最后提取 2 到 4 个关键字，
        【ex. 关键字：S3、RDS、安全性、可扩展性、弹性、最小运营、最小成本】；
        """},
    ], id=1).to_dict(ignore_id=False))
    # pgHelper.get_all('questions', page_size=10)
    pgHelper.close()
    # openAIHelper.completions('请告诉我1加1等于几')

