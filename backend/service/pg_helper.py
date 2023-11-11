import json

import psycopg2
from ..config.config import DB_HOST, DB_SCHEMA, DB_USER, DB_PWD


class PgDBHelper:
    def __init__(self):
        self.conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_SCHEMA,
            user=DB_USER,
            password=DB_PWD
        )
        self.cur = self.conn.cursor()

    def test_connection(self):
        try:
            self.cur.execute('SELECT version()')
            db_version = self.cur.fetchone()[0]
            print(f"Connected to PostgreSQL. Database version: {db_version}")
        except psycopg2.Error as e:
            print(f"Error connecting to PostgreSQL: {e}")

    def execute_sql(self, filename):
        # 读取 SQL 脚本文件内容
        with open(filename, 'r') as file:
            sql_script = file.read()
        # 使用事务执行 SQL 脚本
        try:
            self.cur.execute(sql_script)
            self.conn.commit()
            print("Schema initialized successfully.")
        except psycopg2.Error as e:
            self.conn.rollback()
            print(f"Error initializing schema: {e}")
        finally:
            self.close()

    def save(self, table, data):
        try:
            # 处理 json 类型数据
            data_copy = data.copy()
            for key, value in data_copy.items():
                if isinstance(value, dict):
                    data_copy[key] = json.dumps(value)
            columns = ', '.join(data_copy.keys())
            placeholders = ', '.join(['%s'] * len(data_copy))
            query = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
            self.cur.execute(query, list(data_copy.values()))
            self.conn.commit()
            print("Data saved successfully.")
        except psycopg2.Error as e:
            print(f"Error saving data: {e}")

    def delete(self, table, data_id):
        try:
            query = f"DELETE FROM {table} WHERE id = %s"
            self.cur.execute(query, (data_id,))
            self.conn.commit()
            print("Data deleted successfully.")
        except psycopg2.Error as e:
            print(f"Error deleting data: {e}")

    def get_all(self, table, page=1, page_size=10):
        try:
            offset = (page - 1) * page_size
            query = f"SELECT * FROM {table} ORDER BY id LIMIT %s OFFSET %s"
            self.cur.execute(query, (page_size, offset))
            rows = self.cur.fetchall()
            for row in rows:
                print(row)
            return rows
        except psycopg2.Error as e:
            print(f"Error retrieving data: {e}")

    def count(self, table):
        try:
            query = f"SELECT COUNT(*) FROM {table}"
            self.cur.execute(query)
            count = self.cur.fetchone()[0]
            return count
        except psycopg2.Error as e:
            print(f"Error counting data: {e}")

    def get(self, table, data_id):
        try:
            query = f"SELECT * FROM {table} WHERE id = %s"
            self.cur.execute(query, (data_id,))
            row = self.cur.fetchone()
            if row:
                print(row)
                return row
            else:
                print("Data not found.")
        except psycopg2.Error as e:
            print(f"Error retrieving data: {e}")

    def clear(self, table):
        try:
            query = f"TRUNCATE {table}"
            self.cur.execute(query)
            restart_query = f"ALTER SEQUENCE {table}_id_seq RESTART WITH 1"
            self.cur.execute(restart_query)
            self.conn.commit()
            print("Deleted rows successfully.")
        except psycopg2.Error as e:
            print(f"Error deleting rows: {e}")

    def close(self):
        self.cur.close()
        self.conn.close()
        print("Database connection closed.")
