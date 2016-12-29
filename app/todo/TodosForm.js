import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

import { Button, Card, CardActions, CardContent, CardList, CardTitle } from 'styled';

import TodoEdit from './TodoEdit';

class TodosForm extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { value: { text: '' } };
  }

  @autobind
  handleChange(data) {
    this.setState({ value: data });
  }

  @autobind
  save() {
    this.props.createTodo(this.state.value.text);
    this.setState({ value: { text: '' } });
  }

  render() {
    return (
      <CardList>
        <Card>
          <CardTitle>Create a ToDo item</CardTitle>
          <CardContent>
            <TodoEdit onChange={this.handleChange} value={this.state.value} onSubmit={this.save} />
          </CardContent>
          <CardActions>
            <Button onClick={this.save}>Save</Button>
          </CardActions>
        </Card>
      </CardList>
    );
  }
}

export default TodosForm;
