const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const listEditRouter = require('./list-edit-router');
const listViewRouter = require('./list-view-router');

app.use(express.json());

dotenv.config();

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

app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'No se encontró la tarea con el ID proporcionado.' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar las credenciales del usuario
  if (username === 'Andres' && password === '900726') {
    // Generar un token JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  } else if (username === 'Estiv' && password === '123456') {
    // Generar un token JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Middleware para validar el token JWT
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  } else {
    res.status(401).json({ error: 'Token de autenticación no encontrado' });
  }
};

// Ruta protegida
app.get('/protected', validateToken, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

app.listen(4000, () => {
  console.log('Servidor iniciado en http://localhost:4000');
});
