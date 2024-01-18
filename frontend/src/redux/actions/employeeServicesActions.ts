import { EmployeeServicesTypes } from "../actionTypes/employeeServicesTypes";
import { EmployeeService } from "../../interfaces/employee-service-interface"; 

export type EmployeeServicesActions =
  // завантаження послуг співробітників
  | { type: EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_REQUEST }
  | { type: EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_SUCCESS; payload: { employeeServices: EmployeeService[], totalItems: number } }
  | { type: EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_FAILURE; payload: string }
  // скидання даних
  | { type: EmployeeServicesTypes.RESET_DATA };
