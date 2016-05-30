import React, { PropTypes }    from 'react';

export default class ErrorPage extends React.Component {
  static propTypes = {
    status:  PropTypes.number,
    message: PropTypes.string,
  };

  static defaultProps = {
    status:  404,
    message: 'Page not found.',
    title:   'Page not found',
  };

  render() {
    const { status, message } = this.props;
    const statusStyle = {
      color:     'grey',
      textAlign: 'center',
      fontSize:  '100px',
    };

    const messageStyle = {
      color:     'grey',
      textAlign: 'center',
      fontSize:  '50px',
    };

    return (
      <div>
        {status !== 0 && <h1 style={statusStyle}>{status}</h1>}
        <h2 style={messageStyle}>{message}</h2>
      </div>
    );
  }
}
