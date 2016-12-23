import {
  LOAD_TODOS,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from './types';
import {
  getTodo,
} from './selectors';

export const loadTodos = () => ({
  type: LOAD_TODOS,
  role: 'primary',
  promise: ({ client }) => client.get('/todos'),
});

export const createTodo = (text) => ({
  type: CREATE_TODO,
  promise: ({ client }) => client.post('/todos', { text, dateCreated: Date.now() }),
});

export const editTodo = (id, text) => (dispatch, getState) => {
  const todo = getTodo(getState(), id);
  dispatch({
    type: EDIT_TODO,
    promise: ({ client }) => client.put(`/todos/${id}`, { ...todo, id, text }),
  });
};

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  promise: ({ client }) => client.delete(`/todos/${id}`),
  id,
});
