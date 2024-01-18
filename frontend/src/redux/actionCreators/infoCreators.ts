import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { InfoTypes } from "../actionTypes/infoTypes";
import { InfoActions } from "../actions/infoActions";
import { ErrorResponse } from "../../interfaces/error-interface";

// завантаження інформації про співробітника
export const loadDetails = (employeeId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: InfoTypes.LOAD_INFO_REQUEST,
  });
  
  const token = getState().auth.token;

  axios
    .get(`${process.env.REACT_APP_API_URL}/employees/employee/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      console.log(response.data);

      dispatch({
        type: InfoTypes.LOAD_INFO_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: InfoTypes.LOAD_INFO_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<InfoActions>) => {
  dispatch({
    type: InfoTypes.RESET_DATA,
  });
};
