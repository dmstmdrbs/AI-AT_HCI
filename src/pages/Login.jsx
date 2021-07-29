import React from 'react';
import styled from 'styled-components';

import LoginForm from '../component/LoginForm';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #e6e9ed;
`;

const Login = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};
export default Login;
