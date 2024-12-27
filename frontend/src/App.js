import React, {useState, useEffect} from "react";
import axios from 'axios';
import {
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from '@mui/material';
import { Edit, Delete, Download, Save, Cancel } from '@mui/icons-material';


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

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

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:5000/tasks/${id}`).then(response => {
      console.log(response.data.message);
      setTasks(tasks.filter(task => task.id !== id));
    })
    .catch(error => console.error('Error deleting task:', error));
  };

  const startEdit = (id, title) => {
    setEditingTask(id);
    setEditedTaskTitle(title);
  }

  const saveEdit = (id) => {
    axios.put(`http://127.0.0.1:5000/tasks/${id}`, {title: editedTaskTitle}).then(response => {
      setTasks(tasks.map(task =>
        task.id === id ? {...task, title: response.data.title} : task
      ));
      setEditingTask(null);
      setEditedTaskTitle('');
    })
    .catch(error => console.error('Error updating task:', error));
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditedTaskTitle('');
  }

  const handleDownload = () => {
    window.open('http://127.0.0.1:5000/download', '_blank');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        To-Do List App
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Enter a new task"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>

      <Typography variant="h6">The tasks are:</Typography>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} divider>
          <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id, task.completed)}
                />
            {editingTask === task.id ? (
              <>
                <TextField
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <ListItemSecondaryAction>
                  <IconButton color="success" onClick={() => saveEdit(task.id)}>
                    <Save />
                  </IconButton>
                  <IconButton color="secondary" onClick={cancelEdit}>
                    <Cancel />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            ) : (
              <>
                <ListItemText
                  primary={task.title}
                  secondary={task.completed ? 'Completed' : 'Pending'}
                />
                <ListItemSecondaryAction>
                  <IconButton color="primary" onClick={() => startEdit(task.id, task.title)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteTask(task.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Download />}
          onClick={handleDownload}
        >
          Download Tasks
        </Button>
      </Box>
    </Container>
  );
}

export default App;
