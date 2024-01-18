import { EmployeeSalariesTypes } from "../actionTypes/employeeSalariesTypes";
import { EmployeeSalariesActions } from "../actions/employeeSalariesActions";
import { EmployeeSalary } from "../../interfaces/employee-salary-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  employeeSalaries: EmployeeSalary[];
  totalItems: number;
}

interface EmployeeSalariesState {
  data: LoadDataState;
  actions: {
    updateEmployee: CommonState;
  };
}

const initialCommonState: CommonState = {
  message: null,
  error: null,
};

const initialLoadDataState: LoadDataState = {
  employeeSalaries: [],
  totalItems: 0,
  error: null,
};

const initialEmployeeSalariesState: EmployeeSalariesState = {
  data: initialLoadDataState,
  actions: {
    updateEmployee: initialCommonState,
  },
};

// редюсер для завантаження зарплат
const loadDataReducer = (state = initialLoadDataState, action: EmployeeSalariesActions): LoadDataState => {
  switch (action.type) {
    case EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_SUCCESS:
      return {
        ...state,
        employeeSalaries: action.payload.employeeSalaries,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case EmployeeSalariesTypes.LOAD_EMPLOYEE_SALARIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для зміни статусу зарплати
const updateReducer = (state = initialCommonState, action: EmployeeSalariesActions): CommonState => {
  switch (action.type) {
    case EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case EmployeeSalariesTypes.UPDATE_EMPLOYEE_SALARIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const employeeSalariesReducer = (state = initialEmployeeSalariesState, action: EmployeeSalariesActions): EmployeeSalariesState => {
  switch (action.type) {
    case EmployeeSalariesTypes.RESET_DATA:
      return initialEmployeeSalariesState;

    default:
      return {
        data: loadDataReducer(state.data, action),
        actions: {
          updateEmployee: updateReducer(state.actions.updateEmployee, action),
        },
      };
  }
};

export default employeeSalariesReducer;
