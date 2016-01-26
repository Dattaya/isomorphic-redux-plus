import React from 'react';

export default class InternalServerError extends React.Component {
  render() {
    const style = {
      color:     'grey',
      textAlign: 'center',
      fontSize:  '100px',
      margin:    '0'
    };

    const messageStyle = {
      color:     'grey',
      textAlign: 'center',
      fontSize:  '20px'
    };

    return (
      <div>
        <h1 style={style}>500</h1>
        <h2 style={style}>Internal Server Error</h2>
        <h2 style={messageStyle}>Administrators have been notified. Please try again later.</h2>
      </div>
    );
  }
}
