import React from "react";
import styled from "styled-components";
import ModelConfidence from "./ModelConfidence";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Prediction = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ModelInfo = ({ pdi, modelPrediction, classified }) => {
  // console.log(pdi["id"]);
  return (
    <Container>
      <Prediction>
        <ModelConfidence />
        {modelPrediction === "no_stress" ? (
          <span>
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
          </span>
        ) : (
          <span>
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
          </span>
        )}
      </Prediction>
      {/* <Confidence src={`http://15.164.105.78:8000/confidence/${pdi["id"]}`} alt="model confidence" /> */}
    </Container>
  );
};
export default ModelInfo;
