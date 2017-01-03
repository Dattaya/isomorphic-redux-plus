import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { getters as g } from 'styled/theme';
import { Button, Text, TextInput } from 'styled';

const Form = styled.form`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 0;
`;

const CustomInput = styled(TextInput)`
  max-width: 10em;
  background: ${g.shadow};
  color: ${g.highlight};
  padding: ${(p) => g.border(p) * 2}px;

  transition: background .2s, border-bottom .2s, color .2s;

  &:focus {
    background: ${g.highlight};
    border-bottom: ${g.border}px solid ${g.shadowDark};
    color: ${g.darkGray};
    outline: 0;
  }
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
      <CustomInput type="text" placeholder="User name" innerRef={(i) => (user = i)} />
      <CustomInput type="password" placeholder="Password" innerRef={(i) => (pass = i)} />
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
