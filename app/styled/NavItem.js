import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { getters as g } from './theme';

const NavItemLiteral = styled.li`
  display: flex;
  padding: 1em;
`;
const NavLink = styled.a`
  color: ${g.fg};
  text-decoration: none;
`;

const NavItem = ({ children, href }) => (
  <NavItemLiteral>
    <NavLink href={href}>{children}</NavLink>
  </NavItemLiteral>
);

NavItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
};

export default NavItem;
