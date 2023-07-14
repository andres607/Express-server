const express = require('express');
const app = express();
const listEditRouter = require('./list-edit-router');
const listViewRouter = require('./list-view-router');

app.use(express.json());

const validateMethod = (req, res, next) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(req.method)) {
    res.status(405).json({ error: 'Método HTTP no válido.' });
  } else {
    next();
  }
};

app.use(validateMethod);

let tasks = [];
let taskIdCounter = 1;

app.use('/edit', listEditRouter(tasks, taskIdCounter));
app.use('/view', listViewRouter(tasks));

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.completed);
  res.json(completedTasks);
});

app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  res.json(incompleteTasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id === id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'No se encontró la tarea con el ID proporcionado.' });
  }
});

app.listen(4000, () => {
  console.log('Servidor iniciado en http://localhost:4000');
});
