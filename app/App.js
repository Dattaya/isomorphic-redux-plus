import React, { PropTypes } from 'react';

import { Login } from 'auth';
import { ErrorHandler } from 'error';
import { rendered } from 'lib/fetchData';
import Theme, { Container, Header, HeaderRow, Nav, NavItem } from 'styled';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    /* This is one of the most important lines of the app,
     * it is where we start triggering loading of data
     * on the client-side
     */
    rendered();
  }

  render() {
    const { children } = this.props;

    return (
      <Theme>
        <div>
          <Header>
            <HeaderRow>
              <Nav>
                <NavItem href="/">About</NavItem>
                <NavItem href="/todos">Todos</NavItem>
              </Nav>
            </HeaderRow>
            <HeaderRow>
              <Login />
            </HeaderRow>
          </Header>
          <Container>
            <ErrorHandler>
              {children}
            </ErrorHandler>
          </Container>
        </div>
      </Theme>
    );
  }
}
