import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ServiceInfoTypes } from "../actionTypes/serviceInfoTypes";
import { ServiceInfoActions } from "../actions/serviceInfoActions";
// import { ServiceType } from "../../interfaces/service-type-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження інформації про послуги
export const loadServiceInfoData = ({ itemsPerPage, currentPage }: { itemsPerPage?: number; currentPage?: number } = {}) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: ServiceInfoTypes.LOAD_SERVICE_INFO_REQUEST,
  });

  const token = getState().auth.token;
  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${process.env.REACT_APP_API_URL}/service-info${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: ServiceInfoTypes.LOAD_SERVICE_INFO_SUCCESS,
        payload: {
          serviceInfo: response.data.serviceInfo,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: ServiceInfoTypes.LOAD_SERVICE_INFO_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<ServiceInfoActions>) => {
  dispatch({
    type: ServiceInfoTypes.RESET_DATA,
  });
};
