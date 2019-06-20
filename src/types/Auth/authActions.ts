import {
  SET_CURRENT_USER,
  Iauth,
  ISET_CURRENT_USER,
  ISET_ERRORS,
  SET_ERRORS
} from "./authTypes";
import { Dispatch } from "redux";

import firebase from "../../config/fbconfig";
import { AppActions } from "../actions";
import { AppState } from "../../reducers";
import { Moment } from "moment";

//Actions Create AKA AJAX,,Basically getting where the payload is and dispatching to the reducers
export const loginUser = (userData: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  let result: Iauth | null = null;
  await firebase
    .auth()
    .signInWithEmailAndPassword(userData.email, userData.password)
    .then(async res => {
      console.log(res);
      let uid = res.user ? res.user.uid : "";
      result = {
        isAuthenticated: true,
        user: {
          birthDate: "",
          email: userData.email,
          name: "",
          UID: uid
        },
        errorMessage: null
      };
      dispatch(
        await setCurrentUser({
          type: SET_CURRENT_USER,
          payload: result
        })
      );
    })
    .catch(err => {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        dispatch(
          SetErrors({
            type: SET_ERRORS,
            payload: "Invalid E-mail or Password"
          })
        );
      }
    });
};
export const signupUser = (userData: {
  email: string;
  password: string;
  name: string;
  promos: boolean;
  date: Moment;
  returnSecureToken: boolean;
}) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(res => {
      //Create collection
      //dispatch(setCurrentUser,)
    })
    .catch(err => {
      //Handles Errors
      //Dispatch
    });
};
export const setCurrentUser = (decoded: ISET_CURRENT_USER) => {
  return {
    type: decoded.type,
    payload: decoded.payload
  };
};
export const SetErrors = (decoded: ISET_ERRORS) => {
  return {
    type: decoded.type,
    payload: decoded.payload
  };
};
