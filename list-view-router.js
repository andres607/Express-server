const express = require('express');
const router = express.Router();

module.exports = tasks => {
  const validateParams = (req, res, next) => {
    const validParams = ['completed-tasks', 'incomplete-tasks'];
    const param = req.params.param;

    if (!validParams.includes(param)) {
      res.status(400).json({ error: 'Parámetro inválido.' });
    } else {
      next();
    }
  };

  router.get('/:param', validateParams, (req, res) => {
    const param = req.params.param;

    if (param === 'completed-tasks') {
      const completedTasks = tasks.filter(task => task.completed);
      res.json(completedTasks);
    } else if (param === 'incomplete-tasks') {
      const incompleteTasks = tasks.filter(task => !task.completed);
      res.json(incompleteTasks);
    }
  });

  return router;
};