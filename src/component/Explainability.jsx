import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import h337 from 'heatmap.js';
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
const HeatmapContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 350px;
`;
const OriginalContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 350px;
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
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    console.log(pdi);
    setButton(true);
  }, [pdi]);

  useEffect(() => {
    if (!button) {
      const setHeatmap = (points) => {
        console.log('did!');
        let heatmapInstance = h337.create({
          // only container is required, the rest will be defaults
          container: document.querySelector('.heatmap'),
        });

        // heatmap data format
        let data = {
          max: 10,
          data: points,
        };
        // if you have a set of datapoints always use setData instead of addData
        // for data initialization
        heatmapInstance.setData(data);
      };

      let points = [
        { x: 340, y: 150, value: 5 },
        { x: 121, y: 150, value: 6 },
        { x: 100, y: 150, value: 4 },
        { x: 110, y: 190, value: 3 },
        { x: 120, y: 200, value: 8 },
        { x: 300, y: 80, value: 5 },
        { x: 201, y: 200, value: 4 },
        { x: 250, y: 180, value: 2 },
        { x: 310, y: 251, value: 3 },
        { x: 300, y: 300, value: 2 },
      ];

      setHeatmap(points);
    }
  }, [button]);

  useEffect(() => {
    console.log(clicked);
  }, [clicked]);

  const getClickedIdx = (idx) => {
    setClicked(idx);
  };

  return (
    <Container>
      <ImageContainer>
        {button ? (
          <>
            <OriginalContainer>
              <Image src={`http://15.164.105.78:8000/test/${pdi['id']}`} alt="pitr" />
            </OriginalContainer>
          </>
        ) : (
          <>
            <HeatmapContainer className="heatmap">
              <Image src={`http://15.164.105.78:8000/test/${pdi['id']}`} alt="heatmap" />
            </HeatmapContainer>
          </>
        )}
        <Button
          variant="outlined"
          onClick={() => {
            setButton(!button);
          }}
        >
          {button ? 'Show Heatmap' : 'Show Original'}
        </Button>
      </ImageContainer>
      <PdiContainer>
        <PdiResult pdi={pdi} callback={getClickedIdx} />
      </PdiContainer>
    </Container>
  );
};
export default Explainability;
