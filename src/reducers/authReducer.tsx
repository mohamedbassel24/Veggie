import { Iauth, Iuser } from "../types/Auth/authTypes";
import { SET_CURRENT_USER, AuthActionTypes } from "../types/Auth/authTypes";
const initUser: Iuser = {
  name: "",
  birthDate: "",
  email: ""
};
const initState: Iauth = {
  isAuthenticated: false,
  user: initUser
};
export default (state = initState, action: AuthActionTypes): Iauth => {
  switch (action.type) {
    default:
      return { ...state };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };
  }
};
