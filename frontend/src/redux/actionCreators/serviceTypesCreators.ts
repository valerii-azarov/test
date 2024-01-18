import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ServiceTypesTypes } from "../actionTypes/serviceTypesTypes";
import { ServiceTypesActions } from "../actions/serviceTypesActions";
// import { ServiceType } from "../../interfaces/service-type-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження типів послуги
export const loadServiceTypesData = ({ serviceId, itemsPerPage, currentPage }: { serviceId?: number; itemsPerPage?: number; currentPage?: number } = {}) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: ServiceTypesTypes.LOAD_SERVICE_TYPES_REQUEST,
  });

  const token = getState().auth.token;
  
  let url = `${process.env.REACT_APP_API_URL}/service_types`;

  if (serviceId) {
    url += `/${serviceId}`;
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
        type: ServiceTypesTypes.LOAD_SERVICE_TYPES_SUCCESS,
        payload: {
          serviceTypes: response.data.serviceTypes,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: ServiceTypesTypes.LOAD_SERVICE_TYPES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<ServiceTypesActions>) => {
  dispatch({
    type: ServiceTypesTypes.RESET_DATA,
  });
};
