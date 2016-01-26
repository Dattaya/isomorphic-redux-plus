import React, { PropTypes }   from 'react';
import { connect }            from 'react-redux';
import ImmutablePropTypes     from 'react-immutable-proptypes';

import fetchData              from 'lib/fetchData';
import {
  TodosForm, TodosView
}                             from './presentational';
import * as TodoActions       from 'actions/TodoActions';
import {
  isEditable, selectTodo
}                             from 'reducers/TodoReducer';

@fetchData((state, dispatch) => dispatch(TodoActions.loadTodos()))
@connect(state => ({
    todos:          state.todos,
    editable:       isEditable(state),
    todoIdsOrdered: state.todoIdsOrdered,
    selectTodo:     selectTodo.bind(null, state)
  }),
  TodoActions
)
export default class Todos extends React.Component {
  static propTypes = {
    todos:          ImmutablePropTypes.map.isRequired,
    todoIdsOrdered: ImmutablePropTypes.list.isRequired,
    selectTodo:     PropTypes.func.isRequired,
    editTodo:       PropTypes.func.isRequired,
    deleteTodo:     PropTypes.func.isRequired,
    createTodo:     PropTypes.func.isRequired,
    editable:       PropTypes.bool.isRequired
  };

  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };

  handleEdit = (id) => {
    const currentVal = this.props.selectTodo(id).get('text');

    // For a cutting edge UX
    let text = window.prompt('', currentVal);

    this.props.editTodo(id, text);
  };

  handleSubmit = (node) => {
    this.props.createTodo(node.value);

    node.value = '';
  };

  shouldComponentUpdate(nextProps) {
    const { todos, editable } = this.props;

    return !todos.equals(nextProps.todos) || editable !== nextProps.editable;
  }

  componentWillUpdate() {
    console.log('Todos component will be updated. ' +
      'You shouldn\'t see this message if the server returned the same todo list or `editable` boolean ' +
      'property. Comment out `shouldComponentUpdate` and it will appear.');
  }

  render() {
    const { editable, todoIdsOrdered, selectTodo } = this.props;

    return (
      <div id="todo-list">
        <TodosView selectTodo={selectTodo} todoIdsOrdered={todoIdsOrdered} editable={editable}
                   handleDelete={this.handleDelete} handleEdit={this.handleEdit} />

        {editable && <TodosForm handleSubmit={this.handleSubmit} />
        }
      </div>
    );
  }
}
