import { OfficesTypes } from "../actionTypes/officesTypes";
import { OfficesActions } from "../actions/officesActions";
import { Office } from "../../interfaces/office-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  offices: Office[];
  totalItems: number;
}

interface LoadDataByCityState extends CommonState {
  offices: Office[];
}

interface OfficesState {
  data: LoadDataState;
  dataByCity: LoadDataByCityState;
  actions: {
    addOffice: CommonState;
    updateOffice: CommonState;
    deleteOffice: CommonState;
  };
}

const initialCommonState: CommonState = {
  message: null,
  error: null,
};

const initialLoadDataState: LoadDataState = {
  offices: [],
  totalItems: 0,
  error: null,
};

const initialLoadDataByCityState: LoadDataByCityState = {
  offices: [],
  error: null,
};

const initialOfficesState: OfficesState = {
  data: initialLoadDataState,
  dataByCity: initialLoadDataByCityState,
  actions: {
    addOffice: initialCommonState,
    updateOffice: initialCommonState,
    deleteOffice: initialCommonState,
  },
};

// редюсер для завантаження офісу
const loadDataReducer = (state = initialLoadDataState, action: OfficesActions): LoadDataState => {
  switch (action.type) {
    case OfficesTypes.LOAD_OFFICES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case OfficesTypes.LOAD_OFFICES_SUCCESS:
      return {
        ...state,
        offices: action.payload.offices,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case OfficesTypes.LOAD_OFFICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для завантаження офісів міста
const loadDataByCityReducer = (state = initialLoadDataByCityState, action: OfficesActions): LoadDataByCityState => {
  switch (action.type) {
    case OfficesTypes.LOAD_OFFICES_BY_CITY_REQUEST:
      return {
        ...state,
        error: null,
      };

    case OfficesTypes.LOAD_OFFICES_BY_CITY_SUCCESS:
      return {
        ...state,
        offices: action.payload,
        error: null,
      };

    case OfficesTypes.LOAD_OFFICES_BY_CITY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для додавання нового офісу
const addReducer = (state = initialCommonState, action: OfficesActions): CommonState => {
  switch (action.type) {
    case OfficesTypes.ADD_OFFICE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case OfficesTypes.ADD_OFFICE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case OfficesTypes.ADD_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для зміни офісу
const updateReducer = (state = initialCommonState, action: OfficesActions): CommonState => {
  switch (action.type) {
    case OfficesTypes.UPDATE_OFFICE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case OfficesTypes.UPDATE_OFFICE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case OfficesTypes.UPDATE_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для видалення офісу
const deleteReducer = (state = initialCommonState, action: OfficesActions): CommonState => {
  switch (action.type) {
    case OfficesTypes.DELETE_OFFICE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case OfficesTypes.DELETE_OFFICE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case OfficesTypes.DELETE_OFFICE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const OfficesReducer = (state = initialOfficesState, action: OfficesActions): OfficesState => {
  switch (action.type) {
    case OfficesTypes.RESET_DATA:
      return initialOfficesState;

    default:
      return {
        data: loadDataReducer(state.data, action),
        dataByCity: loadDataByCityReducer(state.dataByCity, action),
        actions: {
          addOffice: addReducer(state.actions.addOffice, action),
          updateOffice: updateReducer(state.actions.updateOffice, action),
          deleteOffice: deleteReducer(state.actions.deleteOffice, action),
        },
      };
  }
};

export default OfficesReducer;
