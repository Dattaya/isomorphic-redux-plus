import { Router } from 'express';
import fs         from 'fs';
import path       from 'path';
import marked     from 'marked';

const router = Router();
let todos = ['Todo item 1', 'Todo item 2', 'Todo item 3', 'Todo item 4', 'Todo item 5'];

router.get('/about', (req, res) => {
  fs.readFile(path.join(__dirname, '../README.md'), {encoding: 'utf-8'}, function (err, data) {
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

router.post('/todos', (req, res) => {
  if (req.session.user) {
    todos.push(req.body.text);
    return res.json(req.body);
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
    res.send(req.session.user);
  } else {
    res.sendStatus(401);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.user = '';
  }
  res.sendStatus(200);
});

export default router;
