import React                from 'react';
import { PropTypes }        from 'react';
import ImmutablePropTypes   from 'react-immutable-proptypes';

export default class TodosView extends React.Component {
  static propTypes = {
    todos:      ImmutablePropTypes.map.isRequired,
    editTodo:   PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editable:   PropTypes.bool
  };

  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };

  handleEdit = (id) => {
    const currentVal = this.props.todos.get(id).text;

    // For a cutting edge UX
    let text = window.prompt('', currentVal);

    this.props.editTodo(id, text);
  };

  render() {
    const btnStyle = {
      'margin': '1em 0 1em 1em'
    };
    const {editable} = this.props;

    return (
      <div id="todos-list">
        {
          this.props.todos.map((todo, id) => {
            return (
              <div style={btnStyle} key={id}>
                <span>{todo.get('text')}</span>
                {editable &&
                <span>
                  <button style={btnStyle} onClick={() => this.handleDelete(id)}>X</button>
                  <button style={btnStyle} onClick={() => this.handleEdit(id)}>Edit</button>
                </span>
                }
              </div>
            );
          }).valueSeq()
        }
      </div>
    );
  }
}
