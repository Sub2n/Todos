const router = require('express').Router();
const Todo = require('../models/todo');

// Find All
router.get('/', (req, res) => {
  Todo.findAll()
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post('/', (req, res) => {
  Todo.create(req.body)
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Update All
router.patch('/', (req, res) => {
  Todo.updateAll(req.body)
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.patch('/:id([0-9]+)', (req, res) => {
  Todo.updateByTodoid(req.params.id, req.body)
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Delete by id
router.delete('/:id([0-9]+)', (req, res) => {
  Todo.deleteByTodoid(req.params.id)
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Delete by completed
router.delete('/completed', (req, res) => {
  Todo.deleteByCompleted()
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
