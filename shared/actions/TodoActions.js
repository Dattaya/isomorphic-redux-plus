export const getTodos = () => ({
  type:    'GET_TODOS',
  promise: client => client.get('/todos')
});

export const createTodo = (text) => ({
  type:    'CREATE_TODO',
  promise: client => client.post('/todos', {time: Date.now(), text})
});

export const editTodo = (id, text) => ({
        id,
        text,
  type: 'EDIT_TODO',
  date: Date.now()
});

export const deleteTodo = (id) => ({
        id,
  type: 'DELETE_TODO'
});
