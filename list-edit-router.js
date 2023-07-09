const express = require("express");
const router = express.Router();

module.exports = (tasks, taskIdCounter) => {
  const validateRequestBody = (req, res, next) => {
    if (req.method === "POST" && Object.keys(req.body).length === 0) {
      res.status(400).json({ error: "La solicitud no tiene información." });
    } else if (
      req.method === "POST" &&
      (!req.body.description || typeof req.body.description !== "string")
    ) {
      res
        .status(400)
        .json({ error: "La solicitud no contiene una descripción válida." });
    } else if (req.method === "PUT" && Object.keys(req.body).length === 0) {
      res.status(400).json({ error: "La solicitud no tiene información." });
    } else if (
      req.method === "PUT" &&
      (req.body.completed === undefined ||
        typeof req.body.completed !== "boolean")
    ) {
      res.status(400).json({
        error: "La solicitud no contiene un estado válido.",
      });
    } else {
      next();
    }
  };

  router.post("/create-task", validateRequestBody, (req, res) => {
    const { description } = req.body;
    const id = taskIdCounter++;

    const task = {
      id,
      description,
      completed: false,
    };

    tasks.push(task);

    res.json({ message: "La tarea se añadió correctamente.", task });
  });

  router.delete("/delete-task/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      res.json({ message: "Tarea eliminada con éxito." });
    } else {
      res
        .status(404)
        .json({ error: "No se encontró la tarea con el ID proporcionado." });
    }
  });

  router.put("/update-task/:id", validateRequestBody, (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.completed = req.body.completed;
      res.json({ message: "Tarea actualizada.", task });
    } else {
      res
        .status(404)
        .json({ error: "No se encontró la tarea con el ID proporcionado." });
    }
  });

  return router;
};