import React, { PropTypes } from 'react';

export default class TodosForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <input type="text" placeholder="type todo" ref="todo-input" />
        <input type="submit" value="OK!" onClick={() => handleSubmit(this.refs['todo-input'])} />
      </div>
    );
  }
}
