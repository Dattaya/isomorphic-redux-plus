import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Button, Text, TextInput } from 'styled';

const Form = styled.form`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 0;
`;

const LoginForm = ({ error, loggingIn, login }) => {
  let user;
  let pass;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user.value || '', pass.value || '');
    user.value = pass.value = '';
  };

  return (
    <Form disabled={loggingIn}>
      {error &&
        <Text>Wrong user name or password.</Text>
      }
      <TextInput type="text" placeholder="User name" innerRef={(i) => (user = i)} />
      <TextInput type="password" placeholder="Password" innerRef={(i) => (pass = i)} />
      <Button onClick={handleSubmit}>Login</Button>
    </Form>
  );
};

LoginForm.propTypes = {
  error: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

export default LoginForm;
