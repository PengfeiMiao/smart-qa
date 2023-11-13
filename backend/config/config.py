import os

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_SCHEMA = os.getenv("DB_SCHEMA", "smart_qa")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PWD = os.getenv("DB_PWD", "jigsaw123")
OPENAI_ORG = os.getenv("OPENAI_ORG", "org-Y8JdtcpPxpndnpvYGhCt2hgE")
OPENAI_KEY = os.getenv("OPENAI_KEY", "sk-xxx")
