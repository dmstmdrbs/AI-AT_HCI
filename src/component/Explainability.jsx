import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import h337 from 'heatmap.js';
import PdiResult from './PdiResult';
import { pointsObj } from './points'

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

const Explainability = ({ pdi, pdiIdx, attention }) => {
  const [button, setButton] = useState(null); //true = Show Heatmap, false = Show original
  const [clicked, setClicked] = useState(0);
  const [weights, setWeights] = useState([]);

  
  useEffect(() => {
    console.log(attention);
    setButton(true);
  }, [pdi]);

  useEffect(() => {
    
    if (!button) {
      if (clicked === null || clicked === 0 || clicked === 1)
        console.log('1번과 2번을 제외한 pdi를 선택해주세요');
      else {
          console.log(`clicked : ${clicked}`);
        if(clicked>=2){
          
          let pointsStr = attention[clicked-2]['image_att'];
          // console.log(pointsStr);
          // console.log(pointsStr.length);
          let pointsArr = pointsStr.slice(1,pointsStr.length-1).split(', ');
          let points = [];
          pointsObj.map((item,idx)=>{
              let obj = item; 
              if(pointsArr[idx]*100>=1){
                pointsArr[idx] = 0.0098;
              }
              obj['value']=parseFloat((pointsArr[idx]*100).toFixed(2));
              points.push(obj);
            });
            
            if(points.length===256){
              console.log(points);
              var heatmapInstance = h337.create({
                container: document.querySelector('.heatmap'),
                maxOpacity:.6
              })
              // heatmapInstance.setDataMax(255);
              heatmapInstance.setData({max:1,min:0,data:points});
              setTimeout(()=>{
                
                console.log(heatmapInstance.getData());
              },1000);
            }
        }
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
        <PdiResult
          pdi={pdi}
          pdiIdx={pdiIdx}
          callback={getClickedIdx}
          attention={attention}
        />
      </PdiContainer>
    </Container>
  );
};
export default Explainability;
