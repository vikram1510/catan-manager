import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Game from './pages/Game'
import Login from './pages/Login'

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/game' component={Game}/>
        </Switch>
      </BrowserRouter>  
      </header>
    </div>
  );
}

export default App;
