import {
  AuthActionTypes,
  SET_CURRENT_USER,
  Iauth,
  ISET_CURRENT_USER
} from "./authTypes";
import Axios from "axios";
import { Dispatch, ActionCreator } from "redux";
import jwt_decode from "jwt-decode";
import firebase from "../../config/fbconfig";
import axios from "axios";
import { AppActions } from "../actions";
import { AppState } from "../../reducers";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;

//Actions Create AKA AJAX,,Basically getting where the payload is and dispatching to the reducers
export const loginUser = (userData: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(userData.email, userData.password)
    .then(async res => {
      console.log(res);
      let uid = res.user ? res.user.uid : "";

      dispatch(
        await setCurrentUser({
          type: SET_CURRENT_USER,
          payload: {
            isAuthenticated: true,
            user: {
              birthDate: "",
              email: userData.email,
              name: "",
              UID: uid
            }
          }
        })
      );
    })
    .catch(err => {});
  console.log("done");
};
export const setCurrentUser = (decoded: ISET_CURRENT_USER) => {
  return {
    type: decoded.type,
    payload: decoded.payload
  };
};
