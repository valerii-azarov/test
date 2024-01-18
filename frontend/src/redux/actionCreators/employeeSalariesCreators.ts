import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { EmployeeSalariesTypes } from "../actionTypes/employeeSalariesTypes";
import { EmployeeSalariesActions } from "../actions/employeeSalariesActions";
import { EmployeeSalary } from "../../interfaces/employee-salary-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
import { Notification } from "../../utils/Notification";

// завантаження зарплат
export const loadEmployeeSalariesData = (itemsPerPage: number, currentPage: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_REQUEST,
  });

  const token = getState().auth.token; 

  axios
    .get(`${process.env.REACT_APP_API_URL}/employee-salaries?limit=${itemsPerPage}&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_SUCCESS,
        payload: {
          employeeSalaries: response.data.employeeSalaries,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// зміна статусу зарплати
export const updateEmployeeSalary = (employeeId: number, newData: EmployeeSalary) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .put(`${process.env.REACT_APP_API_URL}/employee-salaries/${employeeId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<EmployeeSalariesActions>) => {
  dispatch({
    type: EmployeeSalariesTypes.RESET_DATA,
  });
};
