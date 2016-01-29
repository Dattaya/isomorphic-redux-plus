import React                from 'react';

export default class ErrorHandler extends React.Component {
  static propTypes = {status: React.PropTypes.number};

  static defaultProps = {status: 200};

  static childContextTypes = {
    status: React.PropTypes.number
  };

  getChildContext() {
    return {status: this.props.status};
  }

  render() {
    return this.props.children;
  }
}
