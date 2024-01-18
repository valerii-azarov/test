import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { OfficesTypes } from "../actionTypes/officesTypes";
import { OfficesActions } from "../actions/officesActions";
import { Office } from "../../interfaces/office-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
import { Notification } from "../../utils/Notification";

// завантаження офісів
export const loadOfficesData = (itemsPerPage: number, currentPage: number) => async (dispatch: Dispatch<OfficesActions>) => {
  dispatch({
    type: OfficesTypes.LOAD_OFFICES_REQUEST,
  });

  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${process.env.REACT_APP_API_URL}/offices${queryParams}`)
    .then((response: AxiosResponse) => {
      dispatch({
        type: OfficesTypes.LOAD_OFFICES_SUCCESS,
        payload: {
          offices: response.data.offices,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: OfficesTypes.LOAD_OFFICES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// завантаження офісів міста
export const loadOfficesByCityData = (cityId: number) => async (dispatch: Dispatch<OfficesActions>) => {
  dispatch({
    type: OfficesTypes.LOAD_OFFICES_BY_CITY_REQUEST,
  });

  axios
    .get(`${process.env.REACT_APP_API_URL}/offices/city/${cityId}`)
    .then((response: AxiosResponse) => {
      dispatch({
        type: OfficesTypes.LOAD_OFFICES_BY_CITY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: OfficesTypes.LOAD_OFFICES_BY_CITY_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// додавання нового офісу
export const addOffice = (data: Office) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: OfficesTypes.ADD_OFFICE_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .post(`${process.env.REACT_APP_API_URL}/offices`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: OfficesTypes.ADD_OFFICE_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: OfficesTypes.ADD_OFFICE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// зміна офісу
export const updateOffice = (officeId: number, newData: Office) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: OfficesTypes.UPDATE_OFFICE_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .put(`${process.env.REACT_APP_API_URL}/offices/${officeId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: OfficesTypes.UPDATE_OFFICE_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: OfficesTypes.UPDATE_OFFICE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// видалення офісу
export const deleteOffice = (officeId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: OfficesTypes.DELETE_OFFICE_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .delete(`${process.env.REACT_APP_API_URL}/offices/${officeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: OfficesTypes.DELETE_OFFICE_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: OfficesTypes.DELETE_OFFICE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<OfficesActions>) => {
  dispatch({
    type: OfficesTypes.RESET_DATA,
  });
};
