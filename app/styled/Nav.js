import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Container from './Container';

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0
`;

const NavLiteral = styled.nav`
`;

const Nav = ({ children }) => (
  <NavLiteral>
    <Container>
      <NavList>
        {children}
      </NavList>
    </Container>
  </NavLiteral>
);

Nav.propTypes = {
  children: PropTypes.node,
};

export default Nav;
