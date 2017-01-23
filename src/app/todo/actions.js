import { getTodo } from './selectors';
import { setStatus } from 'status/actions';

import {
  LOAD_TODOS,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from './types';


export const loadTodos = () => ({ client, store }) => ({
  type: LOAD_TODOS,
  payload: client.get('/todos').catch((err) => {
    store.dispatch(setStatus(err.response.status));
  }),
});

export const createTodo = (text) => ({ client }) => ({
  type: CREATE_TODO,
  payload: client.post('/todos', { text, dateCreated: Date.now() }),
});

export const editTodo = (id, text) => ({ store, client }) => {
  const todo = getTodo(id)(store.getState());
  const updated = { ...todo, id, text };

  return {
    type: EDIT_TODO,
    payload: client.put(`/todos/${id}`, updated),
  };
};

export const deleteTodo = (id) => ({ client }) => ({
  type: DELETE_TODO,
  payload: client.delete(`/todos/${id}`),
  meta: { id },
});
