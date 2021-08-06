import React, { useEffect, useState, useRef } from 'react';
import Xarrow ,{Xwrapper} from 'react-xarrows';
// import axios from 'axios';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import h337 from 'heatmap.js';
import PdiResult from './PdiResult';
import { pointsObj } from './points'

const Container = styled.div`
  padding: 10px;
  display: flex;
  position:relative;
  flex-basis:auto;
  margin: 10px;
  align-items: center;
  box-shadow: 1px 1px 2px 1px #dadce0;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position:relative;
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
  margin-left:100px;
  display:flex;
  min-height:512px;
  flex-direction:column;
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
  const [att2Weight,setAtt2Weight] = useState(null);
  const imageRef1 = {id:'pitr1',ref:useRef(null)};
  const imageRef2 = {id:'pitr2', ref:useRef(null)}
  const att1Ref =[{},{},{id:'pdi3',ref:useRef(null)},{id:'pdi4',ref:useRef(null)},{id:'pdi5',ref:useRef(null)},{id:'pdi6',ref:useRef(null)},{id:'pdi7',ref:useRef(null)},{id:'pdi8',ref:useRef(null)},{id:'pdi9',ref:useRef(null)},{id:'pdi10',ref:useRef(null)}]
  const att2Ref =[{},{},{id:'pdi3',ref:useRef(null)},{id:'pdi4',ref:useRef(null)},{id:'pdi5',ref:useRef(null)},{id:'pdi6',ref:useRef(null)},{id:'pdi7',ref:useRef(null)},{id:'pdi8',ref:useRef(null)},{id:'pdi9',ref:useRef(null)},{id:'pdi10',ref:useRef(null)}]

  var heatmapInstance;

  useEffect(() => {
    console.log(attention);
    let arr =attention[8]['pdi_answer_att2'].slice(1,attention[8]['pdi_answer_att2'].length-1).split(', ');
    arr = arr.map(strNum=>Number(strNum)); 
    setAtt2Weight(arr);
    console.log(arr);
    setButton(true);
    console.log(imageRef1);
    console.log(imageRef2)
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
    // setButton(true);
    setButton(false);
  }, [clicked]);

  const getClickedIdx = (idx) => {
    setClicked(idx);
    setButton(true);
  };

  return (
    <div>
      {attentionLevel==='1' ? <h2>Attention Level 1</h2> : <h2>Attention Level 2</h2>}
      <Container id="canvas">
          <ImageContainer ref={attentionLevel==='1'?imageRef1:imageRef2} id={attentionLevel==='1' ? 'pitr_att1' : 'pitr_att2'}>
            {attentionLevel==='1'&&<Stress>
              <h3 style={{margin:'5px'}}>Stress result</h3>
              <p style={{margin:'5px'}}>Classified : {pdi['gt']}</p>
              <p style={{margin:'10px'}}>Prediction : {attention[0]['prediction']}</p>
            </Stress>}
            <>
              {button ? (
              <>
                <OriginalContainer>
                  <Image  src={`http://15.164.105.78:8000/test/${pdi['id']}`} alt="pitr" />
                </OriginalContainer>
              </>
            ) : (
              <>
              {attentionLevel==='1' ? 
                <HeatmapContainer className="heatmap">
                  <Image  src={`http://15.164.105.78:8000/test/${pdi['id']}`} alt="heatmap" />
                </HeatmapContainer> : 
              <HeatmapContainer className="heatmap-level2">
              <Image src={`http://15.164.105.78:8000/test/${pdi['id']}`} alt="heatmap" />
            </HeatmapContainer>
            }
              </>
            )}
            </>
            
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
            <h3 style={{margin:'5px'}}>Stress result</h3>
              <p style={{margin:'5px'}}>Classified : {pdi['gt']}</p>
              <p style={{margin:'10px'}}>Prediction : {attention[0]['prediction']}</p>
              </Stress>}
            <PdiResult
              pdi={pdi}
              pdiIdx={pdiIdx}
              callback={getClickedIdx}
              attention={attention}
              attentionLevel={attentionLevel}
              level1Ref={att1Ref}
              level2Ref={att2Ref}
            />
          </PdiContainer>
          <Xwrapper>
            {attentionLevel==='1' ? att1Ref.map((ref,idx)=>(idx>=2?<Xarrow width={attention['pdi_answer_att2']}showHead={false} curveness="0" start={attentionLevel==='1'?att1Ref[idx]:att2Ref[idx]} end={attentionLevel==='1'?imageRef1:imageRef2} />:null)):att2Ref.map((ref,idx)=>(idx>=2?<Xarrow strokeWidth={att2Weight[idx-2]*10} showHead={false} curveness="0" start={attentionLevel==='1'?att1Ref[idx]:att2Ref[idx]} end={attentionLevel==='1'?imageRef1:imageRef2} />:null))}
          </Xwrapper>
          
      </Container>
    </div>
  );
};
export default Explainability;
