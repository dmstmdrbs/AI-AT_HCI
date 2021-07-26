import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
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
  background-color: ${(props) => (props.clicked === props.idx ? '#000000' : '#ffffff')};
  cursor: pointer;
`;

const PdiResult = ({ pdi }) => {
  const [pitrQ, setPitrQ] = useState([]);
  const [clicked, setClicked] = useState(null);

  useEffect(() => {
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
                {`${item} - ${pdi[item]}`}
              </ListItem>
            </PdiContainer>
          );
        })}
      </PdiList>
    </Container>
  );
};
export default PdiResult;
