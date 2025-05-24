import sqlite3
from datetime import datetime

DB_PATH = "database.db"

def registrar_evento(nombre_evento):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS eventos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_evento TEXT,
            timestamp TEXT
        )
    ''')
    cursor.execute('''
        INSERT INTO eventos (nombre_evento, timestamp)
        VALUES (?, ?)
    ''', (nombre_evento, datetime.now().isoformat()))

def get_eventos():
    conn = sqlite3.connect("database.db")
    c = conn.cursor()
    c.execute("SELECT * FROM eventos ORDER BY timestamp DESC LIMIT 50")
    eventos = [{"id": row[0], "evento": row[1], "timestamp": row[2]} for row in c.fetchall()]
    conn.close()
    return eventos

    conn.commit()
    conn.close()
