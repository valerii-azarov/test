import { ActivationTypes } from "../actionTypes/activationTypes";
import { PersonalInfo } from "../../interfaces/employee-interface"; 

export type ActivationActions =
  // перевірка активації коду
  | { type: ActivationTypes.CHECK_REQUEST }
  | { type: ActivationTypes.CHECK_SUCCESS; payload: { message: string; data: PersonalInfo; } }
  | { type: ActivationTypes.CHECK_FAILURE; payload: string }
  // створення облікового запису
  | { type: ActivationTypes.COMPLETE_REQUEST }
  | { type: ActivationTypes.COMPLETE_SUCCESS; payload: string }
  | { type: ActivationTypes.COMPLETE_FAILURE; payload: string }
  // скидання даних
  | { type: ActivationTypes.RESET_DATA };
