import {
  SET_CURRENT_USER,
  Iauth,
  ISET_CURRENT_USER,
  ISET_ERRORS,
  SET_ERRORS
} from "./authTypes";
import { Dispatch } from "redux";
import axios from "axios";

//Actions Create AKA AJAX,,Basically getting where the payload is and dispatching to the reducers
export const loginUser = userData => async dispatch => {
  let result = null;

  await axios
    .post("http://localhost:6001/api/Users/Login", {
      Username: userData.username,
      Password: userData.password
    })
    .then(async res => {
      console.log(res);
      let username = res.data.Username ? res.data.Username : "";
      localStorage.setItem("user", username);

      result = {
        isAuthenticated: true,
        user: {
          firstname: res.data.Username,
          birthDate: res.data.BirthDate,
          email: res.data.Email,
          username: res.data.Username,
          lastname: res.data.LastName,
          Gender: res.data.Gender,
          Address: res.data.Address,
          Priv: res.data.Priv
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
      dispatch(
        SetErrors({
          type: SET_ERRORS,
          payload: "Invalid E-mail or Password"
        })
      );
    });
};
export const signupUser = userData => async dispatch => {
  await axios
    .post("http://localhost:6001/api/Users/Register", {
      Username: userData.username,
      Password: userData.password,
      FirstName: userData.firstname,
      LastName: userData.lastname,
      BirthDate: userData.date,
      Gender: userData.gender,
      Address: userData.address,
      Email: userData.email,
      Priv: 3
    })
    .then(async res => {
      //Create collection
      console.log(res);
      let uid = res.user ? res.user.uid : "";
      localStorage.setItem("user", uid);

      let user = {
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
export const signOut = () => async dispatch => {
  localStorage.removeItem("user");

  await dispatch(
    setCurrentUser({
      type: SET_CURRENT_USER,
      payload: {
        errorMessage: null,
        isAuthenticated: false,
        user: {
          firstname: "",
          birthDate: "",
          email: "",
          username: "",
          lastname: "",
          Gender: "",
          Address: "",
          Priv: ""
        }
      }
    })
  );
};
export const setCurrentUser = decoded => {
  return {
    type: decoded.type,
    payload: decoded.payload
  };
};
export const SetErrors = decoded => {
  return {
    type: decoded.type,
    payload: decoded.payload
  };
};
