import React from 'react';
import styled from 'styled-components'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Game from './pages/Game'
import Login from './pages/Login'

function App() {

  return (
    <AppScreen className="App">
      <header className="App-header">
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/game' component={Game}/>
        </Switch>
      </BrowserRouter>  
      </header>
    </AppScreen>
  );
}

const AppScreen = styled.div`
width:100vw;
height:100vh;
/* background-color:red; */
`

export default App;
