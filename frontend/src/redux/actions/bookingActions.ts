import { BookingTypes } from "../actionTypes/bookingTypes";
import { Booking } from "../../interfaces/booking-interface";

export type BookingActions =
  // завантаження заявок
  | { type: BookingTypes.LOAD_BOOKING_REQUEST }
  | { type: BookingTypes.LOAD_BOOKING_SUCCESS;
      payload: {
        bookings: Booking[];
        counts: {
          totalItems: number;
          pending: number;
          confirmed: number;
          cancelled: number;
          completed: number;
        };
      };
    }
  | { type: BookingTypes.LOAD_BOOKING_FAILURE; payload: string }
  // додавання нової заявки
  | { type: BookingTypes.ADD_BOOKING_REQUEST }
  | { type: BookingTypes.ADD_BOOKING_SUCCESS; payload: string }
  | { type: BookingTypes.ADD_BOOKING_FAILURE; payload: string }
  // зміна заявки
  | { type: BookingTypes.UPDATE_BOOKING_REQUEST }
  | { type: BookingTypes.UPDATE_BOOKING_SUCCESS; payload: string }
  | { type: BookingTypes.UPDATE_BOOKING_FAILURE; payload: string }
  // видалення заявки
  | { type: BookingTypes.DELETE_BOOKING_REQUEST }
  | { type: BookingTypes.DELETE_BOOKING_SUCCESS; payload: string }
  | { type: BookingTypes.DELETE_BOOKING_FAILURE; payload: string }
  // скидання даних
  | { type: BookingTypes.RESET_DATA };
