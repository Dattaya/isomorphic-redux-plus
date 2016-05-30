import React, { PropTypes } from 'react';
import ImmutablePropTypes   from 'react-immutable-proptypes';
import { Link }             from 'react-router';

import { TodoItem } from './index';

export default function TodosView({ editable, todoIdsOrdered, selectTodo, handleDelete, handleEdit }) {
  const btnStyle = {
    margin: '1em 0 1em 1em',
  };

  return (
    <div id="todos-list">
      {
        todoIdsOrdered.map((id) => (
          <TodoItem
            btnStyle={btnStyle}
            editable={editable}
            key={id}
            onDelete={() => handleDelete(id)}
            onEdit={() => handleEdit(id)}
          >
            <Link to={`/todos/${id}`}>{selectTodo(id).get('text')}</Link>
          </TodoItem>
          )
        )
      }
    </div>
  );
}

TodosView.propTypes = {
  todoIdsOrdered: ImmutablePropTypes.list.isRequired,
  selectTodo:     PropTypes.func.isRequired,
  handleEdit:     PropTypes.func.isRequired,
  handleDelete:   PropTypes.func.isRequired,
  editable:       PropTypes.bool,
};
