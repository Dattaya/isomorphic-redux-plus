import styled from 'styled-components';
import { getters as g } from './theme';

export default styled.input`
  background: ${g.shadow};
  border: none;
  border-bottom: ${g.border}px solid ${g.transparent};
  color: ${g.highlight};
  display: flex;
  font-size: ${g.size}px;
  margin: 1em .5em;
  padding: 4px;
  width: 100px;
  text-align: left;

  transition: background .2s, border-bottom .2s, color .2s;

  &:focus {
    background: ${g.highlight};
    border-bottom: ${g.border}px solid ${g.shadowDark};
    color: ${g.darkGray};
    outline: 0;
  }
`;
