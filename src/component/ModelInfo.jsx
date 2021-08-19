import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const Accuracy = styled.img``;
const Confidence = styled.img``;

const ModelInfo = () => {
  return (
    <Container>
      <Accuracy alt="model accuracy" />
      <Confidence alt="model confidence" />
    </Container>
  );
};
export default ModelInfo;
