import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import { Login } from 'auth';
import { ErrorHandler } from 'error';
import { rendered } from 'lib/fetchData';
import Theme from 'styled/theme';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };

  componentDidMount() {
    /* This is one of the most important lines of the app,
     * it is where we start triggering loading of data
     * on the client-side
     */
    rendered();
  }

  render() {
    return (
      <Theme>
        <div id="main-view">
          <IndexLink to="/">About</IndexLink>
          {' '}
          <Link to="/todos">Todos</Link>
          <hr />
          <Login />
          <hr />
          <ErrorHandler>
            {this.props.children}
          </ErrorHandler>
        </div>
      </Theme>
    );
  }
}
