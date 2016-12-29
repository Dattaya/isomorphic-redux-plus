import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import { Button, Card, CardActions, CardContent } from 'styled';
import TodoEdit from './TodoEdit';

class TodoItem extends Component {
  static propTypes = {
    editable: PropTypes.bool,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    todo: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    editable: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: props.todo,
    };
  }

  componentWillReceiveProps({ todo }) {
    if (todo !== this.state.value) {
      this.setValue(todo);
    }
  }

  setValue(value) {
    this.updateState({ value });
  }

  updateState(extendState) {
    this.setState({
      ...this.state,
      ...extendState,
    });
  }

  @autobind
  handleChange(data) {
    this.setValue(data);
  }

  @autobind
  startEditing() {
    this.updateState({ editing: true });
  }

  @autobind
  stopEditing() {
    this.updateState({ editing: false });
  }

  @autobind
  save() {
    this.props.handleEdit(this.state.value);
    this.stopEditing();
  }

  renderEditing() {
    return (
      <Card>
        <CardContent>
          <TodoEdit onChange={this.handleChange} value={this.state.value} onSubmit={this.save} />
        </CardContent>
        <CardActions>
          <Button onClick={this.save}>Save</Button>
          <Button onClick={this.stopEditing}>Cancel</Button>
        </CardActions>
      </Card>
    );
  }

  renderNormal() {
    const { editable, handleDelete } = this.props;

    return (
      <Card>
        <CardContent>{this.state.value.text}</CardContent>
        {editable &&
          <CardActions>
            <Button onClick={this.startEditing}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </CardActions>
        }
      </Card>
    );
  }

  render() {
    return this.props.editable && this.state.editing ? this.renderEditing() : this.renderNormal();
  }
}

export default TodoItem;
