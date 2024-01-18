import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ServicesTypes } from "../actionTypes/servicesTypes";
import { ServicesActions } from "../actions/servicesActions";
// import { Service } from "../../interfaces/service-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження послуг
export const loadServicesData = ({ categoryId, itemsPerPage, currentPage }: { categoryId?: number; itemsPerPage?: number; currentPage?: number } = {}) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: ServicesTypes.LOAD_SERVICES_REQUEST,
  });

  const token = getState().auth.token;
  
  let url = `${process.env.REACT_APP_API_URL}/services`;

  if (categoryId) {
    url += `/${categoryId}`;
  }

  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${url}${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: ServicesTypes.LOAD_SERVICES_SUCCESS,
        payload: {
          services: response.data.services,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: ServicesTypes.LOAD_SERVICES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<ServicesActions>) => {
  dispatch({
    type: ServicesTypes.RESET_DATA,
  });
};
