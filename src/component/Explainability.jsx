import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import h337 from 'heatmap.js';
import PdiResult from './PdiResult';
import { ControlCameraOutlined } from '@material-ui/icons';

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
  height: 512px; ;
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

const Explainability = ({ pdi, pdiIdx, weightList }) => {
  const [button, setButton] = useState(null); //true = Show Heatmap, false = Show original
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    console.log(pdi);
    setButton(true);
  }, [pdi]);

  useEffect(() => {
    const strToArray = (str) => {
      str = str.slice(1, str.length - 1);

      console.log(`parsed : ${str}`);
      let arr = str.split(', ');
      console.log(arr);
      return arr;
    };
    if (!button) {
      if (clicked === null || clicked === 0 || clicked === 1)
        console.log('1번과 2번을 제외한 pdi를 선택해주세요');
      else {
        const setHeatmap = (points) => {
          console.log('did!');
          let heatmapInstance = h337.create({
            // only container is required, the rest will be defaults
            container: document.querySelector('.heatmap'),
          });

          // heatmap data format
          let data = {
            max: 2,
            data: points,
          };
          console.log(data);
          // if you have a set of datapoints always use setData instead of addData
          // for data initialization
          heatmapInstance.setData(data);
        };

        console.log(`9*pdiIdx+clicked : ${9 * pdiIdx + clicked}`);
        let pointsTest = weightList[9 * pdiIdx + clicked - 2]['image_att'];
        console.log(pointsTest);
        let pointsArray = strToArray(pointsTest);
        for (let i in pointsArray) {
          console.log(`pointsArray[${i}] : ${pointsArray[i]}`);
        }
        let points = [
          { x: 128, y: 128, value: pointsArray[0] * 10 },
          { x: 128, y: 256, value: pointsArray[1] * 10 },
          { x: 128, y: 384, value: pointsArray[2] * 10 },
          { x: 256, y: 128, value: pointsArray[3] * 10 },
          { x: 256, y: 256, value: pointsArray[4] * 10 },
          { x: 256, y: 384, value: pointsArray[5] * 10 },
          { x: 384, y: 128, value: pointsArray[6] * 10 },
          { x: 384, y: 256, value: pointsArray[7] * 10 },
          { x: 384, y: 384, value: pointsArray[8] * 10 },
        ];

        setHeatmap(points);
      }
    }
  }, [button]);

  useEffect(() => {
    console.log(clicked);
    setButton(true);
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
