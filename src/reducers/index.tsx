import { combineReducers } from "redux";
import authReducer from "./authReducer";
export const rootReducer = combineReducers({
  auth: authReducer
});
export type AppState = ReturnType<typeof rootReducer>;
