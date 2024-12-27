import React, {useState, useEffect} from "react";
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/tasks').then(response => {
      console.log(response.data)
      setTasks(response.data);
    }).catch(error => {
      console.error("Error fetching tasks: ", error);
    });
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }

    axios.post('http://127.0.0.1:5000/tasks', { title: newTask, completed: false}).then(response => {
      setTasks([...tasks, response.data]);
      setNewTask('');
    })
  }

  const toggleTaskCompletion = (id, completed) => {
    axios.put(`http://127.0.0.1:5000/tasks/${id}`, { completed: !completed })
        .then(response => {
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, completed: response.data.completed } : task
            ));
        })
        .catch(error => console.error('Error updating task:', error));
};

  return (
    <div className="App">
      <h1>To-Do List App</h1>
      <div>
        <input type="text" placeholder="Enter a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <h2>The tasks are - </h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
          <label>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id, task.completed)}/>
            {task.title} - {task.completed ? "Completed" : "Pending"}
          </label></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
