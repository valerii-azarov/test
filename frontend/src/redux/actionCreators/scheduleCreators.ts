import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ScheduleTypes } from "../actionTypes/scheduleTypes";
import { ScheduleActions } from "../actions/scheduleActions";
// import { Schedule } from "../../interfaces/schedule-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження розкладу
export const loadScheduleData = (officeId: number, serviceId: number, itemsPerPage?: number, currentPage?: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: ScheduleTypes.LOAD_SCHEDULE_REQUEST,
  });

  const token = getState().auth.token;
  const queryParams = `${officeId}/${serviceId}${currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : ""}`;

  axios
    .get(`${process.env.REACT_APP_API_URL}/schedule/${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: ScheduleTypes.LOAD_SCHEDULE_SUCCESS,
        payload: {
          schedule: response.data.schedule,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: ScheduleTypes.LOAD_SCHEDULE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<ScheduleActions>) => {
  dispatch({
    type: ScheduleTypes.RESET_DATA,
  });
};
