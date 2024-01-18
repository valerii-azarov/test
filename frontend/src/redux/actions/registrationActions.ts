import { RegistrationTypes } from "../actionTypes/registrationTypes";

export type RegistrationActions =
  // відправлення форми
  | { type: RegistrationTypes.SUBMIT_REQUEST }
  | { type: RegistrationTypes.SUBMIT_SUCCESS; payload: string }
  | { type: RegistrationTypes.SUBMIT_FAILURE; payload: string }
  // скидання даних
  | { type: RegistrationTypes.RESET_DATA };
