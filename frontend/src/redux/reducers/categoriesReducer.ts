import { CategoriesTypes } from "../actionTypes/categoriesTypes";
import { CategoriesActions } from "../actions/categoriesActions";
import { Category } from "../../interfaces/category-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  categories: Category[];
  totalItems: number;
}

interface CategoriesState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  categories: [],
  totalItems: 0,
  error: null,
};

const initialCategoriesState: CategoriesState = {
  data: initialLoadDataState,
};

// редюсер для завантаження категорій
const loadDataReducer = (state = initialLoadDataState, action: CategoriesActions): LoadDataState => {
  switch (action.type) {
    case CategoriesTypes.LOAD_CATEGORIES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case CategoriesTypes.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case CategoriesTypes.LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const categoriesReducer = (state = initialCategoriesState, action: CategoriesActions): CategoriesState => {
  switch (action.type) {
    case CategoriesTypes.RESET_DATA:
      return initialCategoriesState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default categoriesReducer;
