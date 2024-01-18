import { EmployeesTypes } from "../actionTypes/employeesTypes";
import { Employee } from "../../interfaces/employee-interface"; 

export type EmployeesActions =
  // завантаження співробітників
  | { type: EmployeesTypes.LOAD_EMPLOYEES_REQUEST }
  | { type: EmployeesTypes.LOAD_EMPLOYEES_SUCCESS; payload: { employees: Employee[], totalItems: number } }
  | { type: EmployeesTypes.LOAD_EMPLOYEES_FAILURE; payload: string }
  // схвалення заявки співробітника
  | { type: EmployeesTypes.APPROVE_EMPLOYEE_REQUEST }
  | { type: EmployeesTypes.APPROVE_EMPLOYEE_SUCCESS; payload: { message: string, activationCode: string } }
  | { type: EmployeesTypes.APPROVE_EMPLOYEE_FAILURE; payload: string }
  // додавання нового співробітника
  | { type: EmployeesTypes.ADD_EMPLOYEE_REQUEST }
  | { type: EmployeesTypes.ADD_EMPLOYEE_SUCCESS; payload: string }
  | { type: EmployeesTypes.ADD_EMPLOYEE_FAILURE; payload: string }
  // зміна співробітника
  | { type: EmployeesTypes.UPDATE_EMPLOYEE_REQUEST }
  | { type: EmployeesTypes.UPDATE_EMPLOYEE_SUCCESS; payload: string }
  | { type: EmployeesTypes.UPDATE_EMPLOYEE_FAILURE; payload: string }
  // видалення співробітника
  | { type: EmployeesTypes.DELETE_EMPLOYEE_REQUEST }
  | { type: EmployeesTypes.DELETE_EMPLOYEE_SUCCESS; payload: string }
  | { type: EmployeesTypes.DELETE_EMPLOYEE_FAILURE; payload: string }
  // скидання даних
  | { type: EmployeesTypes.RESET_DATA };
