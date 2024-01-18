import { Dispatch } from "redux";
import { RootState } from "../store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { EmployeeServicesTypes } from "../actionTypes/employeeServicesTypes";
import { EmployeeServicesActions } from "../actions/employeeServicesActions";
// import { Service } from "../../interfaces/service-interface";
import { ErrorResponse } from "../../interfaces/error-interface";
// import { Notification } from "../../utils/Notification";

// завантаження послуг співробітників
export const loadEmployeeServicesData = ({ employeeId, itemsPerPage, currentPage }: { employeeId?: number; itemsPerPage?: number; currentPage?: number } = {}) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch({
    type: EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_REQUEST,
  });

  const token = getState().auth.token;
  
  let url = `${process.env.REACT_APP_API_URL}/employee-services`;

  if (employeeId) {
    url += `/${employeeId}`;
  }

  const queryParams = currentPage && itemsPerPage ? `?limit=${itemsPerPage}&page=${currentPage}` : "";

  axios
    .get(`${url}${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response: AxiosResponse) => {
      dispatch({
        type: EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_SUCCESS,
        payload: {
          employeeServices: response.data.employeeServices,
          totalItems: response.data.count,
        },
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      dispatch({
        type: EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_FAILURE,
        payload: error?.response ? error.response.data.message : error.message,
      });
    });
};

// скидання даних
export const resetData = () => async (dispatch: Dispatch<EmployeeServicesActions>) => {
  dispatch({
    type: EmployeeServicesTypes.RESET_DATA,
  });
};
