import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { EmployeesTypes } from "../actionTypes/employeesTypes";
import { EmployeesActions } from "../actions/employeesActions";
import { Employee } from "../../interfaces/employee-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
import { Notification } from "../../utils/Notification";

// завантаження співробітників
export const loadEmployeesData = (itemsPerPage?: number, currentPage?: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: EmployeesTypes.LOAD_EMPLOYEES_REQUEST,
  });

  const token = getState().auth.token; 

  axios
    .get(`${process.env.REACT_APP_API_URL}/employees?limit=${itemsPerPage}&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: EmployeesTypes.LOAD_EMPLOYEES_SUCCESS,
        payload: {
          employees: response.data.employees,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: EmployeesTypes.LOAD_EMPLOYEES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// схвалення заявки співробітника
export const approveEmployee = (employeeId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: EmployeesTypes.APPROVE_EMPLOYEE_REQUEST,
  });
  
  const token = getState().auth.token;

  axios
    .put(`${process.env.REACT_APP_API_URL}/employees/approve/${employeeId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: EmployeesTypes.APPROVE_EMPLOYEE_SUCCESS,
        payload: {
          message: response.data.message,
          activationCode: response.data.activationCode,
        },
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: EmployeesTypes.APPROVE_EMPLOYEE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// додавання нового співробітника
export const addEmployee = (data: Employee) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: EmployeesTypes.ADD_EMPLOYEE_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .post(`${process.env.REACT_APP_API_URL}/employees`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: EmployeesTypes.ADD_EMPLOYEE_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: EmployeesTypes.ADD_EMPLOYEE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// зміна співробітника
export const updateEmployee = (employeeId: number, newData: Employee) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: EmployeesTypes.UPDATE_EMPLOYEE_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .put(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: EmployeesTypes.UPDATE_EMPLOYEE_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: EmployeesTypes.UPDATE_EMPLOYEE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// видалення співробітника
export const deleteEmployee = (employeeId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: EmployeesTypes.DELETE_EMPLOYEE_REQUEST,
  });
  
  const token = getState().auth.token;  

  axios
    .delete(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: EmployeesTypes.DELETE_EMPLOYEE_SUCCESS,
        payload: response.data.message,
      });

      Notification("success", response.data.message);
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: EmployeesTypes.DELETE_EMPLOYEE_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<EmployeesActions>) => {
  dispatch({
    type: EmployeesTypes.RESET_DATA,
  });
};
