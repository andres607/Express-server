const express = require('express');
const router = express.Router();

module.exports = (tasks, taskIdCounter) => {
  router.post('/create-task', (req, res) => {
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

  router.delete('/delete-task/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      res.json({ message: 'Tarea eliminada con éxito.' });
    } else {
      res.status(404).json({ error: 'No se encontró la tarea con el ID proporcionado.' });
    }
  });

  router.put('/update-task/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);
    if (task) {
      task.completed = true;
      res.json({ message: 'Tarea completada.', task });
    } else {
      res.status(404).json({ error: 'No se encontró la tarea con el ID proporcionado.' });
    }
  });

  return router;
};