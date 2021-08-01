import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const YellowSpan = styled.span`
  color: rgb(252, 230, 102);
`;
const BlueSpan = styled.span`
  color: rgb(54, 93, 228);
`;
const RedSpan = styled.span`
  color: rgb(255, 66, 65);
`;

const MyHiglighter = ({ sentence, weight }) => {
  const [marked, setMarked] = useState(null);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    setFlag(false);
    const words = sentence.split(' ');

    const markSentence = () => {
      return (
        <p>
          {words.map((word, idx) => {
            if (weight[idx] > 0.6) return <RedSpan>{word} </RedSpan>;
            if (weight[idx] > 0.4) return <BlueSpan>{word} </BlueSpan>;
            if (weight[idx] > 0.25) return <YellowSpan>{word} </YellowSpan>;
            else {
              return <span>{word} </span>;
            }
          })}
        </p>
      );
    };
    setMarked(markSentence());
    setFlag(true);
  }, [sentence]);

  // <p>
  //   this is MyHiglighter <YellowSpan>in yellow span</YellowSpan> and{' '}
  //   <BlueSpan>in blue span</BlueSpan> and <RedSpan>in red span</RedSpan>. awesome
  // </p>
  return <>{marked}</>;
};
export default MyHiglighter;
