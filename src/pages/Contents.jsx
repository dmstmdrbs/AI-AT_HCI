import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { nameState } from "../states/therapist";

import { withStyles } from "@material-ui/core/styles";
//import Paper from '@material-ui/core/Paper';
import { Tabs, Tab, Button, TextField } from "@material-ui/core";
//import AttentionImage from '../component/AttentionImage';
import Explainability from "../component/Explainability";
import Test from "../component/Test";
import LoadingGif from "../assets/loading.gif";

import * as XLSX from "xlsx";
import {
  ContactSupportOutlined,
  InsertCommentTwoTone,
} from "@material-ui/icons";

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
`;

const ActionContainer = styled.div`
  display:flex;
`;
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 45,
      width: "100%",
      backgroundColor: "#fff",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const TabContainer = styled.div`
  background-color: #4d5e72;
`;

const allyProps=(index)=>{
  return{
    id:`scrollable-auto-tab-${index}`,
    'aria-controls':`scrollable-auto-tabpanel-${index}`,
  };
}
// navy-gray : 4d5e72;
// light-navy : 3f6a8a

axios.defaults.baseURL = "http://15.164.105.78:8000";

const Contents = () => {
  const history = useHistory();
  const name = useRecoilValue(nameState);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [excel, setExcel] = useState(null);
  const [idList, setIdList] = useState(null);
  const [attention, setAttention] = useState([]);
  const [search,setSearch] = useState('');

  const loadExcel = (back) => {
    setExcel(back);
  };

  useEffect(() => {
    setLoading(true);
    //첫 로딩
    // 1. case 개수 or server id list -> contents컴포넌트
    // then.(2. 각 server id 별 pdi, -> contents 컴포넌트)
    // 3. server id 별 pdi attention, image attention => explainability 컴포넌트
    axios
      .get("/idlist")
      .then((res) => {
        let str = res.data.slice(1, res.data.length - 1);
        let list = str.split(", ").map((x) => parseInt(x));
        list.sort((a, b) => parseInt(a) - parseInt(b));
        return list;
      })
      .then((list) => {
        setIdList(list);
        return list;
      }).then(list=>{
        //list -> [24,52,324,12,4,53,2,,41,3,5,6,56]
        let pdis = [];
        const fetchData = async (id,idx) => {
          try {
            setError(null);
            setData(null);
            await axios.get(`/${id+1}`)
              .then((res) => {
                const replaceInString = (fullString, search, replacement) => {
                  return fullString.split(search).join(replacement);
                };
                const json = JSON.parse(replaceInString(res.data, "'", '"'));
                return json;
              })
              .then(async (json) => {
                
                const fetchAttention = async (id,idx) => {
                  let toSet = []; 
                  /** attention = {imageAttention : [[],[],[],[],[],[],[],[],[]],
                    * pdiAttention:[[],[],[],[],[],[],[],[],[]],
                    * pdiAttention2:[]}
                    */
                  axios.get(`/att/${id}`).then((res) => {
                    let list = res.data.replaceAll("'", '"').replaceAll("}{", "}},{{");
                    // list = list.replaceAll("[","\"[").replaceAll("]","]\"")
                    let arr = list.split("},{");
                  
                    arr.map((item) => {
                      toSet.push(JSON.parse(item));
                    });
                    json['attention'] = toSet;
                    pdis.push(json);
                  })
                };
                await fetchAttention(id,idx);
                // console.log(pdis);
                setData(pdis);
              });
          } catch (e) {
            setError(e);
          }
        };

        const loopFetch = async (CASE_NUM) => {
          
          for (let caseNum = 0; caseNum < CASE_NUM; caseNum++) {
            try {
              await fetchData(list[caseNum],caseNum);
              //   console.log(data);
            } catch (e) {
              setError(e);
            }
          }
          setTab(0);
          setLoading(false);
        };
        loopFetch(list.length);
      });
  }, []);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  const logout = () => {
    history.push("/");
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const searchCase =()=>{
    if(search.length>0){
      console.log(search);
      console.log(data[50]);
      
      let found;
      data.map((item,idx)=>{
        if(item['image_name'].includes(search)){
          setTab(idx);
          found=item;
        } 
      })
      console.log(found);
      if(found===undefined){
        alert('찾는 케이스가 없습니다');
      }
      setSearch('');
    }
  }

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
          <ActionContainer>
            <TextField value={search} id="search-image" label="Search image id" variant="outlined" placeholder="00004_pitr_010106.jpg" onChange={handleSearchChange}/>
            <Button variant="outlined" onClick={searchCase} style={{margin:'10px'}}>검색</Button>
            <Button variant="outlined" onClick={logout} style={{margin:'10px'}}>
              완료
            </Button>
          </ActionContainer>
        </Header>
        <TabContainer>
          <StyledTabs
            value={tab}
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="scrollable auto tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {getTabs().map((idx) => {
              return (
                <StyledTab
                  key={data[idx - 1]["id"]}
                  label={`Case ${idx}`}
                  {...allyProps(idx)}></StyledTab>
              );
            })}
          </StyledTabs>
        </TabContainer>   
        <Content>
          <ExplainabilityContainer>
            <Explainability pdi={data[tab]} pdiIdx={tab} attention={data[tab]['attention']} attentionLevel='2'></Explainability>
            <Explainability
              pdi={data[tab]}
              pdiIdx={tab}
              attention={data[tab]['attention']}
              attentionLevel='1'
            ></Explainability>
          </ExplainabilityContainer>

          {/* <Test callback={loadExcel} /> */}
        </Content>
      </Container>
    );
};
export default Contents;
