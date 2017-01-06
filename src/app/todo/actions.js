import { getTodo } from './selectors';
import { createRequest } from 'lib/promiseMiddleware';
import {
  LOAD_TODOS,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from './types';


export const loadTodos = () => createRequest(LOAD_TODOS, {
  method: 'GET',
  url: '/todo',
}, { role: 'primary' });

export const createTodo = (text) => createRequest(CREATE_TODO, {
  method: 'POST',
  url: '/todos',
  data: { text, dateCreated: Date.now() },
});

export const editTodo = (id, text) => (dispatch, getState) => {
  dispatch(createRequest(EDIT_TODO, {
    method: 'PUT',
    url: `/todos/${id}`,
    data: { ...getTodo(id)(getState()), id, text },
  }));
};

export const deleteTodo = (id) => createRequest(DELETE_TODO, {
  method: 'DELETE',
  url: `/todos/${id}`,
}, { id });
