import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import testTypeState from "../states/testType";

import MyHiglighter from "./MyHighlighter";

const Container = styled.div`
  display: flex;
  position: relative;
  box-shadow: 1px 1px 2px 1px #dadce0;
  max-width: 750px;
`;
const PdiList = styled.ul`
  list-style: none;
  list-style-type: none;
  justify-content: start;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const ListItem = styled.button`
  position: relative;
  border: none;
  padding: 5px;
  min-width: ;
  text-align: start;
  background-color: ${(props) => (props.clicked === props.idx ? "#d1d1d1" : "#ffffff")};
  cursor: ${(props) =>
    props.attentionLevel === "1" && props.valid ? (props.idx >= 2 ? "pointer" : "") : ""};
`;

// const Button = styled.button`
//   width: 200px;
//   margin-top:20px;
//   align-self: center;
//   background-color:white;
//   border-radius:5px;
//   height:2rem;
// `;

const TokenContainer = styled.div`
  width: 150px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: center;
`;
const TokenText = styled.span`
  margin: 5px;
  font-size: 1rem;
`;
const PdiResult = ({ pdi, pdiIdx, callback, attention, attentionLevel, level1Ref, level2Ref }) => {
  const [pitrQ, setPitrQ] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [att2, setAtt2] = useState(null);
  const [token, setToken] = useState(null);
  const testType = useRecoilValue(testTypeState);
  const pdiRef = useRef(null);

  useEffect(() => {
    console.log(pdi);
    console.log(attention);
    if (attentionLevel === "1") {
      let arr = attention.map((att, idx) => {
        if (idx <= 7) {
          let tokenized = att["tokenized"].replace(/\",\",/gi, "");
          tokenized = tokenized.replace(/, ,/g, ", ");
          tokenized = JSON.parse(tokenized);

          let tokenizedWeight = att["tokenized_att"]
            .slice(1, att["tokenized_att"].length - 1)
            .split(", ");
          tokenizedWeight = tokenizedWeight.map((item) => Number(item));
          // console.log(tokenized,tokenizedWeight);
          return { tokenized: tokenized, tokenizedWeight: tokenizedWeight };
        }
      });
      setToken(arr);
      // console.log(level1Ref);
    }

    let arr = attention[8]["pdi_answer_att2"]
      .slice(1, attention[8]["pdi_answer_att2"].length - 1)
      .split(", ");
    arr = arr.map((strNum) => Number(strNum));
    setTimeout(() => {
      setAtt2(arr);
    }, 100);

    setClicked(null);
    const parseQuestion = (pdi) => {
      let pitrQ = [];

      for (const key in pdi) {
        if (!key.indexOf("pitrQ")) {
          pitrQ.push(key);
        }
      }
      return pitrQ;
    };

    const qList = parseQuestion(pdi);
    setPitrQ(qList);
  }, [pdi]);

  useEffect(() => {
    callback(clicked);
  }, [clicked]);

  const onClickHighlight = () => {
    setHighlight((prev) => !prev);
  };

  return (
    <Container>
      {attentionLevel === "1" && level1Ref && (
        <TokenContainer>
          {token &&
            clicked >= 2 &&
            token[clicked - 2]["tokenized"].map((item, idx) => {
              return (
                <>
                  <TokenText ref={level1Ref[idx]}>
                    {`[ ${(token[clicked - 2]["tokenizedWeight"][idx] * 100).toFixed(1)}% ]`} {item}
                  </TokenText>
                </>
              );
            })}
        </TokenContainer>
      )}
      {att2 && (
        <PdiList>
          {pitrQ.map((item, idx) => {
            return (
              <ListItem
                key={idx}
                ref={idx >= 2 ? level2Ref[idx] : null}
                id={idx >= 2 ? level2Ref[idx].id : null}
                primary={`${item} - ${pdi[item]}`}
                clicked={clicked}
                idx={idx}
                valid={
                  testType === "B"
                    ? true
                    : testType === "A" && idx >= 2 && att2[idx - 2] * 100 >= 12.5
                    ? true
                    : false
                }
                attentionLevel={attentionLevel}
                onClick={() => {
                  //TODO : testType === 'A' ? 0 : 클릭 무반응, 1: 기존처럼 클릭
                  //if (attentionLevel === "1") clicked === idx ? setClicked(null) : (testType==='A' ? setClicked(null) : setClicked(idx);

                  if (attentionLevel === "1" && idx >= 2)
                    if (testType === "A" && att2[idx - 2] * 100 < 12.5) {
                      console.log("none");
                    } else {
                      clicked === idx ? setClicked(null) : setClicked(idx);
                    }
                }}
              >
                {idx >= 2 ? (
                  <>
                    {attentionLevel === "1" && att2 ? (
                      <span style={{ fontSize: "1rem" }}>{`[${(att2[idx - 2] * 100).toFixed(
                        1,
                      )}%]`}</span>
                    ) : (
                      <></>
                    )}

                    <span style={{ fontSize: 16 }}> {item} - </span>
                    <MyHiglighter
                      attentionLevel={attentionLevel}
                      sentence={`${pdi[item]}`}
                      weight={attention[idx - 2]["pdi_att_token"]}
                      token={attention[idx - 2]["tokenized"]}
                      tokenized_att={attention[idx - 2]["tokenized_att"]}
                      index={idx - 2}
                    />
                  </>
                ) : (
                  <div>
                    <span style={{ fontSize: "1rem" }}>
                      {`${item} - ${pdi[item]}`}
                      <span style={{ fontSize: "1rem", margin: "5px" }}></span>
                    </span>
                  </div>
                )}
              </ListItem>
            );
          })}
        </PdiList>
      )}
    </Container>
  );
};
export default PdiResult;
