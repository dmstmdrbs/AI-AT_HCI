import React from 'react';
import styled from 'styled-components';

import LoginForm from '../component/LoginForm';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(225, 230, 236);
`;

const Login = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};
export default Login;
