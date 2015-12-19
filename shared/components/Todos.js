import React, { PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import ImmutablePropTypes     from 'react-immutable-proptypes';

import fetchData              from 'lib/fetchDataDeferred';
import {
  TodosForm, TodosView
}                             from './presentational';
import * as TodoActions       from 'actions/TodoActions';

@fetchData((state, dispatch) => dispatch(TodoActions.loadTodos()))
@connect(state => ({ todos: state.todos, user: state.auth.get('user') }))
export default class Todos extends React.Component {
  static propTypes = {
    todos:    ImmutablePropTypes.list.isRequired,
    dispatch: PropTypes.func.isRequired,
    user:     PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    const { todos, user } = this.props;

    return !todos.equals(nextProps.todos) || user !== nextProps.user;
  }

  componentWillUpdate() {
    console.log('Todos component will be updated. ' +
      'You shouldn\'t see this message if the server returned the same todo list or user. ' +
      'Comment out `shouldComponentUpdate` and it will appear.');
  }

  render() {
    const { todos, user, dispatch } = this.props;

    return (
      <div id="todo-list">
        <TodosView todos={todos} user={user}
          {...bindActionCreators(TodoActions, dispatch)} />

        {user && <TodosForm
          {...bindActionCreators(TodoActions, dispatch)} />
        }
      </div>
    );
  }
}
