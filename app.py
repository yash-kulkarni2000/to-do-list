from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    completed = db.Column(db.Boolean, default = False)

with app.app_context():
    db.create_all()

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{'id': task.id, 'title': task.title, 'completed': task.completed} for task in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = Task(title = data['title'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'id': new_task.id, 'title': new_task.title, 'completed':new_task.completed}), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json
    task.title = data.get('title', task.title)
    task.completed = data.get('completed', task.completed)
    db.session.commit()
    return jsonify({'id': task.id, 'title': task.title, 'completed': task.completed})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True)



