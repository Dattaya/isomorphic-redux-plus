import React                from 'react';
import { connect }          from 'react-redux';
import ImmutablePropTypes   from 'react-immutable-proptypes';

import { TodoItem }         from './presentational';
import { NotFound }         from './index';
import { loadTodo }         from 'redux/actions/TodoActions';
import {
  selectTodo
}                           from 'redux/reducers/TodoReducer';
import fetchData            from 'lib/fetchDataDeferred';

/**
 * The only reason this page was created is to show that in a situation when
 * a react-router route had been successfully matched but the entity
 * is missing, server would return a proper status code for the page.
 * This is how it works on the server: if an action with the role 'primary' failed to load,
 * in the `promiseMiddleware.js` we throw an object with a status field. fetchComponentData is
 * skipped, because `Promise.all` doesn't catch errors; then we catch it in
 * the `server.js` and pass it down with `.catch(err => err)` so we're able to render the page
 * and finally return the proper status code.
 * To see it for yourself, try to open this page in the browser: `http://localhost:3000/todos/11`
 * and look into the `Network` section of your browser's Developer Tools.
 */
@fetchData((state, dispatch, params) => dispatch(loadTodo(params.id)))
@connect((state, ownProps) => ({
  todo: selectTodo(state, ownProps.params.id)
}))
export default class Todo extends React.Component {
  static propTypes = {
    todo: ImmutablePropTypes.map,
  };

  render() {
    const { todo } = this.props;

    if (!todo) {
      return <NotFound/>
    }

    const todoStyle = {
      'textAlign': 'center'
    };

    return (
      <TodoItem>
        <h1 style={todoStyle}>{todo.get('text')}</h1>
      </TodoItem>
    )
  }
}
