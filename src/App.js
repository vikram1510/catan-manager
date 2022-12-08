import React, { useState } from "react";
import styled from "styled-components";
import { Switch, Route, HashRouter } from "react-router-dom";
import Game from "./pages/Game";
import Login from "./pages/Login";
import assets from "./lib/assets";
import colors from "./lib/colors";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <AppScreen className="App" bg={assets.bg} theme={theme}>
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Login {...props} theme={theme} toggleTheme={toggleTheme} />
            )}
          />
          <Route
            exact
            path="/game"
            render={(props) => (
              <Game {...props} theme={theme} toggleTheme={toggleTheme} />
            )}
          />
        </Switch>
      </HashRouter>
    </AppScreen>
  );
}

const AppScreen = styled.div`
width:100vw;
height:100vh;
background-color:${(props) => colors[props.theme].background};
font-family: 'Baloo 2';
background-image: url(${({ theme, bg }) => (theme === "light" ? bg : "")});
overflow: scroll;
background - position: center;
`;

export default App;
