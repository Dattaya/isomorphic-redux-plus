import React, { PropTypes } from 'react';

import { TodoItem } from './index';

export default function TodosView({ editable, todos = [], handleDelete, handleEdit }) {
  const btnStyle = {
    margin: '1em 0 1em 1em',
  };

  return (
    <div id="todos-list">
      {
        todos.map((todo) => (
          <TodoItem
            btnStyle={btnStyle}
            editable={editable}
            key={todo.id}
            onDelete={() => handleDelete(todo.id)}
            onEdit={() => handleEdit(todo.id)}
          >
            {todo.text}
          </TodoItem>
          )
        )
      }
    </div>
  );
}

TodosView.propTypes = {
  todos:        PropTypes.array.isRequired,
  handleEdit:   PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editable:     PropTypes.bool,
};
