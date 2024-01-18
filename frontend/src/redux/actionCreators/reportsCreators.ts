import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ReportsTypes } from "../actionTypes/reportsTypes";
import { ReportsActions } from "../actions/reportsActions";
// import { Service } from "../../interfaces/service-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження звіту
export const loadReportsData = (employeeId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: ReportsTypes.LOAD_REPORTS_REQUEST,
  });

  const token = getState().auth.token;

  axios
    .get(`${process.env.REACT_APP_API_URL}/reports/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: ReportsTypes.LOAD_REPORTS_SUCCESS,
        payload: {
          isPaid: response.data.isPaid,
          totalReports: response.data.totalReports,
          dailyReports: response.data.dailyReports,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: ReportsTypes.LOAD_REPORTS_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<ReportsActions>) => {
  dispatch({
    type: ReportsTypes.RESET_DATA,
  });
};
