import React from 'react';

export default class NotFound extends React.Component {
  render() {
    const style = {
      color:     'grey',
      textAlign: 'center',
      fontSize:  '100px'
    };

    return (
      <div>
        <h1 style={style}>404</h1>
        <h2 style={style}>Not found</h2>
      </div>
    );
  }
}
