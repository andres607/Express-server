const express = require('express');
const app = express();
const listEditRouter = require('./list-edit-router');
const listViewRouter = require('./list-view-router');

app.use(express.json());

let tasks = [];
let taskIdCounter = 1;

app.use('/edit', listEditRouter(tasks, taskIdCounter));
app.use('/view', listViewRouter(tasks));

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(4000, () => {
  console.log('Servidor iniciado en http://localhost:4000');
});
