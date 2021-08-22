import React from "react";
import styled from "styled-components";
import ModelConfidence from "./GaugeChart";

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Prediction = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const PredictionText = styled.span`
  font-size: 1.2rem;
`;
const PredictionInfo = ({ pdi, modelPrediction, classified, confidence }) => {
  console.log(confidence);
  return (
    <Container>
      <h2>본 테스트에 대한 AI의 진단 예측</h2>
      <ModelConfidence
        chartId="confidence"
        firstColor="#34ef85"
        secondColor="#e8e8e8"
        leftLabel="Low Confidence"
        rightLabel="High Confidence"
        gaugeValue={confidence}
      />
      <Prediction>
        {modelPrediction === "no_stress" ? (
          <PredictionText>
            AI가{" "}
            {/* {classified === "no_stress" ? (
              <span>
                <strong>스트레스가 없는 </strong> 케이스를
              </span>
            ) : (
              <span>
                <strong>스트레스가 있는 </strong> 케이스를
              </span>
            )} */}
            '<strong>스트레스가 없다</strong>'고 분류하였습니다.
          </PredictionText>
        ) : (
          <PredictionText>
            AI가{" "}
            {/* {classified === "no_stress" ? (
              <span>
                <strong>스트레스가 없는 </strong> 케이스를
              </span>
            ) : (
              <span>
                <strong>스트레스가 있는 </strong> 케이스를
              </span>
            )}{" "} */}
            '<strong>스트레스가 있다</strong>'고 분류하였습니다.
          </PredictionText>
        )}
      </Prediction>
      {/* <Confidence src={`http://15.164.105.78:8000/confidence/${pdi["id"]}`} alt="model confidence" /> */}
    </Container>
  );
};
export default PredictionInfo;
