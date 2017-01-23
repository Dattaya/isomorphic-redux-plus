import styled from 'styled-components';
import { getters as g } from './theme';

export default styled.button`
  background: ${g.bg};
  border: none;
  border-radius: ${g.border}px;
  color: ${g.fg};
  cursor: pointer;
  display: inline-block;
  font-size: ${g.size};
  font-weight: 500;
  height: 2.5em;
  line-height: 2.5em;
  margin: 0;
  min-width: 6em;
  padding: 0 1em;
  text-transform: uppercase;
  overflow: hidden;
  outline: none;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;

  &:hover, &:focus {
    background: ${g.highlightDim}
  }
`;
