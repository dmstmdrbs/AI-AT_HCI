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

const MyHiglighter = ({ sentence, weight,attentionLevel }) => {
  const [marked, setMarked] = useState(null);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setFlag(false);
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
    setMarked(markSentence());
    setFlag(true);
  }, [sentence]);

  // <p>
  //   this is MyHiglighter <YellowSpan>in yellow span</YellowSpan> and{' '}
  //   <BlueSpan>in blue span</BlueSpan> and <RedSpan>in red span</RedSpan>. awesome
  // </p>
  return <>{marked}<br/>{attentionLevel==='1' ? <span>weight : [{weight}]</span> :<span></span>}</>;
};
export default MyHiglighter;
