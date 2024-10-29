from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)
db_path = "notes.db"

with sqlite3.connect(db_path) as connection:
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL
        )
    """)

@app.route('/')
def index():
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM notes")
        notes = cursor.fetchall()
    return render_template('index.html', notes=notes)

@app.route('/add', methods=['POST'])
def add_note():
    content = request.form['content']
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute("INSERT INTO notes (content) VALUES (?)", (content,))
    return redirect(url_for('index'))

@app.route('/edit/<int:note_id>')
def edit(note_id):
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM notes WHERE id=?", (note_id,))
        note = cursor.fetchone()
    return render_template('edit.html', note=note)

@app.route('/update/<int:note_id>', methods=['POST'])
def update(note_id):
    content = request.form['content']
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute("UPDATE notes SET content=? WHERE id=?", (content, note_id))
    return redirect(url_for('index'))

@app.route('/delete/<int:note_id>')
def delete(note_id):
    with sqlite3.connect(db_path) as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM notes WHERE id=?", (note_id,))
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
