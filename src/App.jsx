import React from "react";

import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useSelector, useDispatch } from "react-redux";

import Seats from "./Components/Seats/Seats";
import MainPage from "./Components/MainPage/MainPage";
import Contact from "./Components/contact/Contact";
function PrivateRoute({ children, ...rest }) {
  const auth = localStorage.getItem("user");
  console.log(auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth != null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location, tab: 1 }
            }}
          />
        )
      }
    />
  );
}
function App() {
  return (
    <Provider store={store}>
      <Route>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/seats">
            <Seats />
          </PrivateRoute>
          <Route path="/events" component={MainPage} />
          <Route path="/contact" component={Contact} />

          <Route path="/" component={LandingPage} />
        </Switch>
      </Route>
    </Provider>
  );
}

export default App;
