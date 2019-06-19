import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { rootReducer, AppState } from "./reducers/index";
import { AppActions } from "./types/actions";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import firebase from "./config/fbconfig";

const middleware = [
  thunk.withExtraArgument({ getFirestore, getFirebase }) as ThunkMiddleware<
    AppState,
    AppActions
  >
];
const initState = {};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {})
  )
);
