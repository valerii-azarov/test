import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { RegionsTypes } from "../actionTypes/regionsTypes";
import { RegionsActions } from "../actions/regionsActions";
import { Region } from "../../interfaces/region-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
import { Notification } from "../../utils/Notification";

// завантаження регіонів
export const loadRegionsData = (itemsPerPage?: number, currentPage?: number) => async (dispatch: Dispatch) => {
  dispatch({
    type: RegionsTypes.LOAD_REGIONS_REQUEST,
  });

  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${process.env.REACT_APP_API_URL}/regions${queryParams}`)
    .then((response: AxiosResponse) => {
      dispatch({
        type: RegionsTypes.LOAD_REGIONS_SUCCESS,
        payload: {
          regions: response.data.regions,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: RegionsTypes.LOAD_REGIONS_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// додавання нового регіону
export const addRegion = (data: Region) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: RegionsTypes.ADD_REGION_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .post(`${process.env.REACT_APP_API_URL}/regions`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: RegionsTypes.ADD_REGION_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: RegionsTypes.ADD_REGION_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// зміна регіону
export const updateRegion = (regionId: number, newData: Region) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: RegionsTypes.UPDATE_REGION_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .put(`${process.env.REACT_APP_API_URL}/regions/${regionId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: RegionsTypes.UPDATE_REGION_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: RegionsTypes.UPDATE_REGION_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// видалення регіону
export const deleteRegion = (regionId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: RegionsTypes.DELETE_REGION_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .delete(`${process.env.REACT_APP_API_URL}/regions/${regionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: RegionsTypes.DELETE_REGION_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: RegionsTypes.DELETE_REGION_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<RegionsActions>) => {
  dispatch({
    type: RegionsTypes.RESET_DATA,
  });
};
