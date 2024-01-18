import { CitiesTypes } from "../actionTypes/citiesTypes";
import { CitiesActions } from "../actions/citiesActions";
import { City } from "../../interfaces/city-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  cities: City[];
  totalItems: number;
}

interface LoadDataByRegionState extends CommonState {
  cities: City[];
}

interface CitiesState {
  data: LoadDataState;
  dataByRegion: LoadDataByRegionState;
  actions: {
    addCity: CommonState;
    updateCity: CommonState;
    deleteCity: CommonState;
  };
}

const initialCommonState: CommonState = {
  message: null,
  error: null,
};

const initialLoadDataState: LoadDataState = {
  cities: [],
  totalItems: 0,
  error: null,
};

const initialLoadDataByRegionState: LoadDataByRegionState = {
  cities: [],
  error: null,
};

const initialCitiesState: CitiesState = {
  data: initialLoadDataState,
  dataByRegion: initialLoadDataByRegionState,
  actions: {
    addCity: initialCommonState,
    updateCity: initialCommonState,
    deleteCity: initialCommonState,
  },
};

// редюсер для завантаження міст
const loadDataReducer = (state = initialLoadDataState, action: CitiesActions): LoadDataState => {
  switch (action.type) {
    case CitiesTypes.LOAD_CITIES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case CitiesTypes.LOAD_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload.cities,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case CitiesTypes.LOAD_CITIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для завантаження міст області
const loadDataByRegionReducer = (state = initialLoadDataByRegionState, action: CitiesActions): LoadDataByRegionState => {
  switch (action.type) {
    case CitiesTypes.LOAD_CITIES_BY_REGION_REQUEST:
      return {
        ...state,
        error: null,
      };

    case CitiesTypes.LOAD_CITIES_BY_REGION_SUCCESS:
      return {
        ...state,
        cities: action.payload,
        error: null,
      };

    case CitiesTypes.LOAD_CITIES_BY_REGION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для додавання нового міста
const addReducer = (state = initialCommonState, action: CitiesActions): CommonState => {
  switch (action.type) {
    case CitiesTypes.ADD_CITY_REQUEST:
      return {
        ...state,
        error: null,
      };

    case CitiesTypes.ADD_CITY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case CitiesTypes.ADD_CITY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для зміни міста
const updateReducer = (state = initialCommonState, action: CitiesActions): CommonState => {
  switch (action.type) {
    case CitiesTypes.UPDATE_CITY_REQUEST:
      return {
        ...state,
        error: null,
      };

    case CitiesTypes.UPDATE_CITY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case CitiesTypes.UPDATE_CITY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// редюсер для видалення міста
const deleteReducer = (state = initialCommonState, action: CitiesActions): CommonState => {
  switch (action.type) {
    case CitiesTypes.DELETE_CITY_REQUEST:
      return {
        ...state,
        error: null,
      };

    case CitiesTypes.DELETE_CITY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
      };

    case CitiesTypes.DELETE_CITY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const CitiesReducer = (state = initialCitiesState, action: CitiesActions): CitiesState => {
  switch (action.type) {
    case CitiesTypes.RESET_DATA:
      return initialCitiesState;

    default:
      return {
        data: loadDataReducer(state.data, action),
        dataByRegion: loadDataByRegionReducer(state.dataByRegion, action),
        actions: {
          addCity: addReducer(state.actions.addCity, action),
          updateCity: updateReducer(state.actions.updateCity, action),
          deleteCity: deleteReducer(state.actions.deleteCity, action),
        },
      };
  }
};

export default CitiesReducer;
