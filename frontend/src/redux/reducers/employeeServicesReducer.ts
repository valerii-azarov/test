import { EmployeeServicesTypes } from "../actionTypes/employeeServicesTypes";
import { EmployeeServicesActions } from "../actions/employeeServicesActions";
import { EmployeeService } from "../../interfaces/employee-service-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  employeeServices: EmployeeService[];
  totalItems: number;
}

interface EmployeeServicesState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  employeeServices: [],
  totalItems: 0,
  error: null,
};

const initialEmployeeServicesState: EmployeeServicesState = {
  data: initialLoadDataState,
};

// редюсер для завантаження послуг співробітників
const loadDataReducer = (state = initialLoadDataState, action: EmployeeServicesActions): LoadDataState => {
  switch (action.type) {
    case EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_SUCCESS:
      return {
        ...state,
        employeeServices: action.payload.employeeServices,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case EmployeeServicesTypes.LOAD_EMPLOYEE_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const employeeServicesReducer = (state = initialEmployeeServicesState, action: EmployeeServicesActions): EmployeeServicesState => {
  switch (action.type) {
    case EmployeeServicesTypes.RESET_DATA:
      return initialEmployeeServicesState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default employeeServicesReducer;
