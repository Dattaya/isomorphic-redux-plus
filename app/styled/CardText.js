import styled from 'styled-components';
import { getters as g } from './theme';

export default styled.div`
  color: ${g.fg};
  font-size: ${g.size}px;
  line-height: ${(p) => g.size(p) + (2 * g.border(p))}px;
  overflow: hidden;
  padding: ${(p) => g.size(p) + g.border(p)}px;
  width: 90%;
`;
