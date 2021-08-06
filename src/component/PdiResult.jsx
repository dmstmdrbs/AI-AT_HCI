import React, { useEffect, useState,useRef } from 'react';
import styled from 'styled-components';
import MyHiglighter from './MyHighlighter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position:relative;
  box-shadow: 1px 1px 2px 1px #dadce0;
`;
const PdiList = styled.ul`
  list-style: none;
  list-style-type:none;
  justify-content:start;
  display: flex;
  position:relative;
  flex-direction: column;
`;

const ListItem = styled.button`
  position:relative;
  border: none;
  padding:5px;
  min-width:;
  text-align:start;
  background-color: ${(props) => (props.clicked === props.idx ? '#d1d1d1' : '#ffffff')};
  cursor: pointer;
`;
const Button = styled.button`
  width: 200px;
  margin-top:20px;
  align-self: center;
  background-color:white;
  border-radius:5px;
  height:2rem;
`;

const PdiResult = ({ pdi, pdiIdx, callback, attention,attentionLevel, level1Ref,level2Ref }) => {
  const [pitrQ, setPitrQ] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [highlight,setHighlight] = useState(false);
  const [att2, setAtt2]= useState(null);
  const pdiRef = useRef(
    null
  );
  useEffect(() => {
    console.log(attention)
    if(attentionLevel==='2')
    {
      let arr =attention[8]['pdi_answer_att2'].slice(1,attention[8]['pdi_answer_att2'].length-1).split(', ');
      arr=arr.map(strNum=>Number(strNum)); 
      setTimeout(()=>{setAtt2(arr);},100)
        
    }
    // console.log(`pdi,pdiIdx,attention`)
    // console.log(pdi);
    // console.log(pdiIdx); //case 번호
    // console.log(attention);
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
    callback(clicked);
  }, [clicked]);

  const onClickHighlight=()=>{
    setHighlight(prev=>!prev);
  }


if(level1Ref||level2Ref)
  return (
    <Container>
        {/* <Button onClick={onClickHighlight}>{highlight===false ? 'Highlight':'Show Original'}</Button> */}
       <PdiList>
        {pitrQ.map((item, idx) => {
          return (
            
              <ListItem key={idx}
                ref={idx>=2?(attentionLevel==='1'?level1Ref[idx]:level2Ref[idx]):null}
                id={attentionLevel==='1'?level1Ref[idx].id:level2Ref[idx].id}
                primary={`${item} - ${pdi[item]}`}
                clicked={clicked}
                idx={idx}
                onClick={() => {
                  if(attentionLevel==='1') clicked === idx ? setClicked(null) : setClicked(idx);
                }}
              >
                {idx >= 2 ? (
                  <>
                  {attentionLevel==='2'&&att2 ?
                    idx-2 === att2.indexOf(att2.reduce((maxValue,currentValue)=>maxValue>currentValue ? maxValue : currentValue))
                    ?<span id="highlight2">[weight : <span style={{color:'#f05650'}}>{att2[idx-2]}</span>]</span>
                      :<span id="highlight2">[weight : {att2[idx-2]}] </span>
                        :<span></span>}
                    {`${item} - `}
                    <MyHiglighter
                      attentionLevel={attentionLevel}
                      sentence={`${pdi[item]}`}
                      weight={attention[idx-2]['pdi_att_token']}
                      token={attention[idx-2]['tokenized']}
                      tokenized_att={attention[idx-2]['tokenized_att']}
                      index={idx-2}
                    />
                  </>
                ) : (
                  <div>
                    {`${item} - ${pdi[item]}`}<span style={{margin:'5px'}}></span>
                  </div>
                )}
              </ListItem>
          );
        })}
      </PdiList>
    </Container>
  );
};
export default PdiResult;

