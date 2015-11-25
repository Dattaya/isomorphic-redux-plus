import React, { PropTypes }   from 'react';
import TodosView              from './TodosView';
import TodosForm              from './TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions       from 'actions/TodoActions';
import { connect }            from 'react-redux';
import fetchData              from 'lib/fetchDataDeferred';
import ImmutablePropTypes     from 'react-immutable-proptypes';

@fetchData([TodoActions.getTodos])
@connect(state => ({ todos: state.todos, user: state.auth.get('user') }))
export default class Todos extends React.Component {
  static propTypes = {
    todos:    ImmutablePropTypes.list.isRequired,
    dispatch: PropTypes.func.isRequired
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
