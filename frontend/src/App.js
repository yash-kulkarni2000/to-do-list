import React, {useState, useEffect} from "react";
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/tasks').then(response => {
      console.log(response.data)
      setTasks(response.data);
    }).catch(error => {
      console.error("Error fetching tasks: ", error);
    });
  }, []);
  
  return (
    <div className="App">
      <h1>To-Do List App</h1>
      <h2>The tasks are - </h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
