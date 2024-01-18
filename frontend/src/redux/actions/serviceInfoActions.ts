import { ServiceInfoTypes } from "../actionTypes/serviceInfoTypes";
import { ServiceInfo } from "../../interfaces/service-info-interface"; 

export type ServiceInfoActions =
  // завантаження інформації про послуги
  | { type: ServiceInfoTypes.LOAD_SERVICE_INFO_REQUEST }
  | { type: ServiceInfoTypes.LOAD_SERVICE_INFO_SUCCESS; payload: { serviceInfo: ServiceInfo[], totalItems: number } }
  | { type: ServiceInfoTypes.LOAD_SERVICE_INFO_FAILURE; payload: string }
  // скидання даних
  | { type: ServiceInfoTypes.RESET_DATA };
