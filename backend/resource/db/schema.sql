-- table schema
CREATE TABLE IF NOT EXISTS datasets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    total INTEGER,
    tags TEXT,
    prompts TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visibility BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    options TEXT,
    answer VARCHAR(20),
    vote VARCHAR(255),
    dataset_id INTEGER NOT NULL,
    analysis TEXT
);

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    note TEXT NOT NULL,
    tags VARCHAR(500),
    dataset_id INTEGER,
    question_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- default data
INSERT INTO datasets (name, total, tags, prompts)
VALUES ('AWS SAA C03', 623, '["S3", "CloudFront", "安全性", "可扩展性", "最低成本", "最小运营"]', '[
  {
    "role": "system",
    "content": "对以下问题请帮我选出唯一的正确答案："
  },
  {
    "role": "user",
    "content": "{question}"
  },
  {
    "role": "system",
    "content": "请结合 AWS 相关知识，完成以下步骤：\n1. 中文翻译题目；\n2. 中文翻译每一个选项并简要分析每个选项是否符合题目要求，是否为最佳答案，\n【ex. 选项分析：\n选项X. 因为服务 X 不具备...，和选项Y相比不满足...要求，所以不是最佳答案；\n选项Y. 因为服务 Y具备...，所以是最佳答案】\n3. 结合题目要求，选出最佳答案，如果有多个可能的答案，选出唯一一个。\n4. 最后提取 2 到 4 个关键字，关键字个数不要超过4个，\n【ex. 关键字：S3、RDS、安全性、可扩展性、弹性、最小运营、最小成本】"
  }
]');