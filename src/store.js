import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore } from "redux-persist";
const middleware = [thunk];
const initState = {};

export const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const presistor = persistStore(store);
export default { store, presistor };
