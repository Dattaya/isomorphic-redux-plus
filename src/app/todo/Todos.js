import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { createStructuredSelector as select } from 'reselect';

import TodosForm from './TodosForm';
import TodosView from './TodosView';
import * as todoActions from './actions';
import { todosByDate, isEditable } from './selectors';

@asyncConnect([{
  promise: ({ store }) => store.dispatch(todoActions.loadTodos()),
}])

@connect(select({
  todos: todosByDate,
  editable: isEditable,
}), todoActions)

export default class Todos extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    todos: [],
    editable: false,
  };

  render() {
    const { createTodo, deleteTodo, editable, editTodo, todos } = this.props;

    return (
      <div>
        {editable && <TodosForm createTodo={createTodo} />}
        <TodosView
          todos={todos}
          editable={editable}
          handleDelete={deleteTodo}
          handleEdit={editTodo}
        />
      </div>
    );
  }
}
