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

const CustomContainer = styled(Container)`
  align-content: space-between;
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HeaderLiteral = styled.header`
  background: ${g.bg};
`;

const Header = ({ children }) => (
  <Theme theme={headerTheme}>
    <HeaderLiteral>
      <CustomContainer>
        {children}
      </CustomContainer>
    </HeaderLiteral>
  </Theme>
);

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
