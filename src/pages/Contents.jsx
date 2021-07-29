import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { nameState } from '../states/therapist';

import { withStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
import { Tabs, Tab, Button } from '@material-ui/core';
//import AttentionImage from '../component/AttentionImage';
import Explainability from '../component/Explainability';
import Test from '../component/Test';
import LoadingGif from '../assets/loading.gif';

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;
const Error = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #e74c3c;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  color: #434a54;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #e6e9ed;
`;
// lightgray : #e6e9ed;
//
const Name = styled.div`
  margin-left: 30px;
`;
const Title = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  padding: 10px;
  flex: 1;
  align-items: center;
  justify-items: center;
`;

const ExplainabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 45,
      width: '100%',
      backgroundColor: '#fff',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const TabContainer = styled.div`
  background-color: #4d5e72;
`;
// navy-gray : 4d5e72;
// light-navy : 3f6a8a

axios.defaults.baseURL = 'http://15.164.105.78:8000';
const CASE_NUM = 6;

const Contents = () => {
  const history = useHistory();
  const name = useRecoilValue(nameState);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(null);

  useEffect(() => {
    let pdis = [];
    const fetchData = async (caseNum) => {
      try {
        setError(null);
        setData(null);

        await axios
          .get(`/${caseNum}`)
          .then((res) => {
            const replaceInString = (fullString, search, replacement) => {
              return fullString.split(search).join(replacement);
            };
            const json = JSON.parse(replaceInString(res.data, "'", '"'));
            return json;
          })
          .then((json) => {
            pdis.push(json);
          });

        setData(pdis);
      } catch (e) {
        setError(e);
      }
    };

    const loopFetch = async (CASE_NUM) => {
      for (let caseNum = 1; caseNum <= CASE_NUM; caseNum++) {
        try {
          await fetchData(caseNum);
          //   console.log(data);
        } catch (e) {
          setError(e);
        }
      }
      setTab(0);
      setLoading(false);
    };

    loopFetch(CASE_NUM);
  }, []);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  const logout = () => {
    history.push('/');
  };

  const getTabs = () => {
    let arr = [];
    for (let idx = 0; idx < data.length; idx++) {
      arr[idx] = idx + 1;
    }
    return arr;
  };

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  if (loading)
    return (
      <Loading>
        <img src={LoadingGif} alt="Loading..." />
      </Loading>
    );
  if (error) return <Error>Error : API fetching failed</Error>;
  //   if (error) return <Error>Error : API fetching failed</Error>;
  return (
    <Container>
      <Header>
        <Name>
          <h2>{name} 님</h2>
        </Name>
        <Title>
          <h1>AI&AT</h1>
        </Title>
        <Button variant="outlined" onClick={logout}>
          완료
        </Button>
      </Header>
      <TabContainer>
        <StyledTabs
          value={tab}
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          {getTabs().map((idx) => {
            return <StyledTab key={data[idx - 1]['id']} label={`Case ${idx}`}></StyledTab>;
          })}
        </StyledTabs>
      </TabContainer>

      <Content>
        {/* {data.map((pdi) => {
          return <p>{JSON.stringify(pdi)}</p>;
        })} */}
        <ExplainabilityContainer>
          <Explainability pdi={data[tab]}></Explainability>
          <Explainability pdi={data[tab]}></Explainability>
        </ExplainabilityContainer>

        <Test />
      </Content>
    </Container>
  );
};
export default Contents;
