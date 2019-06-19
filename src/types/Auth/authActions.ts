import { AuthActionTypes, SET_CURRENT_PROFILE, Iauth } from "./authTypes";
import Axios from "axios";
import { Dispatch, ActionCreator } from "redux";
import jwt_decode from "jwt-decode";

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
}) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState,
  { getFirebase, getFirestore }
) => {
  let x: boolean = false;
  console.log(userData);
  await Axios.post(
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDAXLmBDlEIbiyD2Gyb1U2OMCqpIpzPweE",
    userData
  )
    .then(res => {
      x = true;
    })
    .catch(err => {
      x = false;
    });
  return x;
};
export const setCurrentUser = (decoded: SET_CURRENT_PROFILE) => {
  return {
    type: decoded.type,
    payload: decoded.payload
  };
};
