import React from 'react';
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Game from './pages/Game'
import Login from './pages/Login'
import assets from './lib/assets';

function App() {

  return (
    <AppScreen className="App" bg={assets.bg}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/game' component={Game} />
        </Switch>
      </BrowserRouter>
    </AppScreen>
  );
}

const AppScreen = styled.div`
width:100vw;
height:100vh;
background-color:black;
font-family: 'Baloo 2';
background-image: url(${({ bg }) => bg});
overflow:scroll;
background-position: center;
`

export default App;
