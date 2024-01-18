import { ServiceTypesTypes } from "../actionTypes/serviceTypesTypes";
import { ServiceTypesActions } from "../actions/serviceTypesActions";
import { ServiceType } from "../../interfaces/service-type-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  serviceTypes: ServiceType[];
  totalItems: number;
}

interface ServiceTypesState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  serviceTypes: [],
  totalItems: 0,
  error: null,
};

const initialServiceTypesState: ServiceTypesState = {
  data: initialLoadDataState,
};

// редюсер для завантаження типів послуги
const loadDataReducer = (state = initialLoadDataState, action: ServiceTypesActions): LoadDataState => {
  switch (action.type) {
    case ServiceTypesTypes.LOAD_SERVICE_TYPES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case ServiceTypesTypes.LOAD_SERVICE_TYPES_SUCCESS:
      return {
        ...state,
        serviceTypes: action.payload.serviceTypes,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case ServiceTypesTypes.LOAD_SERVICE_TYPES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const serviceTypesReducer = (state = initialServiceTypesState, action: ServiceTypesActions): ServiceTypesState => {
  switch (action.type) {
    case ServiceTypesTypes.RESET_DATA:
      return initialServiceTypesState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default serviceTypesReducer;
