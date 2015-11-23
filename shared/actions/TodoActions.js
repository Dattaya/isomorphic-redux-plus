export function getTodos() {
  return {
    type:    'GET_TODOS',
    promise: client => client.get('/todos')
  }
}

export function createTodo(text) {
  return {
    type:    'CREATE_TODO',
    promise: client => client.post('/todos', { time: Date.now(), text })
  };
}

export function editTodo(id, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  };
}

export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    id
  };
}
