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

import * as XLSX from 'xlsx';

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
  const [excel, setExcel] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(null);
  const [idList, setIdList] = useState(null);

  const loadExcel = (back) => {
    setExcel(back);
  };

  useEffect(() => {
    setLoading(false);
    // let pdis = [];
    // const fetchData = async (caseNum) => {
    //   try {
    //     setError(null);
    //     setData(null);
    //     await axios
    //       .get(`/${caseNum}`)
    //       .then((res) => {
    //         const replaceInString = (fullString, search, replacement) => {
    //           return fullString.split(search).join(replacement);
    //         };
    //         const json = JSON.parse(replaceInString(res.data, "'", '"'));
    //         return json;
    //       })
    //       .then((json) => {
    //         pdis.push(json);
    //       });
    //     setData(pdis);
    //   } catch (e) {
    //     setError(e);
    //   }
    // };
    // const loopFetch = async (CASE_NUM) => {
    //   for (let caseNum = 1; caseNum <= CASE_NUM; caseNum++) {
    //     try {
    //       await fetchData(caseNum);
    //       //   console.log(data);
    //     } catch (e) {
    //       setError(e);
    //     }
    //   }
    //   setTab(0);
    //   setLoading(false);
    // };
    // loopFetch(CASE_NUM);
  }, []);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  useEffect(() => {
    console.log(excel);
    let list = [];
    if (excel) {
      excel.map((item, idx) => {
        if (idx % 9 === 0) {
          list.push(item['server_id']);
        }
      });
      setIdList(list);
    }
  }, [excel]);

  useEffect(() => {
    if (idList) {
      console.log(idList);
      let pdis = [];

      const fetchData = async (caseNum) => {
        try {
          setError(null);
          setData(null);
          console.log(caseNum);
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
        for (let caseNum = 0; caseNum < CASE_NUM; caseNum++) {
          try {
            await fetchData(idList[caseNum]);
            //   console.log(data);
          } catch (e) {
            setError(e);
          }
        }

        setTab(0);
        setLoading(false);
      };

      loopFetch(3);
    }
  }, [idList]);

  const getWeight = () => {};

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

  const onImportExcel = (file) => {
    const { files } = file.target;
    // Read the file through the FileReader object
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        // Read the entire excel table object in binary stream
        const workbook = XLSX.read(result, { type: 'binary' });
        // Store the obtained data
        let data = [];
        // traverse each worksheet to read (here by default only the first sheet is read)
        for (const sheet in workbook.Sheets) {
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // Use sheet_to_json method to convert excel to json data
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // If only the first table is taken, uncomment this line
          }
        }
        console.log(data);
        setExcel(data);
        setLoading(true);
        // Finally obtained and formatted json data
      } catch (e) {
        // Relevant prompts for incorrect file type errors can be thrown here
        console.log(e, 'eeee');
      }
    };
    // Open the file in binary mode
    fileReader.readAsBinaryString(files[0]);
  };

  if (loading)
    return (
      <Loading>
        <img src={LoadingGif} alt="Loading..." />
      </Loading>
    );
  if (error) return <Error>Error : API fetching failed</Error>;
  //   if (error) return <Error>Error : API fetching failed</Error>;
  if (data.length > 0)
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
            <Explainability pdi={data[tab]} pdiIdx={tab} weightList={excel}></Explainability>
            <Explainability pdi={data[tab]}></Explainability>
          </ExplainabilityContainer>

          <Test callback={loadExcel} />
        </Content>
      </Container>
    );

  return (
    <div>
      <button>
        <input type="file" accept=".xlsx, .xls" onChange={onImportExcel} />
        <span>Upload files</span>
      </button>
      <p>Support .xlsx, .xls format files</p>
    </div>
  );
};
export default Contents;
