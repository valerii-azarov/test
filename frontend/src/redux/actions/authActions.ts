import { AuthTypes } from "../actionTypes/authTypes";
import { User } from "../../interfaces/user-interface";

export type AuthActions =
  // вхід
  | { type: AuthTypes.LOGIN_REQUEST }
  | { type: AuthTypes.LOGIN_SUCCESS }
  | { type: AuthTypes.LOGIN_FAILURE; payload: string }
  // вихід
  | { type: AuthTypes.LOGOUT_REQUEST }
  | { type: AuthTypes.LOGOUT_SUCCESS }
  | { type: AuthTypes.LOGOUT_FAILURE; payload: string }
  // оновлення токена
  | { type: AuthTypes.REFRESH_TOKEN_REQUEST }
  | { type: AuthTypes.REFRESH_TOKEN_SUCCESS; payload: string }
  | { type: AuthTypes.REFRESH_TOKEN_FAILURE; payload: string }
  // інформації про користувача
  | { type: AuthTypes.GET_USER_INFO_REQUEST }
  | { type: AuthTypes.GET_USER_INFO_SUCCESS; payload: User }
  | { type: AuthTypes.GET_USER_INFO_FAILURE; payload: string }
  // скидання даних
  | { type: AuthTypes.RESET_DATA };
