import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const YellowSpan = styled.span`
  color: rgb(252, 230, 102);
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

const MyHiglighter = ({ sentence, weight,attentionLevel, token, tokenized_att }) => {
  const [marked, setMarked] = useState(null);
  const [flag, setFlag] = useState(true);
  const [tokenized, setTokenized] = useState([]);
  const [tokenizedAtt, setTokenizedAtt] = useState([]);
  const [markedToken,setMarkedToken] = useState(null);
  useEffect(() => {
    setFlag(false);
    if(attentionLevel==='1'){
      setTokenized(JSON.parse(token));
      var arr=tokenized_att.slice(1,tokenized_att.length-1).split(', ')
      arr = arr.map(item=>Number(item));
      setTokenizedAtt(arr);
    }

    const words = sentence.split(' ');
    console.log(sentence);
    console.log(weight);
    const markSentence = () => {
      return (
        <>
          {words.map((word, idx) => {
            if (weight[idx] > 0.07) return <RedSpan>{word} </RedSpan>;
            if (weight[idx] > 0.02) return <BlueSpan>{word} </BlueSpan>;
            if (weight[idx] > 0.01) return <YellowSpan>{word} </YellowSpan>;
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
              if(tokenizedAtt[idx]>0.06) return <YellowSpan>{word} </YellowSpan>
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
  return <>{marked}<br/>{attentionLevel==='1' ? <span>weight : [{weight}]</span> :<span></span>}<br/>{markedToken}<br/><span>token weight : {tokenized_att}</span></>;
};
export default MyHiglighter;
