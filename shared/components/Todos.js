import React, { PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import ImmutablePropTypes     from 'react-immutable-proptypes';

import fetchData              from 'lib/fetchDataDeferred';
import {
  TodosForm, TodosView
}                             from './presentational';
import * as TodoActions       from 'actions/TodoActions';
import { isEditable }         from 'reducers/TodoReducer';

@fetchData((state, dispatch) => dispatch(TodoActions.loadTodos()))
@connect(state => ({
  todos: state.todos,
  editable: isEditable(state)
}))
export default class Todos extends React.Component {
  static propTypes = {
    todos:    ImmutablePropTypes.map.isRequired,
    dispatch: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired
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
    const { todos, editable, dispatch } = this.props;

    return (
      <div id="todo-list">
        <TodosView todos={todos} editable={editable}
          {...bindActionCreators(TodoActions, dispatch)} />

        {editable && <TodosForm
          {...bindActionCreators(TodoActions, dispatch)} />
        }
      </div>
    );
  }
}
