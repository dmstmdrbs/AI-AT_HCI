import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const YellowSpan = styled.span`
  color: rgb(240, 190, 80);
  margin-bottom:3px;
`;
const BlueSpan = styled.span`
  color: rgb(54, 93, 228);
  margin-bottom:3px;
`;
const RedSpan = styled.span`
  color: rgb(255, 66, 65);
  margin-bottom:3px;
`;

const MyHiglighter = ({ sentence, weight, attentionLevel, token, tokenized_att }) => {
  const [marked, setMarked] = useState(null);
  const [flag, setFlag] = useState(true);
  const [tokenized, setTokenized] = useState([]);
  const [tokenizedAtt, setTokenizedAtt] = useState([]);
  const [markedToken,setMarkedToken] = useState(null);
  const [weightList, setWeightList] = useState([]);
  useEffect(() => {
    setFlag(false);
    if(attentionLevel==='1'){
      console.log(token);
      let parsed = token.replace(/\",\",/gi, "");
      parsed = parsed.replace(/, ,/g,', ');
      console.log(JSON.parse(parsed));
      setTokenized(JSON.parse(parsed));
      
      var arr=tokenized_att.slice(1,tokenized_att.length-1).split(', ')
      arr = arr.map(item=>Number(item));
      setTokenizedAtt(arr);
    }

    var wArr = weight.slice(1,weight.length-1).split(', ')
    wArr =wArr.map(item=>Number(item));
    setWeightList(wArr);

    const words = sentence.split(' ');
    console.log(sentence);
    console.log(weight);
    const markSentence = () => {
      return (
        <>
          {words.map((word, idx) => {
            if (weightList[idx] > 0.07) return <RedSpan>{word} </RedSpan>;
            if (weightList[idx] > 0.02) return <BlueSpan>{word} </BlueSpan>;
            if (weightList[idx] > 0.01) return <YellowSpan>{word} </YellowSpan>;
            else {
              return <span style={{marginBottom:'3px'}}>{word} </span>;
            }
          })}
        </>
      );
    };
    const markToken = ()=>{
      return (
        <>
          {
            tokenized.map((word,idx)=>{
              if(tokenizedAtt[idx]>0.3) return <RedSpan>{word} </RedSpan>
              if(tokenizedAtt[idx]>0.15) return <BlueSpan>{word} </BlueSpan>
              if(tokenizedAtt[idx]>0.07) return <YellowSpan>{word} </YellowSpan>
              else return <span style={{marginBottom:'3px'}}>{word} </span>
            })
          }
        </>
      )
    };

    setMarked(markSentence());
    setMarkedToken(markToken());
    
    setFlag(true);
  }, [sentence]);

  // <p>
  //   this is MyHiglighter <YellowSpan>in yellow span</YellowSpan> and{' '}
  //   <BlueSpan>in blue span</BlueSpan> and <RedSpan>in red span</RedSpan>. awesome
  // </p>
  return <>
      {marked}<br/>{attentionLevel==='1' ? <span>weight : {weight}</span> :<span></span>}
      {attentionLevel==='1'&&
      <>
        <br/><br/>
        {markedToken}
        <br/>
        <span>token weight : {tokenized_att}</span>
      </>
      }
    </>;
};
export default MyHiglighter;
