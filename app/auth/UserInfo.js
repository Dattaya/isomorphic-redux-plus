import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Button, Text } from 'styled';

const Div = styled.div`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const UserInfo = ({ logout, user }) => (
  <Div>
    <Text>Hello, {user}!</Text>
    <Button onClick={logout}>Logout</Button>
  </Div>
);

UserInfo.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default UserInfo;
