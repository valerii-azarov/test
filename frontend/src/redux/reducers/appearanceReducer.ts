import { AppearanceTypes } from "../actionTypes/appearanceTypes";
import { AppearanceActions } from "../actions/appearanceActions";
import { Appearance } from "../../interfaces/appearance-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  appearance: Appearance;
}

interface AppearanceState {
  data: LoadDataState;
}

const defaultAppearance: Appearance = {
  background: "#d8f5a2",
  text: "Всеукраїнський",
  welcome: "Ласкаво просимо до України",
  image: "default.png",
};

const storedAppearance = localStorage.getItem("appearance");
const parsedAppearance = storedAppearance ? JSON.parse(storedAppearance) : null;

const initialLoadDataState: LoadDataState = {
  appearance: parsedAppearance || defaultAppearance,
  error: null,
};

const initialAppearanceState: AppearanceState = {
  data: initialLoadDataState,
};

// редюсер для завантаження налаштування
const loadDataReducer = (state = initialLoadDataState, action: AppearanceActions): LoadDataState => {
  switch (action.type) {
    case AppearanceTypes.LOAD_APPEARANCE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case AppearanceTypes.LOAD_APPEARANCE_SUCCESS:
      return {
        ...state,
        appearance: action.payload,
        error: null,
      };

    case AppearanceTypes.LOAD_APPEARANCE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const appearanceReducer = (state = initialAppearanceState, action: AppearanceActions): AppearanceState => {
  switch (action.type) {
    case AppearanceTypes.RESET_DATA:
      return initialAppearanceState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default appearanceReducer;
