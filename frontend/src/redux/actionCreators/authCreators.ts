import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthTypes } from "../actionTypes/authTypes";
import { AuthActions } from "../actions/authActions";

interface ErrorResponse {
  message: string;
}

// вхід
export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
    type: AuthTypes.LOGIN_REQUEST,
  });
  
  axios
    .post(`${process.env.REACT_APP_API_URL}/employees/login`, { username, password }, { withCredentials: true }) 
    .then((response: AxiosResponse) => {
      localStorage.setItem("firstLogin", "true");

      dispatch({
        type: AuthTypes.LOGIN_SUCCESS,
      });

      window.location.href = "/home";
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: AuthTypes.LOGIN_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// вихід
export const logout = () => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
    type: AuthTypes.LOGOUT_REQUEST,
  });
  
  axios
    .get(`${process.env.REACT_APP_API_URL}/employees/logout`, { withCredentials: true }) 
    .then((response: AxiosResponse) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("appearance");
      localStorage.removeItem("user");
      window.location.href = "/login";
      
      dispatch({
        type: AuthTypes.LOGOUT_SUCCESS,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: AuthTypes.LOGOUT_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// оновлення токена
export const refreshToken = () => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
    type: AuthTypes.REFRESH_TOKEN_REQUEST,
  });
  
  axios
    .get(`${process.env.REACT_APP_API_URL}/employees/refresh_token`, { withCredentials: true }) 
    .then((response: AxiosResponse) => {
      localStorage.setItem("accessToken", response.data.accessToken);

      dispatch({
        type: AuthTypes.REFRESH_TOKEN_SUCCESS,
        payload: response.data.accessToken,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: AuthTypes.REFRESH_TOKEN_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// інформації про користувача
export const getUserInfo = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: AuthTypes.GET_USER_INFO_REQUEST,
  });
  
  const token = getState().auth.token;

  axios
    .get(`${process.env.REACT_APP_API_URL}/employees/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: AuthTypes.GET_USER_INFO_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: AuthTypes.GET_USER_INFO_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<AuthActions>) => {
  dispatch({
    type: AuthTypes.RESET_DATA,
  });
};
