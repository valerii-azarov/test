import { OfficesTypes } from "../actionTypes/officesTypes";
import { Office } from "../../interfaces/office-interface"; 

export type OfficesActions =
  // завантаження офісів
  | { type: OfficesTypes.LOAD_OFFICES_REQUEST }
  | { type: OfficesTypes.LOAD_OFFICES_SUCCESS; payload: { offices: Office[], totalItems: number } }
  | { type: OfficesTypes.LOAD_OFFICES_FAILURE; payload: string }
  // завантаження офісів міста
  | { type: OfficesTypes.LOAD_OFFICES_BY_CITY_REQUEST }
  | { type: OfficesTypes.LOAD_OFFICES_BY_CITY_SUCCESS; payload: Office[] }
  | { type: OfficesTypes.LOAD_OFFICES_BY_CITY_FAILURE; payload: string }
  // додавання нового офісу
  | { type: OfficesTypes.ADD_OFFICE_REQUEST }
  | { type: OfficesTypes.ADD_OFFICE_SUCCESS; payload: string }
  | { type: OfficesTypes.ADD_OFFICE_FAILURE; payload: string }
  // зміна офісу
  | { type: OfficesTypes.UPDATE_OFFICE_REQUEST }
  | { type: OfficesTypes.UPDATE_OFFICE_SUCCESS; payload: string }
  | { type: OfficesTypes.UPDATE_OFFICE_FAILURE; payload: string }
  // видалення офісу
  | { type: OfficesTypes.DELETE_OFFICE_REQUEST }
  | { type: OfficesTypes.DELETE_OFFICE_SUCCESS; payload: string }
  | { type: OfficesTypes.DELETE_OFFICE_FAILURE; payload: string }
  // скидання даних
  | { type: OfficesTypes.RESET_DATA };
