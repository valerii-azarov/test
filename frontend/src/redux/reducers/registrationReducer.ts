import { RegistrationTypes } from "../actionTypes/registrationTypes";
import { RegistrationActions } from "../actions/registrationActions";

interface RegistrationState {
  isSubmitted: boolean;
  message: string | null;
  error: string | null;
}

const initialState: RegistrationState = {
  isSubmitted: false,
  message: null,
  error: null,
};

// основний редюсер, який об'єднує всі стани
const registrationReducer = (state = initialState, action: RegistrationActions): RegistrationState => {
  switch (action.type) {
    case RegistrationTypes.SUBMIT_REQUEST:
      return {
        ...state,
        error: null,
      };

    case RegistrationTypes.SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitted: true,
        message: action.payload,
        error: null,
      };

    case RegistrationTypes.SUBMIT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case RegistrationTypes.RESET_DATA:
      return initialState;

    default:
      return state;
  }
};

export default registrationReducer;
