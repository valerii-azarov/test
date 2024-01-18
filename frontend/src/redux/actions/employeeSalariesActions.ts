import { EmployeeSalariesTypes } from "../actionTypes/employeeSalariesTypes";
import { EmployeeSalary } from "../../interfaces/employee-salary-interface"; 

export type EmployeeSalariesActions =
  // завантаження зарплат
  | { type: EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_REQUEST }
  | { type: EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_SUCCESS; payload: { employeeSalaries: EmployeeSalary[], totalItems: number } }
  | { type: EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_FAILURE; payload: string }
  // зміна статусу зарплати
  | { type: EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_REQUEST }
  | { type: EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_SUCCESS; payload: string }
  | { type: EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_FAILURE; payload: string }
  // скидання даних
  | { type: EmployeeSalariesTypes.RESET_DATA };
