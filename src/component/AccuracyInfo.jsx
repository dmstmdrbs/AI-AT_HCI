import React, { useLayoutEffect } from "react";
import styled from "styled-components";

import ModelAccuracy from "./ModelAccuracy";
import ModelConfidence from "./GaugeChart";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ModelInfoContainer = styled.div`
  display: flex;
  align-items: space-between;
`;

const Confidence = styled.img`
  margin: 10px;
`;
const Accuracy = styled.img`
  margin: 10px;
`;
const AccuracyInfo = ({ accuracy }) => {
  return (
    <Container>
      {/* <Accuracy src={`http://15.164.105.78:8000/accuracy}`} alt="model accuracy" /> */}
      <h2>AI의 정확도 : {accuracy}%</h2>
      <ModelConfidence
        chartId="accuracy"
        firstColor="#6ea6f4"
        secondColor="#e8e8e8"
        leftLabel=""
        rightLabel=""
        gaugeValue={accuracy}
      />
      <p style={{ textAlign: "left" }}>
        <h4>AI의 정확도란?</h4>
        <span>AI가 10개의 검사 결과를 보았을 때 약 8개를 맞출 수 있습니다.</span>
      </p>
      {/* <ModelAccuracy /> */}

      {/* <Confidence src={`15.164.105.78:8000/confidence/${pdi["id"]}`} alt="model confidence" /> */}
    </Container>
  );
};
export default AccuracyInfo;
