import React, { PropTypes } from 'react';
import mtrc from 'markdown-to-react-components';
import styled from 'styled-components';

// h1: this.props.children, this.props.id
// h2: this.props.children, this.props.id
// h3: this.props.children, this.props.id
// h4: this.props.children, this.props.id
// blockquote: this.props.children
// hr: -
// ol: this.props.children
// ul: this.props.children
// p: this.props.children
// table: this.props.children
// tr: this.props.children
// th: this.props.children
// td: this.props.children
// td: this.props.children
// a: this.props.children, this.props.href, this.props.title, this.props.target
// strong: this.props.children
// em: this.props.children
// br: -
// del: this.props.children
// img: this.props.src, this.props.alt
// code: this.props.language, this.props.code
// codespan: this.props.children

const CodeLiteral = styled.code``;
const Code = ({ code }) => <CodeLiteral>{code}</CodeLiteral>;
Code.propTypes = {
  code: PropTypes.string.isRequired,
};

mtrc.configure({
  h1: styled.h1``,
  h2: styled.h2``,
  h3: styled.h3``,
  h4: styled.h4``,
  blockquote: styled.blockquote``,
  hr: styled.hr``,
  ol: styled.ol``,
  ul: styled.ul``,
  p: styled.p``,
  table: styled.table``,
  tr: styled.tr``,
  th: styled.th``,
  td: styled.td``,
  a: styled.a``,
  strong: styled.strong``,
  em: styled.em``,
  br: styled.br``,
  del: styled.del``,
  img: styled.img``,
  code: Code,
  codespan: styled.span``,
});

const rednerMarkdown = (markdown) => mtrc(markdown).tree;

export default rednerMarkdown;
