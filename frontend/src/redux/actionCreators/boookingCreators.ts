import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { BookingTypes } from "../actionTypes/bookingTypes";
import { BookingActions } from "../actions/bookingActions";
import { Booking } from "../../interfaces/booking-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
import { Notification } from "../../utils/Notification";

// завантаження заявок
export const loadBookingData = (itemsPerPage: number, currentPage: number, employeeId: number, isAdmin: boolean) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: BookingTypes.LOAD_BOOKING_REQUEST,
  });

  const token = getState().auth.token;

  axios
    .get(`${process.env.REACT_APP_API_URL}/booking/${employeeId}?limit=${itemsPerPage}&page=${currentPage}&isAdmin=${isAdmin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: BookingTypes.LOAD_BOOKING_SUCCESS,
        payload: {
          bookings: response.data.bookings,
          counts: response.data.counts,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: BookingTypes.LOAD_BOOKING_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// додавання нової заявки
export const addBooking = (data: Booking) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: BookingTypes.ADD_BOOKING_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .post(`${process.env.REACT_APP_API_URL}/booking`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: BookingTypes.ADD_BOOKING_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: BookingTypes.ADD_BOOKING_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// зміна заявки
export const updateBooking = (bookingId: number, newData: Booking) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: BookingTypes.UPDATE_BOOKING_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .put(`${process.env.REACT_APP_API_URL}/booking/${bookingId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: BookingTypes.UPDATE_BOOKING_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: BookingTypes.ADD_BOOKING_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// видалення заявки
export const deleteBooking = (bookingId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: BookingTypes.DELETE_BOOKING_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .delete(`${process.env.REACT_APP_API_URL}/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: BookingTypes.DELETE_BOOKING_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: BookingTypes.DELETE_BOOKING_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<BookingActions>) => {
  dispatch({
    type: BookingTypes.RESET_DATA,
  });
};
