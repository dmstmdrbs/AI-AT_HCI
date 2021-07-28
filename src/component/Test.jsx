import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import h337 from 'heatmap.js';

//https://github.com/bvaughn/react-highlight-words
import Highlighter from 'react-highlight-words';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HeatmapContainer = styled.div`
  display: flex;
  width: 500px;
  height: 600px;
`;
const Image = styled.img`
  width: 500px;
  height: 600px;
`;
const Test = () => {
  const [sentence, setSentence] = useState(
    '이 사람은 기분이 좋아요. 비는 조금 오고 있어요. 이 사람은 비에 젖지 않았어요. 바람은 조금 불고 있어요.',
  );
  const [words, setWords] = useState(['좋아요', '않았어요', '기분이', '조금']);
  const [heat, setHeat] = useState(false);

  useEffect(() => {
    const setHeatmap = (points) => {
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

      setHeat(true);
    };

    const getPoints = () => {};
    let points = [
      { x: 400, y: 150, value: 5 },
      { x: 121, y: 150, value: 6 },
      { x: 100, y: 150, value: 4 },
      { x: 110, y: 311, value: 3 },
      { x: 120, y: 400, value: 8 },
      { x: 300, y: 80, value: 5 },
      { x: 201, y: 200, value: 4 },
      { x: 250, y: 180, value: 2 },
      { x: 310, y: 251, value: 3 },
      { x: 410, y: 350, value: 2 },
    ];

    // console.log(points);
    // console.log(point);
    setHeatmap(points);
  }, []);

  return (
    <Container>
      <Highlighter searchWords={words} autoEscape={true} textToHighlight={sentence} />
      <Highlighter searchWords={words} autoEscape={true} textToHighlight={sentence} />
      <br />
      <HeatmapContainer className="heatmap">
        {heat ? <Image src={`http://15.164.105.78:8000/test/2`}></Image> : <div>Loading...</div>}
      </HeatmapContainer>
    </Container>
  );
};
export default Test;
