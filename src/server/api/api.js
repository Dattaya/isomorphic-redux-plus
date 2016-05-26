import { Router } from 'express';
import fs         from 'fs';
import path       from 'path';
import marked     from 'marked';

const router = Router();

let todos = {
  '1': {id: '1', text: 'Todo item 1', dateUpdated: Date.now()},
  '2': {id: '2', text: 'Todo item 2', dateUpdated: Date.now()},
  '3': {id: '3', text: 'Todo item 3', dateUpdated: Date.now()},
  '4': {id: '4', text: 'Todo item 4', dateUpdated: Date.now()},
  '5': {id: '5', text: 'Todo item 5', dateUpdated: Date.now()}
};
let lastIndex = 5;

router.get('/about', (req, res) => {
  fs.readFile(path.join(__dirname, '../../../README.md'), {encoding: 'utf-8'}, function (err, data) {
    if (!err) {
      res.json({'text': marked(data)});
    } else {
      console.log(err);
    }
  });
});

router.get('/todos', (req, res) => {
  res.json(todos);
});

router.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (todos[id]) {
    return res.json(todos[id])
  }
  return res.sendStatus(404);
});

router.post('/todos', (req, res) => {
  if (req.session.user) {
    const id = ++lastIndex;
    todos[id] = {...req.body, id};
    return res.json(todos[id]);
  }
  return res.sendStatus(401);
});

router.put('/todos/:id', (req, res) => {
  if (req.session.user) {
    const id = req.body.id;
    if (id && todos[id]) {
      todos[id] = req.body;
      return res.json(todos[id]);
    }
    return res.sendStatus(400);
  }
  return res.sendStatus(401);
});

router.delete('/todos/:id', (req, res) => {
  if (req.session.user) {
    const id = req.params.id;
    if (id && todos[id]) {
      delete todos[id];
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  }
  return res.sendStatus(401);
});

router.get('/loadAuth', (req, res) => {
  res.send(req.session.user);
});

router.post('/login', (req, res) => {
  const { login, pass } = req.body;
  if (login === 'demo' && pass === 'demo') {
    req.session.user = 'demo';
    return res.send(req.session.user);
  }

  return res.sendStatus(401);
});

router.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.user = '';
  }
  res.sendStatus(200);
});

export default router;
