const express = require('express');
const app = express();
const port = 4000;

let tasks = [];
let taskIdCounter = 1;

app.use(express.json());

app.post('/tasks', (req, res) => {
  const { description } = req.body;
  const id = taskIdCounter++;

  const task = {
    id,
    description,
    completed: false
  };

  tasks.push(task);

  res.json({ message: 'La tarea se añadió correctamente.', task });
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada con éxito.' });
  } else {
    res.status(404).json({ error: 'No se encontró la tarea con el ID proporcionado.' });
  }
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = true;
    res.json({ message: 'Tarea completada.', task });
  } else {
    res.status(404).json({ error: 'No se encontró la tarea con el ID proporcionado.' });
  }
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
