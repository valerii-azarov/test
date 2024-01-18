import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ActivationTypes } from "../actionTypes/activationTypes";
import { ActivationActions } from "../actions/activationActions";
import { AccountInfo, EmploymentDetails } from "../../interfaces/employee-interface";
import { ErrorResponse } from "../../interfaces/error-interface";

interface AdditionalData extends AccountInfo, EmploymentDetails {}

// перевірка активації коду
export const check = (activationCode: string) => async (dispatch: Dispatch<ActivationActions>) => {
  dispatch({
    type: ActivationTypes.CHECK_REQUEST,
  });
  
  axios
    .post(`${process.env.REACT_APP_API_URL}/employees/check-activation-code`, { activationCode })
    .then((response: AxiosResponse) => {
      dispatch({
        type: ActivationTypes.CHECK_SUCCESS,
        payload: { 
          message: response.data.message,
          data: response.data.employee,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: ActivationTypes.CHECK_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// створення облікового запису
export const complete = (employeeId: number, data: AdditionalData) => async (dispatch: Dispatch<ActivationActions>) => {
  dispatch({
    type: ActivationTypes.COMPLETE_REQUEST,
  });
    
  axios
    .put(`${process.env.REACT_APP_API_URL}/employees/complete-account/${employeeId}`, data)
    .then((response: AxiosResponse) => {
      dispatch({
        type: ActivationTypes.COMPLETE_SUCCESS,
        payload: response.data.message,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: ActivationTypes.COMPLETE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<ActivationActions>) => {
  dispatch({
    type: ActivationTypes.RESET_DATA,
  });
};
