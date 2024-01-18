import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CitiesTypes } from "../actionTypes/citiesTypes";
import { CitiesActions } from "../actions/citiesActions";
import { City } from "../../interfaces/city-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
import { Notification } from "../../utils/Notification";

// завантаження міст
export const loadCitiesData = (itemsPerPage?: number, currentPage?: number) => async (dispatch: Dispatch<CitiesActions>) => {
  dispatch({
    type: CitiesTypes.LOAD_CITIES_REQUEST,
  });

  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${process.env.REACT_APP_API_URL}/cities${queryParams}`)
    .then((response: AxiosResponse) => {
      dispatch({
        type: CitiesTypes.LOAD_CITIES_SUCCESS,
        payload: {
          cities: response.data.cities,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: CitiesTypes.LOAD_CITIES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// завантаження міст області
export const loadCitiesByRegionData = (regionId: number) => async (dispatch: Dispatch<CitiesActions>) => {
  dispatch({
    type: CitiesTypes.LOAD_CITIES_BY_REGION_REQUEST,
  });

  axios
    .get(`${process.env.REACT_APP_API_URL}/cities/region/${regionId}`)
    .then((response: AxiosResponse) => {
      dispatch({
        type: CitiesTypes.LOAD_CITIES_BY_REGION_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: CitiesTypes.LOAD_CITIES_BY_REGION_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// додавання нового міста
export const addCity = (data: City) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: CitiesTypes.ADD_CITY_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .post(`${process.env.REACT_APP_API_URL}/cities`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: CitiesTypes.ADD_CITY_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: CitiesTypes.ADD_CITY_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// зміна міста
export const updateCity = (cityId: number, newData: City) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: CitiesTypes.UPDATE_CITY_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .put(`${process.env.REACT_APP_API_URL}/cities/${cityId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: CitiesTypes.UPDATE_CITY_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: CitiesTypes.UPDATE_CITY_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// видалення міста
export const deleteCity = (cityId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: CitiesTypes.DELETE_CITY_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .delete(`${process.env.REACT_APP_API_URL}/cities/${cityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: CitiesTypes.DELETE_CITY_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: CitiesTypes.DELETE_CITY_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<CitiesActions>) => {
  dispatch({
    type: CitiesTypes.RESET_DATA,
  });
};
