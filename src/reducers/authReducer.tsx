import { Iauth, Iuser, SET_ERRORS } from "../types/Auth/authTypes";
import { SET_CURRENT_USER, AuthActionTypes } from "../types/Auth/authTypes";
const initUser: Iuser = {
  name: "",
  birthDate: "",
  email: "",
  UID: ""
};
const initState: Iauth = {
  isAuthenticated: false,
  user: initUser,
  errorMessage: null
};
export default (state = initState, action: AuthActionTypes): Iauth => {
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
