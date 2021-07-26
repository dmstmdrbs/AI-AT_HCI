import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, { useState, useEffect } from 'react';

const Cases = ({ cases }) => {
  const [tab, setTab] = useState(null);

  useEffect(() => {
    setTab(0);
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Tabs
      value={tab}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      {cases.map((idx) => {
        return <Tab label={`Case ${idx}`}></Tab>;
      })}
    </Tabs>
  );
};
export default Cases;
