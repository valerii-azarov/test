import { EmployeesTypes } from "../actionTypes/employeesTypes";
import { EmployeesActions } from "../actions/employeesActions";
import { Employee } from "../../interfaces/employee-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  employees: Employee[];
  totalItems: number;
}

interface ActivationCodeState extends CommonState {
  activationCode: string | null;
}

interface EmployeesState {
  data: LoadDataState;
  actions: {
    addEmployee: CommonState;
    approveEmployee: ActivationCodeState;
    updateEmployee: CommonState;
    deleteEmployee: CommonState;
  };
}

const initialCommonState: CommonState = {
  message: null,
  error: null,
};

const initialLoadDataState: LoadDataState = {
  employees: [],
  totalItems: 0,
  error: null,
};

const initialActivationCodeState: ActivationCodeState = {
  message: null,
  activationCode: null,
  error: null,
};

const initialEmployeesState: EmployeesState = {
  data: initialLoadDataState,
  actions: {
    addEmployee: initialCommonState,
    approveEmployee: initialActivationCodeState,
    updateEmployee: initialCommonState,
    deleteEmployee: initialCommonState,
  },
};

// редюсер для завантаження співробітників
const loadDataReducer = (state = initialLoadDataState, action: EmployeesActions): LoadDataState => {
  switch (action.type) {
    case EmployeesTypes.LOAD_EMPLOYEES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case EmployeesTypes.LOAD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload.employees,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case EmployeesTypes.LOAD_EMPLOYEES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для додавання нового співробітника
const addReducer = (state = initialCommonState, action: EmployeesActions): CommonState => {
  switch (action.type) {
    case EmployeesTypes.ADD_EMPLOYEE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case EmployeesTypes.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case EmployeesTypes.ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для схвалення заявки співробітника
const approveReducer = (state = initialActivationCodeState, action: EmployeesActions): ActivationCodeState => {
  switch (action.type) {
    case EmployeesTypes.APPROVE_EMPLOYEE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case EmployeesTypes.APPROVE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        activationCode: action.payload.activationCode,
        error: null,
      };

    case EmployeesTypes.APPROVE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для зміни співробітника
const updateReducer = (state = initialCommonState, action: EmployeesActions): CommonState => {
  switch (action.type) {
    case EmployeesTypes.UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case EmployeesTypes.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case EmployeesTypes.UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для видалення співробітника
const deleteReducer = (state = initialCommonState, action: EmployeesActions): CommonState => {
  switch (action.type) {
    case EmployeesTypes.DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case EmployeesTypes.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case EmployeesTypes.DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const employeesReducer = (state = initialEmployeesState, action: EmployeesActions): EmployeesState => {
  switch (action.type) {
    case EmployeesTypes.RESET_DATA:
      return initialEmployeesState;

    default:
      return {
        data: loadDataReducer(state.data, action),
        actions: {
          addEmployee: addReducer(state.actions.addEmployee, action),
          approveEmployee: approveReducer(state.actions.approveEmployee, action),
          updateEmployee: updateReducer(state.actions.updateEmployee, action),
          deleteEmployee: deleteReducer(state.actions.deleteEmployee, action),
        },
      };
  }
};

export default employeesReducer;
