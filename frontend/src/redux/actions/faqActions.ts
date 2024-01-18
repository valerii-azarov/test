import { FaqTypes } from "../actionTypes/faqTypes";
import { Faq } from "../../interfaces/faq-interface"; 

export type FaqActions =
  // завантаження питань та відповідей
  | { type: FaqTypes.LOAD_FAQ_REQUEST }
  | { type: FaqTypes.LOAD_FAQ_SUCCESS; payload: { faq: Faq[], totalItems: number } }
  | { type: FaqTypes.LOAD_FAQ_FAILURE; payload: string }
  // скидання даних
  | { type: FaqTypes.RESET_DATA };
