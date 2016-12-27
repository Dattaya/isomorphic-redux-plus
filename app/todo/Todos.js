import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

import fetchData from 'lib/fetchData';
import TodosForm from './TodosForm';
import TodosView from './TodosView';
import * as todoActions from './actions';
import {
  isEditable, computeTodos,
} from './selectors';

@fetchData((state, dispatch) => dispatch(todoActions.loadTodos()))
@connect((state) => ({
  todos: computeTodos(state), // eslint-disable-line no-multi-spaces
  editable: isEditable(state),
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

  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };

  handleEdit = (id) => {
    const currentVal = find(this.props.todos, ['id', id]).text;

    // For a cutting edge UX
    const text = window.prompt('', currentVal); // eslint-disable-line no-alert

    if (text !== currentVal) {
      this.props.editTodo(id, text);
    }
  };

  handleSubmit = (node) => {
    this.props.createTodo(node.value);

    node.value = ''; // eslint-disable-line no-param-reassign
  };

  render() {
    const { editable, todos } = this.props;

    return (
      <div>
        <TodosView
          todos={todos}
          editable={editable}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />
        {editable && <TodosForm handleSubmit={this.handleSubmit} />}
      </div>
    );
  }
}
