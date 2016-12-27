import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Theme, { getters as g, defaultTheme } from './theme';

import Container from './Container';

const headerTheme = {
  ...defaultTheme,
  ...{
    fg: defaultTheme.white,
    bg: defaultTheme.primary,
  },
};

const HeaderLiteral = styled.nav`
  background: ${g.bg};
  padding-bottom: .5em;
`;

const Header = ({ children }) => (
  <Theme theme={headerTheme}>
    <HeaderLiteral>
      <Container>
        {children}
      </Container>
    </HeaderLiteral>
  </Theme>
);

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
