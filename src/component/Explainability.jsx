import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import PdiResult from './PdiResult';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex: 1;
  margin: 10px;
  justify-content: space-around;
  align-items: center;
  box-shadow: 1px 1px 2px 1px #dadce0;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Image = styled.img`
  width: 100%;
  max-width: 400px;
  max-height: 350px;
  box-shadow: 1px 1px 2px 1px #dadce0;
  margin-bottom: 10px;
`;

const PdiContainer = styled.div`
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

const Explainability = ({ pdi, img }) => {
  const [button, setButton] = useState(null); //true = Show Heatmap, false = Show original

  useEffect(() => {
    setButton(true);
  }, [pdi]);

  return (
    <Container>
      <ImageContainer>
        <Image src={img} alt="image" />
        {button ? (
          <Button
            variant="outlined"
            onClick={() => {
              setButton(!button);
            }}
          >
            Show Heatmap
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setButton(!button);
            }}
          >
            Show Original
          </Button>
        )}
      </ImageContainer>
      <PdiContainer>
        <PdiResult pdi={pdi} />
      </PdiContainer>
    </Container>
  );
};
export default Explainability;
