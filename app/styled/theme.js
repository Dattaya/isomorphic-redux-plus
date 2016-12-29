import React, { PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  primary: '#3f51b5',
  shadow: 'rgba(0, 0, 0, .14)',
  darkShadow: 'rgba(0, 0, 0, .6)',
  highlight: 'rgba(218, 218, 218, .8)',
  highlightDim: 'rgba(218, 218, 218, .4)',
  size: 14,
  gray: 'rgba(158, 158, 158, .2)',
  darkGray: '#333',
  white: '#fff',
  border: 2,
  maxWidth: 960,
  transparent: 'rgba(0, 0, 0, 0)',
};

const getters = Object.assign(...Object.keys(defaultTheme).map((key) => ({
  [key]: ({ theme }) => theme[key],
})));

getters.boxShadow = (p) => {
  const shadow = getters.shadow(p);
  return `0 2px 2px 0 ${shadow}, 0 3px 1px -2px ${shadow}, 0 1px 5px 0 ${shadow}`;
};

getters.fg = (p) => p.theme.fg || getters.darkGray(p);

getters.bg = (p) => p.theme.bg || getters.white(p);

const Theme = ({ children, theme }) => (
  <ThemeProvider theme={theme || defaultTheme}>
    {children}
  </ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
};

export default Theme;
export { getters, defaultTheme };
