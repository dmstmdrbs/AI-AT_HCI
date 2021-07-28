import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { AccountCircle, MailOutlined, Phone } from '@material-ui/icons/';
import { nameState, phoneState, emailState } from '../states/therapist';
import hciLogo from '../assets/hci.png';

const Container = styled.div`
  display: flex;
  width: 400px;
  height: 70vh;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;
`;

const Form = styled.div`
  display: flex;
  height: 250px;
  flex-direction: column;
  justify-content: center;
`;
const InputContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;
const Button = styled.button`
  align-self: center;
  border-radius: 115px;
  width: 300px;
  margin-top: 1em;
  border: 1px solid;
  padding: 1em 2em;
  background: none;
  font-size: 18px;
  color: white;
  background-color: #7d95b9;
  cursor: pointer;
`;
const Logo = styled.img`
  padding-top: 30px;
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

  const submit = async () => {
    if (name && phone && email) {
      await axios
        .post('http://15.164.105.78:8000/login/', {
          Name: name,
          Email: email,
          Phone: phone,
        })
        .then(
          (res) => {
            history.push('/contents');
          },
          (error) => {
            console.log(error);
          },
        );
    } else {
      alert('정보를 입력해주세요');
    }
  };

  return (
    <Container>
      <h1>LOGIN</h1>
      <Form>
        <InputContainer>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                fullWidth={true}
                id="input-name"
                label="이름"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </InputContainer>
        <InputContainer>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <Phone />
            </Grid>
            <Grid item>
              <TextField
                fullWidth={true}
                id="input-telephone"
                label="전화번호"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </InputContainer>
        <InputContainer>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item>
              <MailOutlined />
            </Grid>
            <Grid item>
              <TextField
                fullWidth={true}
                id="input-email"
                label="이메일"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </InputContainer>
      </Form>
      <Button onClick={submit}>확인</Button>
      <Logo src={hciLogo} alt="logo" />
    </Container>
  );
};
export default LoginForm;
