import React from 'react';
import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  primary: '',
  shadow: 'rgba(0, 0, 0, .14)',
  size: 14,
  gray: 'rgba(158, 158, 158, .2)',
  darkGray: '#333',
  white: '#fff',
  border: 2
};

const getters = Object.assign(...Object.keys(defaultTheme).map((key, _) => ({
  [key]: ({ theme }) => theme[key]
})));

getters.boxShadow = (p) => `0 2px 2px 0 ${getters.shadow(p)}, 0 3px 1px -2px ${getters.shadow(p)}, 0 1px 5px 0 ${getters.shadow(p)}`

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
  );
}

export { getters };
