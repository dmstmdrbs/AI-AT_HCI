import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Login from './pages/Login';
import Contents from './pages/Contents';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    *:focus { outline:none; }    
  }
`;

const App = () => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/contents" exact component={Contents}></Route>
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
