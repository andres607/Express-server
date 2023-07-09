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

app.get('/tasks/all', (req, res) => {
  res.json(tasks);
});

app.listen(4000, () => {
  console.log('Servidor iniciado en http://localhost:4000');
});
