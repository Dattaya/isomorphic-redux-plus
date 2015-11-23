import React, { PropTypes }   from 'react';
import TodosView              from './TodosView';
import TodosForm              from './TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';
import fetchData              from 'lib/fetchDataDeferred';

@fetchData([TodoActions.getTodos])
@connect(state => ({ todos: state.todos, user: state.auth.get('user') }))
export default class Todos extends React.Component {
  static propTypes = {
    todos:    PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
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
