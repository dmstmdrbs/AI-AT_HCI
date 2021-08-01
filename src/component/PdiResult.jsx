import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
//https://github.com/bvaughn/react-highlight-words
import Highlighter from 'react-highlight-words';
import MyHiglighter from './MyHighlighter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 3px 1px #dadce0;
`;
const PdiList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const PdiContainer = styled.li`
  margin-bottom: 5px;
  border-bottom: 2px solid #efefef;
`;
const ListItem = styled.button`
  border: none;
  margin-bottom: 3px;
  background-color: ${(props) => (props.clicked === props.idx ? '#d1d1d1' : '#ffffff')};
  cursor: pointer;
`;
const Button = styled.button`
  width: 200px;
  align-self: center;
`;
const PdiResult = ({ pdi, pdiIdx, callback, attention }) => {
  const [pitrQ, setPitrQ] = useState([]);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
    console.log(`pdi,pdiIdx,attention`)
    console.log(pdi);
    console.log(pdiIdx); //case 번호
    console.log(attention);
    setClicked(null);
    const parseQuestion = (pdi) => {
      let pitrQ = [];

      for (const key in pdi) {
        if (!key.indexOf('pitrQ')) {
          pitrQ.push(key);
        }
      }
      return pitrQ;
    };

    const qList = parseQuestion(pdi);
    setPitrQ(qList);
  }, [pdi]);

  useEffect(() => {
    console.log(clicked);
    callback(clicked);
  }, [clicked]);

  return (
    <Container>
      <PdiList>
        {pitrQ.map((item, idx) => {
          return (
            <PdiContainer key={idx}>
              <ListItem
                // id={pdi.id}
                primary={`${item} - ${pdi[item]}`}
                clicked={clicked}
                idx={idx}
                onClick={() => {
                  clicked === idx ? setClicked(null) : setClicked(idx);
                }}
              >
                {clicked > 2 ? (
                  <MyHiglighter
                    sentence={`${item} - ${pdi[item]}`}
                    weight={attention[clicked-2]}
                  />
                ) : (
                  <p>{`${item} - ${pdi[item]}`}</p>
                )}
              </ListItem>
            </PdiContainer>
          );
        })}
      </PdiList>
      <Button>Highlight</Button>
    </Container>
  );
};
export default PdiResult;
