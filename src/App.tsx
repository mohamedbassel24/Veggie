import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import { Layout } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
