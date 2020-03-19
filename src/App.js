import React from 'react';
import styled from 'styled-components'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Game from './pages/Game'
import Login from './pages/Login'

function App() {

  return (
    <AppScreen className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/game' component={Game}/>
        </Switch>
      </BrowserRouter>  
    </AppScreen>
  );
}

const AppScreen = styled.div`
width:100vw;
height:100vh;
background-color:#f0f0f0;
font-family: 'Baloo 2'
`

export default App;
