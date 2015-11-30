import React         from 'react';
import { PropTypes } from 'react';
import ImmutablePropTypes   from 'react-immutable-proptypes';

export default class TodosView extends React.Component {
  static propTypes = {
    todos:      ImmutablePropTypes.list.isRequired,
    editTodo:   PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    user:       PropTypes.string
  }

  handleDelete = (e) => {
    const id = Number(e.target.dataset.id);

    this.props.deleteTodo(id);
  }

  handleEdit = (e) => {
    const id         = Number(e.target.dataset.id);
    const currentVal = this.props.todos.get(id);

    // For a cutting edge UX
    let text = window.prompt('', currentVal);

    this.props.editTodo(id, text);
  }

  render() {
    const btnStyle = {
      'margin': '1em 0 1em 1em'
    };
    const {user} = this.props;

    return (
      <div id="todos-list">
        {
          this.props.todos.map(function (todo, index) {
            return (
              <div style={btnStyle} key={index}>
                <span>{todo}</span>
                {user &&
                <span>
                  <button style={btnStyle} data-id={index} onClick={this.handleDelete}>X</button>
                  <button style={btnStyle} data-id={index} onClick={this.handleEdit}>Edit</button>
                </span>
                }
              </div>
            );
          }.bind(this))
        }
      </div>
    );
  }
}
