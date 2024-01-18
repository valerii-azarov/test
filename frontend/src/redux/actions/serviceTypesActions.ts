import { ServiceTypesTypes } from "../actionTypes/serviceTypesTypes";
import { ServiceType } from "../../interfaces/service-type-interface"; 

export type ServiceTypesActions =
  // завантаження типів послуги
  | { type: ServiceTypesTypes.LOAD_SERVICE_TYPES_REQUEST }
  | { type: ServiceTypesTypes.LOAD_SERVICE_TYPES_SUCCESS; payload: { serviceTypes: ServiceType[], totalItems: number } }
  | { type: ServiceTypesTypes.LOAD_SERVICE_TYPES_FAILURE; payload: string }
  // скидання даних
  | { type: ServiceTypesTypes.RESET_DATA };
