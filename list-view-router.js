const express = require('express');
const router = express.Router();

module.exports = tasks => {
  router.get('/', (req, res) => {
    res.json(tasks);
  });

  return router;
};
