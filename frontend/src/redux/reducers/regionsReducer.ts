import { RegionsTypes } from "../actionTypes/regionsTypes";
import { RegionsActions } from "../actions/regionsActions";
import { Region } from "../../interfaces/region-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  regions: Region[];
  totalItems: number;
}

interface RegionsState {
  data: LoadDataState;
  actions: {
    addRegion: CommonState;
    updateRegion: CommonState;
    deleteRegion: CommonState;
  };
}

const initialCommonState: CommonState = {
  message: null,
  error: null,
};

const initialLoadDataState: LoadDataState = {
  regions: [],
  totalItems: 0,
  error: null,
};

const initialRegionsState: RegionsState = {
  data: initialLoadDataState,
  actions: {
    addRegion: initialCommonState,
    updateRegion: initialCommonState,
    deleteRegion: initialCommonState,
  },
};

// редюсер для завантаження регіонів
const loadDataReducer = (state = initialLoadDataState, action: RegionsActions): LoadDataState => {
  switch (action.type) {
    case RegionsTypes.LOAD_REGIONS_REQUEST:
      return {
        ...state,
        error: null,
      };

    case RegionsTypes.LOAD_REGIONS_SUCCESS:
      return {
        ...state,
        regions: action.payload.regions,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case RegionsTypes.LOAD_REGIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для додавання нового регіону
const addReducer = (state = initialCommonState, action: RegionsActions): CommonState => {
  switch (action.type) {
    case RegionsTypes.ADD_REGION_REQUEST:
      return {
        ...state,
        error: null,
      };

    case RegionsTypes.ADD_REGION_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case RegionsTypes.ADD_REGION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для зміни регіону
const updateReducer = (state = initialCommonState, action: RegionsActions): CommonState => {
  switch (action.type) {
    case RegionsTypes.UPDATE_REGION_REQUEST:
      return {
        ...state,
        error: null,
      };

    case RegionsTypes.UPDATE_REGION_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case RegionsTypes.UPDATE_REGION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для видалення регіону
const deleteReducer = (state = initialCommonState, action: RegionsActions): CommonState => {
  switch (action.type) {
    case RegionsTypes.DELETE_REGION_REQUEST:
      return {
        ...state,
        error: null,
      };

    case RegionsTypes.DELETE_REGION_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case RegionsTypes.DELETE_REGION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const regionsReducer = (state = initialRegionsState, action: RegionsActions): RegionsState => {
  switch (action.type) {
    case RegionsTypes.RESET_DATA:
      return initialRegionsState;

    default:
      return {
        data: loadDataReducer(state.data, action),
        actions: {
          addRegion: addReducer(state.actions.addRegion, action),
          updateRegion: updateReducer(state.actions.updateRegion, action),
          deleteRegion: deleteReducer(state.actions.deleteRegion, action),
        },
      };
  }
};

export default regionsReducer;
