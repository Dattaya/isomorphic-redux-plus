import React                from 'react';
import { PropTypes }        from 'react';
import ImmutablePropTypes   from 'react-immutable-proptypes';
import { Link }             from 'react-router';

import { TodoItem } from './index';

export default class TodosView extends React.Component {
  static propTypes = {
    todoIdsOrdered: ImmutablePropTypes.list.isRequired,
    selectTodo:     PropTypes.func.isRequired,
    handleEdit:     PropTypes.func.isRequired,
    handleDelete:   PropTypes.func.isRequired,
    editable:       PropTypes.bool
  };

  render() {
    const btnStyle = {
      'margin': '1em 0 1em 1em'
    };

    const { editable, todoIdsOrdered, selectTodo, handleDelete, handleEdit } = this.props;

    return (
      <div id="todos-list">
        {
          todoIdsOrdered.map((id) => {
            return (
              <TodoItem btnStyle={btnStyle} editable={editable} key={id} onDelete={() => handleDelete(id)}
                        onEdit={() => handleEdit(id)}>
                <Link to={'/todos/' + id}>{selectTodo(id).get('text')}</Link>
              </TodoItem>
            );
          })
        }
      </div>
    );
  }
}
