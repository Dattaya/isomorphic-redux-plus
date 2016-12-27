import React, { PropTypes } from 'react';

import TodoItem from './TodoItem';
import { CardList } from 'styled';

export default function TodosView({ editable, todos, handleDelete, handleEdit }) {
  return (
    <CardList>
      {
        todos.map((todo) => (
          <TodoItem
            editable={editable}
            key={todo.id}
            onDelete={() => handleDelete(todo.id)}
            onEdit={() => handleEdit(todo.id)}
          >
            {todo.text}
          </TodoItem>
        ))
      }
    </CardList>
  );
}

TodosView.propTypes = {
  todos: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

TodosView.defaultProps = {
  editable: false,
  todos: [],
  handleDelete: () => {},
  handleEdit: () => {},
};
