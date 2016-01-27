import React                from 'react';
import { connect }          from 'react-redux';
import ImmutablePropTypes   from 'react-immutable-proptypes';

import {
  TodoItem
}                           from './presentational';
import { loadTodo }         from 'actions/TodoActions';
import {
  selectTodo
}                           from 'reducers/TodoReducer';
import fetchData            from 'lib/fetchData';

/**
 * The only reason this page was created is to show that in a situation when
 * a react-router route had been successfully matched but the entity
 * is missing, server would return a proper status code for the page.
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
