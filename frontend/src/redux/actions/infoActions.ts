import { InfoTypes } from "../actionTypes/infoTypes";
import { PersonalInfo, EmploymentDetails } from "../../interfaces/employee-interface";

interface Employee extends PersonalInfo, EmploymentDetails {};

export type InfoActions =
  // завантаження інформації про співробітника
  | { type: InfoTypes.LOAD_INFO_REQUEST }
  | { type: InfoTypes.LOAD_INFO_SUCCESS; payload: Employee }
  | { type: InfoTypes.LOAD_INFO_FAILURE; payload: string }
  // скидання даних
  | { type: InfoTypes.RESET_DATA };
