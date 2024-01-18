import { ServiceInfoTypes } from "../actionTypes/serviceInfoTypes";
import { ServiceInfoActions } from "../actions/serviceInfoActions";
import { ServiceInfo } from "../../interfaces/service-info-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  serviceInfo: ServiceInfo[];
  totalItems: number;
}

interface ServiceInfoState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  serviceInfo: [],
  totalItems: 0,
  error: null,
};

const initialServiceInfoState: ServiceInfoState = {
  data: initialLoadDataState,
};

// редюсер для завантаження інформації про послуги
const loadDataReducer = (state = initialLoadDataState, action: ServiceInfoActions): LoadDataState => {
  switch (action.type) {
    case ServiceInfoTypes.LOAD_SERVICE_INFO_REQUEST:
      return {
        ...state,
        error: null,
      };

    case ServiceInfoTypes.LOAD_SERVICE_INFO_SUCCESS:
      return {
        ...state,
        serviceInfo: action.payload.serviceInfo,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case ServiceInfoTypes.LOAD_SERVICE_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const serviceInfoReducer = (state = initialServiceInfoState, action: ServiceInfoActions): ServiceInfoState => {
  switch (action.type) {
    case ServiceInfoTypes.RESET_DATA:
      return initialServiceInfoState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default serviceInfoReducer;
