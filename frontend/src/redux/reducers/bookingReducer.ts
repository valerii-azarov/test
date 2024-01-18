import { BookingTypes } from "../actionTypes/bookingTypes";
import { BookingActions } from "../actions/bookingActions";
import { Booking } from "../../interfaces/booking-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  bookings: Booking[];
  counts: {
    totalItems: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
}

interface BookingState {
  data: LoadDataState;
  actions: {
    addBooking: CommonState;
    updateBooking: CommonState;
    deleteBooking: CommonState;
  };
}

const initialCommonState: CommonState = {
  message: null,
  error: null,
};

const initialLoadDataState: LoadDataState = {
  bookings: [],
  counts: {
    totalItems: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  },
  error: null,
};

const initialBookingState: BookingState = {
  data: initialLoadDataState,
  actions: {
    addBooking: initialCommonState,
    updateBooking: initialCommonState,
    deleteBooking: initialCommonState,
  },
};

// редюсер для завантаження заявок
const loadDataReducer = (state = initialLoadDataState, action: BookingActions): LoadDataState => {
  switch (action.type) {
    case BookingTypes.LOAD_BOOKING_REQUEST:
      return {
        ...state,
        error: null,
      };

    case BookingTypes.LOAD_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: action.payload.bookings,
        counts: {
          totalItems: action.payload.counts.totalItems,
          pending: action.payload.counts.pending,
          confirmed: action.payload.counts.confirmed,
          cancelled: action.payload.counts.cancelled,
          completed: action.payload.counts.completed,
        },
        error: null,
      };

    case BookingTypes.LOAD_BOOKING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для додавання нової заявки
const addReducer = (state = initialCommonState, action: BookingActions): CommonState => {
  switch (action.type) {
    case BookingTypes.ADD_BOOKING_REQUEST:
      return {
        ...state,
        error: null,
      };

    case BookingTypes.ADD_BOOKING_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case BookingTypes.ADD_BOOKING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для зміни заявки
const updateReducer = (state = initialCommonState, action: BookingActions): CommonState => {
  switch (action.type) {
    case BookingTypes.UPDATE_BOOKING_REQUEST:
      return {
        ...state,
        error: null,
      };

    case BookingTypes.UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case BookingTypes.UPDATE_BOOKING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для видалення заявки
const deleteReducer = (state = initialCommonState, action: BookingActions): CommonState => {
  switch (action.type) {
    case BookingTypes.DELETE_BOOKING_REQUEST:
      return {
        ...state,
        error: null,
      };

    case BookingTypes.DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case BookingTypes.DELETE_BOOKING_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const bookingReducer = (state = initialBookingState, action: BookingActions): BookingState => {
  switch (action.type) {
    case BookingTypes.RESET_DATA:
      return initialBookingState;

    default:
      return {
        data: loadDataReducer(state.data, action),
        actions: {
          addBooking: addReducer(state.actions.addBooking, action),
          updateBooking: updateReducer(state.actions.updateBooking, action),
          deleteBooking: deleteReducer(state.actions.deleteBooking, action),
        },
      };
  }
};

export default bookingReducer;
