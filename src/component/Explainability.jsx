import React, { useEffect, useState, useRef } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import testTypeState from "../states/testType";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import h337 from "heatmap.js";

import PdiResult from "./PdiResult";
import PredictionInfo from "./PredictionInfo";
import { pointsObj } from "./points";

const Container = styled.div`
  padding: 10px;
  display: flex;
  position: relative;
  flex-basis: auto;
  margin: 10px;
  align-items: center;
  box-shadow: 1px 1px 2px 1px #dadce0;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  max-width: 512px;
  max-height: 512px;
  box-shadow: 1px 1px 2px 1px #dadce0;
`;
const HeatmapContainer = styled.div`
  display: flex;
  align-items: center;
  width: 512px;
  height: 512px; ;
`;
const OriginalContainer = styled.div`
  display: flex;
  align-items: center;
  width: 512px;
  height: 512px;
`;

const PdiContainer = styled.div`
  margin-left: 80px;
  display: flex;
  min-height: 512px;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;

    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const GuageBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  background-color: #dbdbdb;
  height: 20px;
  width: 300px;
`;
const GuageButton = styled.button`
  width: 60px;
  height: 100%;
  border: 0;
`;

const Explainability = ({ pdi, pdiIdx, attention, attentionLevel }) => {
  const [button, setButton] = useState(null); //true = Show Heatmap, false = Show original
  const [clicked, setClicked] = useState(null);
  const [radius, setRadius] = useState(40);
  const [att2Weight, setAtt2Weight] = useState(null);
  const [att1Weight, setAtt1Weight] = useState(null);
  const imageRef1 = { id: "pitr1", ref: useRef(null) };
  const imageRef2 = { id: "pitr2", ref: useRef(null) };
  const att1Ref = [
    { id: "token1", ref: useRef(null) },
    { id: "token2", ref: useRef(null) },
    { id: "token3", ref: useRef(null) },
    { id: "token4", ref: useRef(null) },
    { id: "token5", ref: useRef(null) },
    { id: "token6", ref: useRef(null) },
    { id: "token7", ref: useRef(null) },
    { id: "token8", ref: useRef(null) },
    { id: "token9", ref: useRef(null) },
    { id: "token10", ref: useRef(null) },
    { id: "token11", ref: useRef(null) },
    { id: "token12", ref: useRef(null) },
    { id: "token13", ref: useRef(null) },
    { id: "token14", ref: useRef(null) },
    { id: "token15", ref: useRef(null) },
  ];
  const att2Ref = [
    {},
    {},
    { id: "pdi3", ref: useRef(null) },
    { id: "pdi4", ref: useRef(null) },
    { id: "pdi5", ref: useRef(null) },
    { id: "pdi6", ref: useRef(null) },
    { id: "pdi7", ref: useRef(null) },
    { id: "pdi8", ref: useRef(null) },
    { id: "pdi9", ref: useRef(null) },
    { id: "pdi10", ref: useRef(null) },
  ];

  var heatmapInstance;

  useEffect(() => {
    let arr = attention[8]["pdi_answer_att2"]
      .slice(1, attention[8]["pdi_answer_att2"].length - 1)
      .split(", ");
    arr = arr.map((strNum) => Number(strNum));
    setAtt2Weight(arr);
    // console.log(arr);
    setButton(true);

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
      setAtt1Weight(arr);
    }
    // console.log(imageRef1);
    // console.log(imageRef2)
  }, [pdi]);

  useEffect(() => {
    if (!button) {
      if (attentionLevel === "1" && (clicked === null || clicked === 0 || clicked === 1))
        console.log("1번과 2번을 제외한 pdi를 선택해주세요");
      else {
        // console.log(`clicked : ${clicked}`);
        if (clicked >= 2 && attentionLevel === "1") {
          let pointsStr = attention[clicked - 2]["image_att"];
          let pointsArr = pointsStr.slice(1, pointsStr.length - 1).split(", ");
          let points = [];
          const tmp = pointsObj.map((item, idx) => {
            let obj = item;
            if (pointsArr[idx] * 100 >= 1) {
              pointsArr[idx] = 0.0098;
            }
            obj["value"] = parseFloat((pointsArr[idx] * 100).toFixed(2));
            points.push(obj);
          });

          if (points.length === 256) {
            // console.log(points);
            heatmapInstance = h337.create({
              container: document.querySelector(".heatmap"),
              maxOpacity: radius === 40 ? 0.65 : radius === 45 ? 0.6 : 0.5,
              radius: radius,
            });

            // heatmapInstance.setDataMax(255);
            heatmapInstance.setData({
              max: 1,
              min: 0,
              data: points,
            });
          }
        }
      }
    }
  }, [button]);

  useEffect(() => {
    setButton(!button);
    setTimeout(() => {
      setButton(false);
    }, 50);
  }, [radius]);

  useEffect(() => {
    //   // console.log(clicked);
    //   // setButton(true);
    if (button === true) {
      setButton(!button);
      setButton(!button);
    }
    // console.log(att1Ref)
  }, [clicked]);

  const getClickedIdx = (idx) => {
    setClicked(idx);
    // setButton(true);
    setButton(true);
  };

  return (
    <div>
      {attentionLevel === "1" && (
        <>
          <h2>모델의 판단 근거 시각화</h2>
          <Container id="canvas">
            <ImageContainer ref={imageRef1} id="pitr_att1">
              {button ? (
                <>
                  <OriginalContainer>
                    <Image src={`http://15.164.105.78:8000/test/${pdi["id"]}`} alt="pitr" />
                  </OriginalContainer>
                </>
              ) : (
                <>
                  <HeatmapContainer className="heatmap">
                    <Image src={`http://15.164.105.78:8000/test/${pdi["id"]}`} alt="heatmap" />
                  </HeatmapContainer>
                </>
              )}
              <br />
              <GuageBar>
                <GuageButton
                  style={{ backgroundColor: "#FFFF66" }}
                  onClick={() => {
                    setRadius(40);
                  }}
                >
                  40
                </GuageButton>
                <GuageButton
                  style={{ backgroundColor: radius >= 45 ? "#FFFF66" : "#dbdbdb" }}
                  onClick={() => {
                    setRadius(45);
                  }}
                >
                  45
                </GuageButton>
                <GuageButton
                  style={{ backgroundColor: radius >= 50 ? "#FFFF66" : "#dbdbdb" }}
                  onClick={() => {
                    setRadius(50);
                  }}
                >
                  50
                </GuageButton>
                <GuageButton
                  style={{ backgroundColor: radius >= 55 ? "#FFFF66" : "#dbdbdb" }}
                  onClick={() => {
                    setRadius(55);
                  }}
                >
                  55
                </GuageButton>
                <GuageButton
                  style={{ backgroundColor: radius >= 60 ? "#FFFF66" : "#dbdbdb" }}
                  onClick={() => {
                    setRadius(60);
                  }}
                >
                  60
                </GuageButton>
              </GuageBar>
              <Button
                variant="outlined"
                onClick={() => {
                  setButton(!button);
                }}
              >
                {button ? "Show Heatmap" : "Show Original"}
              </Button>
            </ImageContainer>

            <PdiContainer>
              <PdiResult
                pdi={pdi}
                pdiIdx={pdiIdx}
                callback={getClickedIdx}
                attention={attention}
                attentionLevel={attentionLevel}
                level1Ref={att1Ref}
                level2Ref={att2Ref}
              />
            </PdiContainer>
            <Xwrapper>
              {attentionLevel === "1" &&
                clicked >= 2 &&
                att1Weight &&
                att1Weight[clicked - 2]["tokenized"].map((ref, idx) => (
                  <Xarrow
                    strokeWidth={att1Weight[clicked - 2]["tokenizedWeight"][idx] * 15}
                    showHead={true}
                    headSize={2}
                    curveness="0.2"
                    lineColor="#4a6fe4"
                    headColor="#4a6fe4"
                    start={att1Ref[idx]}
                    end={imageRef1}
                  />
                ))}
            </Xwrapper>
            {/* att2 => 원본 그림과 PDI답변, 왼쪽의 weight att1로 옮기기, 선 삭제 / att1 : 모델의 판단 근거 시각화 and 문장 아래 weight 없애기 */}
            {/* 100/8 = 12.5 => 평균, 평균보다 더 많은 가중치를 받았으면 모델이 더 많은 신경을 썼다고 판단, High precision = 12.5이상/ High recall일때는 다 보여주기 */}
          </Container>
        </>
      )}
      {attentionLevel === "2" && (
        <>
          <h2>원본 그림과 PDI답변</h2>
          <Container>
            <ImageContainer>
              <OriginalContainer>
                <Image src={`http://15.164.105.78:8000/test/${pdi["id"]}`} alt="pitr" />
              </OriginalContainer>
            </ImageContainer>

            <PdiContainer>
              <PdiResult
                pdi={pdi}
                pdiIdx={pdiIdx}
                callback={getClickedIdx}
                attention={attention}
                attentionLevel={attentionLevel}
                level1Ref={att1Ref}
                level2Ref={att2Ref}
              />
            </PdiContainer>
          </Container>
        </>
      )}
    </div>
  );
};
export default Explainability;
