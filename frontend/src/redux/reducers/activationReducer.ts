import { ActivationTypes } from "../actionTypes/activationTypes";
import { ActivationActions } from "../actions/activationActions";
import { PersonalInfo } from "../../interfaces/employee-interface";

interface CheckState {
  isActivated: boolean;
  data: {
    message: string | null;
    employeeData: PersonalInfo;
  };
  error: string | null;
}

interface CompleteState {
  message: string | null,
  error: string | null;
}

interface ActivationState {
  check: CheckState;
  complete: CompleteState;
}

const defaultEmployeeData: PersonalInfo = {
  id: 0,
  surname: "",
  name: "",
  patronymic: "",
  phone: "",
  email: "",
};

const initialCheckState: CheckState = {
  isActivated: false,
  data: {
    message: null,
    employeeData: defaultEmployeeData,
  },
  error: null,
};

const initialCompleteState: CompleteState = {
  message: null,
  error: null,
};

const initialActivationState: ActivationState = {
  check: initialCheckState,
  complete: initialCompleteState,
};

// редюсер для перевірки активації коду
const checkReducer = (state = initialCheckState, action: ActivationActions): CheckState => {
  switch (action.type) {
    case ActivationTypes.CHECK_REQUEST:
      return {
        ...state,
        error: null,
      };

    case ActivationTypes.CHECK_SUCCESS:
      return {
        ...state,
        isActivated: true,
        data: {
          message: action.payload.message,
          employeeData: action.payload.data,
        },
        error: null,
      };

    case ActivationTypes.CHECK_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для створення облікового запису
const completeReducer = (state = initialCompleteState, action: ActivationActions): CompleteState => {
  switch (action.type) {
    case ActivationTypes.COMPLETE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case ActivationTypes.COMPLETE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case ActivationTypes.COMPLETE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const activationReducer = (state = initialActivationState, action: ActivationActions): ActivationState => {
  switch (action.type) {
    case ActivationTypes.RESET_DATA:
      return initialActivationState;

    default:
      return {
        check: checkReducer(state.check, action),
        complete: completeReducer(state.complete, action),
      };
  }
};

export default activationReducer;
