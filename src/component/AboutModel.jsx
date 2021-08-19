import React from "react";
import styled from "styled-components";

import ModelAccuracy from "./ModelAccuracy";

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
const AboutModel = () => {
  return (
    <Container>
      {/* <Accuracy src={`http://15.164.105.78:8000/accuracy}`} alt="model accuracy" /> */}
      <p>모델의 정확도 : 80%</p>
      <ModelAccuracy />

      {/* <Confidence src={`15.164.105.78:8000/confidence/${pdi["id"]}`} alt="model confidence" /> */}
    </Container>
  );
};
export default AboutModel;
