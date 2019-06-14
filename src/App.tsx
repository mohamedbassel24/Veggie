import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Route>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Route>
  );
}

export default App;
