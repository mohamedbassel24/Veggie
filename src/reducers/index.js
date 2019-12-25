import { combineReducers } from "redux";
import authReducer from "./authReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};

const rootreducer = combineReducers({
  auth: authReducer
});
export default persistReducer(persistConfig, rootreducer);
