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
    dataset_id INTEGER NOT NULL
);

-- default data
INSERT INTO datasets (name, total, tags, prompts)
VALUES ('AWS SAA', 623, 'S3, CloudFront, 最低成本, 最小运营', '[]');