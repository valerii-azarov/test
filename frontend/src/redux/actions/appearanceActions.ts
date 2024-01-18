import { AppearanceTypes } from "../actionTypes/appearanceTypes";
import { Appearance } from "../../interfaces/appearance-interface";

export type AppearanceActions =
  // завантаження налаштування
  | { type: AppearanceTypes.LOAD_APPEARANCE_REQUEST }
  | { type: AppearanceTypes.LOAD_APPEARANCE_SUCCESS; payload: Appearance }
  | { type: AppearanceTypes.LOAD_APPEARANCE_FAILURE; payload: string }
  // скидання даних
  | { type: AppearanceTypes.RESET_DATA };
