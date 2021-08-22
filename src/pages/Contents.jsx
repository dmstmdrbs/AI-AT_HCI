import axios from "axios";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { nameState } from "../states/therapist";
import testTypeState from "../states/testType";

import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Button, TextField } from "@material-ui/core";
import Explainability from "../component/Explainability";
import PredictionInfo from "../component/PredictionInfo";
import AccuracyInfo from "../component/AccuracyInfo";
import LoadingGif from "../assets/loading.gif";

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
  min-width: 1500px;
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

const Type = styled.div``;
const Title = styled.div`
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 50px;
  justify-items: center;
`;

const ExplainabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  margin-right: 50px;
`;
const ModelInfoContainer = styled.div`
  // position: fixed;
  // right: 4%;
  // top: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ActionContainer = styled.div`
  display: flex;
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

const allyProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
};
// navy-gray : 4d5e72;
// light-navy : 3f6a8a

axios.defaults.baseURL = "http://15.164.105.78:8000";
// axios.defaults.baseURL = "http://localhost:8000";

const Contents = () => {
  const history = useHistory();
  const name = useRecoilValue(nameState);
  const testType = useRecoilValue(testTypeState);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useLayoutEffect(() => {
    setLoading(true);
    //첫 로딩
    // 1. case 개수 or server id list -> contents컴포넌트
    // then.(2. 각 server id 별 pdi, -> contents 컴포넌트)
    // 3. server id 별 pdi attention, image attention => explainability 컴포넌트
    axios
      .get("/idlist_selected")
      .then((res) => {
        let str = res.data.slice(1, res.data.length - 1);
        let list = str.split(", ").map((x) => parseInt(x));
        list.sort((a, b) => parseInt(a) - parseInt(b));
        return list;
      })
      .then((list) => {
        // setIdList(list);
        return list;
      })
      .then((list) => {
        //list -> [24,52,324,12,4,53,2,,41,3,5,6,56]
        let pdis = [];
        const fetchData = async (id, idx) => {
          console.log(id);
          try {
            setError(null);
            setData(null);
            await axios
              .get(`/${id + 1}`)
              .then((res) => {
                const replaceInString = (fullString, search, replacement) => {
                  return fullString.split(search).join(replacement);
                };
                const json = JSON.parse(replaceInString(res.data, "'", '"'));
                return json;
              })
              .then(async (json) => {
                const fetchAttention = async (id, idx) => {
                  let toSet = [];
                  /** attention = {imageAttention : [[],[],[],[],[],[],[],[],[]],
                   * pdiAttention:[[],[],[],[],[],[],[],[],[]],
                   * pdiAttention2:[]}
                   */
                  axios
                    .get(`/att/${id}`)
                    .then((res) => {
                      let list = res.data.replaceAll("'", '"').replaceAll("}{", "}},{{");
                      // list = list.replaceAll("[","\"[").replaceAll("]","]\"")
                      let arr = list.split("},{");

                      const tmp = arr.map((item) => {
                        //attention parsing
                        let tokenized = "";
                        let obj = {};
                        let len = item.split('", ').length;
                        item.split('", ').map((str, idx) => {
                          let item;
                          let key;
                          let value;
                          if (idx === 0) {
                            item = str.slice(1, str.length);
                            key = item.split(": ")[0];
                            key = key.replaceAll(/\"/g, "");
                            value = item.split(": ")[1];
                            value = value.replace(/"/, "");
                            obj[key] = value;
                          } else if (idx < 7 && idx > 0) {
                            item = str;
                            key = item.split(": ")[0];
                            key = key.replaceAll(/\"/g, "");
                            value = item.split(": ")[1];
                            value = value.replace(/"/, "");
                            obj[key] = value;
                          } else if (idx >= 7 && idx < len - 1) {
                            if (idx === len - 2) tokenized += str;
                            else tokenized += str + '", ';

                            if (idx === len - 2) {
                              key = tokenized.split(": ")[0];
                              key = key.replaceAll(/\"/g, "");
                              value = tokenized.split(": ")[1];
                              value = value.replace(/"/, "");
                              value = value.replace(/\",\"/, "");
                              if (value[value.length - 1] === '"') {
                                value = value.substring(0, value.length - 1);
                              }
                              obj[key] = value;
                            }
                          } else if (idx === len - 1) {
                            item = str.slice(0, str.length - 1);
                            key = item.split(": ")[0];
                            key = key.replaceAll(/\"/g, "");
                            value = item.split(": ")[1];
                            value = value.replace(/"/, "");
                            if (value[value.length - 1] === '"') {
                              value = value.substring(0, value.length - 1);
                            }
                            obj[key] = value;
                          }
                        });

                        toSet.push(JSON.parse(JSON.stringify(obj)));
                      });
                      json["attention"] = toSet;
                      pdis.push(json);
                    })
                    .then(() => {
                      setData(pdis);
                    });
                };

                await fetchAttention(id, idx);
              });
          } catch (e) {
            setError(e);
          }
        };

        const loopFetch = async (CASE_NUM) => {
          for (let caseNum = 0; caseNum < CASE_NUM; caseNum++) {
            try {
              await fetchData(list[caseNum], caseNum);
              //   console.log(data);
            } catch (e) {
              setError(e);
            }
          }
          setTab(0);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        };
        loopFetch(list.length);
      });
  }, []);

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

  const searchCase = () => {
    if (search.length > 0) {
      // console.log(search);
      // console.log(data[50]);

      let found;
      data.map((item, idx) => {
        if (item["image_name"].includes(search)) {
          setTab(idx);
          found = item;
        }
      });
      // console.log(found);
      if (found === undefined) {
        alert("찾는 케이스가 없습니다");
      }
      setSearch("");
    }
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
          {/* <Type>
            <h3>Test {testType}</h3>
          </Type> */}
          <Title>
            <h1>AI&AT</h1>
          </Title>
          <ActionContainer>
            <TextField
              value={search}
              id="search-image"
              label="Search image id"
              variant="outlined"
              placeholder="00004_pitr_010106.jpg"
              onChange={handleSearchChange}
            />
            <Button variant="outlined" onClick={searchCase} style={{ margin: "10px" }}>
              검색
            </Button>
            <Button variant="outlined" onClick={logout} style={{ margin: "10px" }}>
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
                  {...allyProps(idx)}
                ></StyledTab>
              );
            })}
          </StyledTabs>
        </TabContainer>
        <Content>
          <ExplainabilityContainer>
            <Explainability
              pdi={data[tab]}
              pdiIdx={tab}
              attention={data[tab]["attention"]}
              attentionLevel="2"
            ></Explainability>
            <Explainability
              pdi={data[tab]}
              pdiIdx={tab}
              attention={data[tab]["attention"]}
              attentionLevel="1"
            ></Explainability>
          </ExplainabilityContainer>
          <ModelInfoContainer>
            <AccuracyInfo accuracy={83.3} />
            <PredictionInfo
              pdi={data[tab]}
              modelPrediction={data[tab]["attention"][0]["prediction"]}
              classified={data[tab]["gt"]}
              // confidence={data[tab]['confidence']}
              confidence={68}
            ></PredictionInfo>
          </ModelInfoContainer>
          {/* <Test callback={loadExcel} /> */}
        </Content>
      </Container>
    );
};
export default Contents;
