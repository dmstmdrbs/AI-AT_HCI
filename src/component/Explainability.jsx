import React, { useEffect, useState, createRef } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import h337 from 'heatmap.js';
import PdiResult from './PdiResult';
import { pointsObj } from './points'

const Container = styled.div`
  padding: 10px;
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
  height: 512px;
`;
const PdiContainer = styled.div`
  display:flex;
  min-height:512px;
  flex:1;
  flex-direction:column;
  align-items:space-around;
  justify-content:space-around;
  margin-left:40px;
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
display:flex;
justify-content:center;
  margin-bottom:10px;
  background-color:#dbdbdb;
  height:20px;
  width:300px;
`
const GuageButton = styled.button`
width:60px;
height:100%;
border: 0 ;
`;
const Stress = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;
const Explainability = ({ pdi, pdiIdx, attention, attentionLevel }) => {
  const [button, setButton] = useState(null); //true = Show Heatmap, false = Show original
  const [clicked, setClicked] = useState(2);
  const [radius,setRadius] = useState(40);
 
  // let canvase;
  // let canvaseRef = createRef();
  // let position = { drawable: false, X: -1, Y:-1};
  // let ctx;
  var heatmapInstance;
  useEffect(() => {
    console.log(attention);
    setButton(true);

  }, [pdi]);

  useEffect(() => {
    if (!button) {
      if (attentionLevel==='1' && (clicked === null || clicked === 0 || clicked === 1))
        console.log('1번과 2번을 제외한 pdi를 선택해주세요');
      else {
          console.log(`clicked : ${clicked}`);
        if(clicked>=2 || attentionLevel==='2'){
          
          let pointsStr = attentionLevel==='1' ? attention[clicked-2]['image_att'] : attention[8]['image_att2'];
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
              heatmapInstance = h337.create({
                container: attentionLevel==='1' ? document.querySelector('.heatmap') : document.querySelector('.heatmap-level2'),
                maxOpacity:radius===40 ? 0.65: (radius===45 ? 0.6 : 0.5),
                radius: radius
              })
            
              // heatmapInstance.setDataMax(255);
              heatmapInstance.setData({
                max: 1,
                min:0,
                data:points});
              setTimeout(()=>{
                
                console.log(heatmapInstance.getData());
              },1000);
            }
        }
      }
    }
  }, [button]);

  useEffect(()=>{
      setButton(!button);
      setTimeout(()=>{
        setButton(false)
      },50)
      
  },[radius])

  useEffect(() => {
    // console.log(clicked);
    setButton(true);
  }, [clicked]);

  const getClickedIdx = (idx) => {
    setClicked(idx);
    setButton(true);
  };

  return (
    <div>
      {attentionLevel==='1' ? <h2>Attention Level 1</h2> : <h2>Attention Level 2</h2>}
      <Container id="canvas">
          <ImageContainer>
            {attentionLevel==='1'&&<Stress>
              <h3>Stress result</h3>
              <p>Classified : {pdi['gt']}</p>
              <p>Prediction : {attention[0]['prediction']}</p>
            </Stress>}
            {button ? (
              <>
                <OriginalContainer>
                  <Image src={`http://15.164.105.78:8000/test/${pdi['id']}`} alt="pitr" />
                </OriginalContainer>
              </>
            ) : (
              <>
              {attentionLevel==='1' ? 
                <HeatmapContainer className="heatmap">
                  <Image src={`http://15.164.105.78:8000/test/${pdi['id']}`} alt="heatmap" />
                </HeatmapContainer> : 
              <HeatmapContainer className="heatmap-level2">
              <Image src={`http://15.164.105.78:8000/test/${pdi['id']}`} alt="heatmap" />
            </HeatmapContainer>
            }
              </>
            )}
            <br/>
            <GuageBar>
              <GuageButton style={{backgroundColor:'#FFFF66'}} onClick={()=>{setRadius(40)}}>40</GuageButton>
              <GuageButton style={{backgroundColor:radius>=45?'#FFFF66':'#dbdbdb'}} onClick={()=>{setRadius(45)}}>45</GuageButton>
              <GuageButton style={{backgroundColor:radius>=50?'#FFFF66':'#dbdbdb'}} onClick={()=>{setRadius(50)}}>50</GuageButton>
              <GuageButton style={{backgroundColor:radius>=55?'#FFFF66':'#dbdbdb'}} onClick={()=>{setRadius(55)}}>55</GuageButton>
              <GuageButton style={{backgroundColor:radius>=60?'#FFFF66':'#dbdbdb'}} onClick={()=>{setRadius(60)}}>60</GuageButton>
            </GuageBar>
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
            {attentionLevel==='2'&&<Stress>
                <h3>Stress result</h3>
                <p>Classified : {pdi['gt']}</p>
                <p>Prediction : {attention[0]['prediction']}</p>
              </Stress>}
            <PdiResult
              pdi={pdi}
              pdiIdx={pdiIdx}
              callback={getClickedIdx}
              attention={attention}
              attentionLevel={attentionLevel}
            />
          </PdiContainer>
      </Container>
    </div>
  );
};
export default Explainability;
