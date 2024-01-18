import { ServicesTypes } from "../actionTypes/servicesTypes";
import { ServicesActions } from "../actions/servicesActions";
import { Service } from "../../interfaces/service-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  services: Service[];
  totalItems: number;
}

interface ServicesState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  services: [],
  totalItems: 0,
  error: null,
};

const initialServicesState: ServicesState = {
  data: initialLoadDataState,
};

// редюсер для завантаження послуг
const loadDataReducer = (state = initialLoadDataState, action: ServicesActions): LoadDataState => {
  switch (action.type) {
    case ServicesTypes.LOAD_SERVICES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case ServicesTypes.LOAD_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload.services,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case ServicesTypes.LOAD_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const servicesReducer = (state = initialServicesState, action: ServicesActions): ServicesState => {
  switch (action.type) {
    case ServicesTypes.RESET_DATA:
      return initialServicesState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default servicesReducer;
