import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import { RegistrationTypes } from "../actionTypes/registrationTypes";
import { RegistrationActions } from "../actions/registrationActions";
import { PersonalInfo } from "../../interfaces/employee-interface";
import { ErrorResponse } from "../../interfaces/error-interface";

// відправлення форми
export const submit = (data: PersonalInfo) => async (dispatch: Dispatch<RegistrationActions>) => {
  dispatch({
    type: RegistrationTypes.SUBMIT_REQUEST,
  });
  
  axios
    .post(`${process.env.REACT_APP_API_URL}/employees/submit`, data)
    .then((response: AxiosResponse) => {
      dispatch({
        type: RegistrationTypes.SUBMIT_SUCCESS,
        payload: response.data.message,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: RegistrationTypes.SUBMIT_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<RegistrationActions>) => {
  dispatch({
    type: RegistrationTypes.RESET_DATA,
  });
};
