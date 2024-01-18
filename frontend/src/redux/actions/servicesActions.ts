import { ServicesTypes } from "../actionTypes/servicesTypes";
import { Service } from "../../interfaces/service-interface"; 

export type ServicesActions =
  // завантаження послуг
  | { type: ServicesTypes.LOAD_SERVICES_REQUEST }
  | { type: ServicesTypes.LOAD_SERVICES_SUCCESS; payload: { services: Service[], totalItems: number } }
  | { type: ServicesTypes.LOAD_SERVICES_FAILURE; payload: string }
  // скидання даних
  | { type: ServicesTypes.RESET_DATA };
