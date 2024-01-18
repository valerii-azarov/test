import { AuthTypes } from "../actionTypes/authTypes";
import { AuthActions } from "../actions/authActions";
import { User } from "../../interfaces/user-interface";

interface AuthState {
  token: string;
  user: User;
  isAuth: boolean;
  isAuthInProgress: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  token: localStorage.getItem("accessToken") || "",
  user: {
    name: "",
    surname: "",
    patronymic: "",
    role_id: 0,
    status_id: 0,
    city_id: 0,
  },
  isAuth: false,
  isAuthInProgress: false,
  error: null,
};

// редюсер для автентифікації
const authReducer = (state = initialAuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthTypes.LOGIN_REQUEST:
    case AuthTypes.LOGOUT_REQUEST:
    case AuthTypes.REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        isAuthInProgress: true,
        error: null,
      };

    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isAuthInProgress: false,
        error: null,
      };

    case AuthTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
        isAuthInProgress: false,
        error: null,
      };
  
    case AuthTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuth: true,
        isAuthInProgress: false,
        error: null,
      };

    case AuthTypes.LOGIN_FAILURE:
    case AuthTypes.LOGOUT_FAILURE:
    case AuthTypes.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        isAuth: false,
        isAuthInProgress: false,
        error: action.payload,
      };

    case AuthTypes.GET_USER_INFO_REQUEST:
      return {
        ...state,
        error: null,
      };
  
    case AuthTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        error: null,
        user: action.payload,
      };
  
    case AuthTypes.GET_USER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case AuthTypes.RESET_DATA:
      return initialAuthState;

    default:
      return state;
  }
};

export default authReducer;
