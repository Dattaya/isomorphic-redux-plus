import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import reject from 'lodash/reject';
import map from 'lodash/map';

const router = Router(); // eslint-disable-line new-cap

let todos = [
  { id: '1', text: 'Todo item 1', dateCreated: Date.now() },
  { id: '2', text: 'Todo item 2', dateCreated: Date.now() + 1 },
  { id: '3', text: 'Todo item 3', dateCreated: Date.now() + 2 },
  { id: '4', text: 'Todo item 4', dateCreated: Date.now() + 3 },
  { id: '5', text: 'Todo item 5', dateCreated: Date.now() + 4 },
];
let lastIndex = 5;

router.get('/about', (req, res) => {
  fs.readFile(path.join(__dirname, '../../../README.md'), { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      res.json({ text: data });
    }
  });
});

router.get('/todos', (req, res) => {
  // Uncomment one of these to see error handling system at work
  // return res.sendStatus(500);
  // return res.sendStatus(404);
  res.json(todos);
});

router.post('/todos', (req, res) => {
  if (req.session.user) {
    const todo = { ...req.body, id: String(++lastIndex) };
    todos = [...todos, todo];
    return res.json(todo);
  }
  return res.sendStatus(401);
});

router.put('/todos/:id', (req, res) => {
  if (req.session.user) {
    const id = req.body.id;
    todos = map(todos, (todo) => (id === todo.id ? req.body : todo));
    return res.json(req.body);
  }
  return res.sendStatus(401);
});

router.delete('/todos/:id', (req, res) => {
  if (req.session.user) {
    const id = req.params.id;
    todos = reject(todos, ['id', id]);
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

router.get('/loadAuth', (req, res) => {
  res.send(req.session.user);
});

router.post('/login', (req, res) => {
  const { name, pass } = req.body;
  if (name === 'demo' && pass === 'demo') {
    req.session.user = 'demo'; // eslint-disable-line no-param-reassign
    return res.send(req.session.user);
  }

  return res.sendStatus(401);
});

router.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.user = ''; // eslint-disable-line no-param-reassign
  }
  res.sendStatus(200);
});

export default router;
