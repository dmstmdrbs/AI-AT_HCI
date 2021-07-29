import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import h337 from 'heatmap.js';

import * as XLSX from 'xlsx';
//https://github.com/bvaughn/react-highlight-words
import Highlighter from 'react-highlight-words';
import MyHighlighter from './MyHighlighter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HeatmapContainer = styled.div`
  display: flex;
  width: 512px;
  height: 512px;
`;
const Image = styled.img`
  width: 512px;
  height: 512px;
`;
// const Test = () => {
//   const [sentence, setSentence] = useState(
//     '이 사람은 기분이 좋아요. 비는 조금 오고 있어요. 이 사람은 비에 젖지 않았어요. 바람은 조금 불고 있어요.',
//   );
//   const [words, setWords] = useState(['좋아요', '않았어요', '기분이', '조금']);
//   const [heat, setHeat] = useState(false);

// useEffect(() => {
//   const setHeatmap = (points) => {
//     let heatmapInstance = h337.create({
//       // only container is required, the rest will be defaults
//       container: document.querySelector('.heatmap'),
//     });

//     // heatmap data format
//     let data = {
//       max: 10,
//       data: points,
//     };
//     // if you have a set of datapoints always use setData instead of addData
//     // for data initialization
//     heatmapInstance.setData(data);

//     setHeat(true);
//   };

//   const getPoints = () => {};
//   let points = [
//     { x: 400, y: 150, value: 5 },
//     { x: 121, y: 150, value: 6 },
//     { x: 100, y: 150, value: 4 },
//     { x: 110, y: 311, value: 3 },
//     { x: 120, y: 400, value: 8 },
//     { x: 300, y: 80, value: 5 },
//     { x: 201, y: 200, value: 4 },
//     { x: 250, y: 180, value: 2 },
//     { x: 310, y: 251, value: 3 },
//     { x: 410, y: 350, value: 2 },
//   ];

//   // console.log(points);
//   // console.log(point);
//   setHeatmap(points);
// }, []);

//   return (
//     <Container>
//       <Highlighter searchWords={words} autoEscape={true} textToHighlight={sentence} />
//       <Highlighter searchWords={words} autoEscape={true} textToHighlight={sentence} />
//       <br />
//       <HeatmapContainer className="heatmap">
//         {heat ? <Image src={`http://15.164.105.78:8000/test/2`}></Image> : <div>Loading...</div>}
//       </HeatmapContainer>

//       <div>
//         <MyHighlighter
//           sentence="이 문장은 테스트 문장입니다 나는 비가 많이와서 싫다"
//           weight={[0.05, 0.05, 0, 0, 0.2, 0.36, 0.5, 0.7]}
//           toMark={['이', '문장은', '테스트', '문장입니다', '나는', '비가', '많이와서', '싫다']}
//         />
//       </div>
//     </Container>
//   );
// };
const TestImage = ({ name }) => {
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
    <HeatmapContainer>
      <Image src={`http://15.164.105.78:8000/${name}`} />
    </HeatmapContainer>
  );
};

const Test = ({ callback }) => {
  const [list, setList] = useState([]);
  const [idList, setIdList] = useState([]);
  let arr = [];
  const onImportExcel = (file) => {
    const { files } = file.target;
    // Read the file through the FileReader object
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        // Read the entire excel table object in binary stream
        const workbook = XLSX.read(result, { type: 'binary' });
        // Store the obtained data
        let data = [];
        // traverse each worksheet to read (here by default only the first sheet is read)
        for (const sheet in workbook.Sheets) {
          // esline-disable-next-line
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // Use sheet_to_json method to convert excel to json data
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // If only the first table is taken, uncomment this line
          }
        }
        arr = data;
        console.log(data);
        callback(data);
        // Finally obtained and formatted json data
      } catch (e) {
        // Relevant prompts for incorrect file type errors can be thrown here
        console.log(e, 'eeee');
      }
    };
    // Open the file in binary mode
    fileReader.readAsBinaryString(files[0]);
  };
  useEffect(() => {}, [list]);
  return (
    <Container>
      <div>
        <button>
          <input type="file" accept=".xlsx, .xls" onChange={onImportExcel} />
          <span>Upload files</span>
        </button>
        <p>Support .xlsx, .xls format files</p>
      </div>
    </Container>
  );
};
export default Test;
