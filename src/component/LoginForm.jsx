import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { AccountCircle, MailOutlined, Phone } from '@material-ui/icons/';
import { nameState, phoneState, emailState } from '../states/therapist';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  align-self: center;
  border-radius: 115px;
  width: 100%;
  margin-top: 1em;
  border: 1px solid;
  padding: 1em 2em;
  background: none;
  font-size: 18px;
  color: white;
  background-color: #7d95b9;
  cursor: pointer;
`;

const LoginForm = () => {
  const history = useHistory();

  const [name, setName] = useRecoilState(nameState);
  const [phone, setPhone] = useRecoilState(phoneState);
  const [email, setEmail] = useRecoilState(emailState);

  useEffect(() => {
    setName('');
    setPhone('');
    setEmail('');
  }, []);

  const submit = () => {
    if (name && phone && email) {
      history.push('/contents');
    } else {
      alert('정보를 입력해주세요');
    }
  };

  return (
    <Container>
      <h1>정보 입력</h1>
      <Form>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="input-name"
              label="이름"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Phone />
          </Grid>
          <Grid item>
            <TextField
              id="input-telephone"
              label="전화번호"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <MailOutlined />
          </Grid>
          <Grid item>
            <TextField
              id="input-email"
              label="이메일"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Form>
      <Button onClick={submit}>확인</Button>
    </Container>
  );
};
export default LoginForm;
