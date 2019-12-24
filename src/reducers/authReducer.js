import { Iauth, Iuser, SET_ERRORS } from "../types/Auth/authTypes";
import { SET_CURRENT_USER, AuthActionTypes } from "../types/Auth/authTypes";
const initUser = {
  firstname: "",
  birthDate: "",
  email: "",
  username: "",
  lastname: "",
  Gender: "",
  Address: "",
  Priv: ""
};
const initState = {
  isAuthenticated: false,
  user: initUser,
  errorMessage: null
};
export default (state = initState, action) => {
  switch (action.type) {
    default:
      return { ...state };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        errorMessage: null
      };
    case SET_ERRORS:
      return {
        ...state,
        isAuthenticated: false,
        user: initUser,
        errorMessage: action.payload
      };
  }
};
