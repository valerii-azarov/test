import { Dispatch } from "redux";
// import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AppearanceTypes } from "../actionTypes/appearanceTypes";
import { AppearanceActions } from "../actions/appearanceActions";
// import { Category } from "../../interfaces/category-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження налаштування
export const loadAppearanceData = (cityId: number) => async (dispatch: Dispatch) => {
  dispatch({
    type: AppearanceTypes.LOAD_APPEARANCE_REQUEST,
  });

  axios
    .get(`${process.env.REACT_APP_API_URL}/appearance/${cityId}`)
    .then((response: AxiosResponse) => {
      localStorage.setItem("appearance", JSON.stringify({
        background: response.data.background,
        text: response.data.text,
        welcome: response.data.welcome,
        image: response.data.image,
      }));

      dispatch({
        type: AppearanceTypes.LOAD_APPEARANCE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: AppearanceTypes.LOAD_APPEARANCE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<AppearanceActions>) => {
  dispatch({
    type: AppearanceTypes.RESET_DATA,
  });
};
