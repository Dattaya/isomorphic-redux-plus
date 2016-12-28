import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import styled from 'styled-components';

import { TextInput } from 'styled';

const CustomInput = styled(TextInput)`
  margin: 0;
`;

class TodoEdit extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    value: React.PropTypes.shape({
      text: PropTypes.string,
    }),
  };

  static defaultProps = {
    buttonText: 'Save',
    value: { text: '' },
    onSubmit: () => null,
  };

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentWillMount() {
    this.props.onChange(this.state.value);
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.state.value) {
      this.setState({ value });
    }
  }

  componentWillUpdate({ onChange, value }, state) {
    if (this.props.onChange !== onChange || this.state !== state) {
      onChange(state.value);
    }
  }

  @autobind
  handleChange(e) {
    const { name, value } = e.target;
    const newState = {
      ...this.state,
      ...{
        value: {
          ...this.state.value,
          ...{
            [name]: value,
          },
        },
      },
    };
    this.setState(newState);
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CustomInput
          name="text"
          type="text"
          placeholder="title"
          value={this.state.value.text}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default TodoEdit;
