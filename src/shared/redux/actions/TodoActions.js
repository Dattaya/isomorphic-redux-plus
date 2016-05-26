export const loadTodos = () => ({
  type:    'LOAD_TODOS',
  role:    'primary',
  promise: client => client.get('/todos')
});

export const loadTodo = (id) => ({
  type:    'LOAD_TODO',
  role:    'primary',
  promise: client => client.get('/todos/' + id)
});

export const createTodo = (text) => ({
  type:    'CREATE_TODO',
  promise: client => client.post('/todos', {text, dateUpdated: Date.now()})
});

export const editTodo = (id, text) => ({
  type:    'EDIT_TODO',
  promise: client => client.put('/todos/' + id, {text, id, dateUpdated: Date.now()})
});

export const deleteTodo = (id) => ({
  type:    'DELETE_TODO',
  promise: client => client.delete('/todos/' + id),
           id
});
