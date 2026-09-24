import os
import logging
import sqlite3
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class DatabaseService:
    def __init__(self):
        self.db_path = os.getenv("SQLITE_DB_PATH", ".tmp/student_report.db")
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)

    def get_connection(self, create_db_if_missing: bool = False):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                roll_no TEXT NOT NULL,
                class_name TEXT NOT NULL,
                name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (roll_no, class_name)
            );
            """)

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS attendance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                roll_no TEXT NOT NULL,
                class_name TEXT NOT NULL,
                date TEXT NOT NULL,
                status TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_att_roll_class ON attendance (roll_no, class_name);")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_att_date ON attendance (date);")

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS tests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                roll_no TEXT NOT NULL,
                class_name TEXT NOT NULL,
                date TEXT NOT NULL,
                subject TEXT NOT NULL,
                marks REAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_tests_roll_class ON tests (roll_no, class_name);")

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS exams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                roll_no TEXT NOT NULL,
                class_name TEXT NOT NULL,
                date TEXT NOT NULL,
                subject TEXT NOT NULL,
                marks REAL NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_exams_roll_class ON exams (roll_no, class_name);")

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS whatsapp_sessions (
                sender_phone TEXT PRIMARY KEY,
                roll_no TEXT NOT NULL,
                class_name TEXT NOT NULL,
                name TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)

            conn.commit()
            conn.close()
            logger.info("✅ SQLite database and tables initialized successfully.")
        except Exception as e:
            logger.error(f"❌ Failed to initialize SQLite database: {e}")
            raise

    def execute_query(self, query: str, args=None, fetchall: bool = False, fetchone: bool = False):
        query = query.replace("%s", "?")
        conn = self.get_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(query, args or ())
            
            if fetchone:
                row = cursor.fetchone()
                return dict(row) if row else None
            if fetchall:
                rows = cursor.fetchall()
                return [dict(r) for r in rows]
            
            conn.commit()
            return cursor.rowcount
        finally:
            conn.close()

    def execute_many(self, query: str, args_list: list):
        if not args_list:
            return 0
        query = query.replace("%s", "?")
        conn = self.get_connection()
        try:
            cursor = conn.cursor()
            cursor.executemany(query, args_list)
            conn.commit()
            return cursor.rowcount
        finally:
            conn.close()

    def save_session(self, sender_phone: str, roll_no: str, class_name: str, name: str):
        q = """
        INSERT INTO whatsapp_sessions (sender_phone, roll_no, class_name, name)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(sender_phone) DO UPDATE SET roll_no = excluded.roll_no, class_name = excluded.class_name, name = excluded.name;
        """
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute(q, (sender_phone, roll_no, class_name, name))
            conn.commit()
            conn.close()
        except Exception as e:
            logger.error(f"Failed to save session: {e}")

    def get_session(self, sender_phone: str) -> dict | None:
        q = "SELECT roll_no, class_name, name FROM whatsapp_sessions WHERE sender_phone = ?"
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute(q, (sender_phone,))
            row = cursor.fetchone()
            conn.close()
            return dict(row) if row else None
        except Exception as e:
            logger.error(f"Failed to get session: {e}")
            return None

    def delete_session(self, sender_phone: str):
        q = "DELETE FROM whatsapp_sessions WHERE sender_phone = ?"
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute(q, (sender_phone,))
            conn.commit()
            conn.close()
        except Exception as e:
            logger.error(f"Failed to delete session: {e}")

db_service = DatabaseService()
