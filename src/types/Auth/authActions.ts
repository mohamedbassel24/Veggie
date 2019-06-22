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
      localStorage.setItem("user", uid);

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
    .then(async res => {
      //Create collection
      console.log(res);
      let uid = res.user ? res.user.uid : "";
      localStorage.setItem("user", uid);
      await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .set({
          name: userData.name,
          email: userData.email,
          birthdate: userData.date.format("DD/MM/YYYY"),
          promos: userData.promos
        });
      let user: Iauth = {
        isAuthenticated: true,
        user: {
          birthDate: "",
          email: userData.email,
          name: userData.name,
          UID: uid
        },
        errorMessage: null
      };

      dispatch(
        setCurrentUser({
          type: SET_CURRENT_USER,
          payload: user
        })
      );
    })
    .catch(err => {
      dispatch(
        SetErrors({
          type: SET_ERRORS,
          payload: "User already Exists."
        })
      );
    });
};
export const signOut = () => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  localStorage.removeItem("user");
  await dispatch(
    setCurrentUser({
      type: SET_CURRENT_USER,
      payload: {
        errorMessage: null,
        isAuthenticated: false,
        user: { UID: "", birthDate: "", email: "", name: "" }
      }
    })
  );
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
