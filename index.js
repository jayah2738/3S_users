const express = require('express');
const cors = require('cors');
const { error } = require('console');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];
let nextId = 1;

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const todo = { id: nextId++, text: req.body.text };
  todos.push(todo);
  res.status(201).json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(204);
});

app.put('/todos/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const updateText = req.body.text;

  const todo = todos.find(t => t.id === id);
  if(!todo) {
    return res.status(404).json({error:'Todo not found'});
  }

  todo.text = updateText;
  res.json(todo);
});

app.listen(4000, () => {
  console.log('API running on http://localhost:4000');
});
