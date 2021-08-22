import React, { useEffect, useState } from "react";
import styled from "styled-components";

// const YellowSpan = styled.span`
//   color: rgb(240, 190, 80);
//   margin-bottom:3px;
// `;
// const BlueSpan = styled.span`
//   color: rgb(54, 93, 228);
//   margin-bottom:3px;
// `;
// const RedSpan = styled.span`
//   color: rgb(255, 66, 65);
//   margin-bottom:3px;
// `;

const MyHiglighter = ({
  sentence,
  weight,
  attentionLevel,
  att2Weight,
  token,
  tokenized_att,
  index,
}) => {
  const [marked, setMarked] = useState(null);
  const [flag, setFlag] = useState(true);
  // const [tokenized, setTokenized] = useState([]);
  // const [tokenizedAtt, setTokenizedAtt] = useState([]);
  // const [markedToken,setMarkedToken] = useState(null);
  const [weightList, setWeightList] = useState([]);
  useEffect(() => {}, []);

  useEffect(() => {
    setFlag(false);
    // if(attentionLevel==='1'){
    //   let parsed = token.replace(/\",\",/gi, "");
    //   parsed = parsed.replace(/, ,/g,', ');
    //   setTokenized(JSON.parse(parsed));

    //   var arr=tokenized_att.slice(1,tokenized_att.length-1).split(', ')
    //   arr = arr.map(item=>Number(item));
    //   setTokenizedAtt(arr);
    // }

    var wArr = weight.slice(1, weight.length - 1).split(", ");
    wArr = wArr.map((item) => Number(item));
    setWeightList(wArr);

    const words = sentence.split(" ");
    const markSentence = () => {
      return (
        <span>
          {words.map((word, idx) => {
            return <span style={{ marginBottom: "3px" }}>{`${word} `}</span>;
            // }
          })}
        </span>
      );
    };

    setMarked(markSentence());
    // setMarkedToken(markToken());

    setFlag(true);
  }, [sentence]);

  // <p>
  //   this is MyHiglighter <YellowSpan>in yellow span</YellowSpan> and{' '}
  //   <BlueSpan>in blue span</BlueSpan> and <RedSpan>in red span</RedSpan>. awesome
  // </p>
  return (
    <span style={{ fontSize: "1rem" }} id={attentionLevel === "1" ? "highlight1" : ""}>
      {marked}
    </span>
  );
};
export default MyHiglighter;
