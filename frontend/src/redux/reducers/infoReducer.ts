import { InfoTypes } from "../actionTypes/infoTypes";
import { InfoActions } from "../actions/infoActions";
import { PersonalInfo, EmploymentDetails } from "../../interfaces/employee-interface";

interface Employee extends PersonalInfo, EmploymentDetails {};

interface InfoState {
  data: Employee;
  error: string | null;
}

const initialInfoState: InfoState = {
  data: {
    id: 0,
    surname: "",
    name: "",
    patronymic: "",
    phone: "",
    email: "",
    role_id: 0,
    position_id: 0,
    status_id: 0,
    region: "",
    city: "",
    office: "",
  },
  error: null,
};

// редюсер для завантаження інформації про співробітника
const infoReducer = (state = initialInfoState, action: InfoActions): InfoState => {
  switch (action.type) {
    case InfoTypes.LOAD_INFO_REQUEST:
      return {
        ...state,
        error: null,
      };
  
    case InfoTypes.LOAD_INFO_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
  
    case InfoTypes.LOAD_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case InfoTypes.RESET_DATA:
      return initialInfoState;

    default:
      return state;
  }
};

export default infoReducer;
