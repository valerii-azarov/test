import { NewsTypes } from "../actionTypes/newsTypes";
import { NewsActions } from "../actions/newsActions";
import { News } from "../../interfaces/news-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  news: News[];
  totalItems: number;
}

interface NewsState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  news: [],
  totalItems: 0,
  error: null,
};

const initialNewsState: NewsState = {
  data: initialLoadDataState,
};

// редюсер для завантаження новин
const loadDataReducer = (state = initialLoadDataState, action: NewsActions): LoadDataState => {
  switch (action.type) {
    case NewsTypes.LOAD_NEWS_REQUEST:
      return {
        ...state,
        error: null,
      };

    case NewsTypes.LOAD_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload.news,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case NewsTypes.LOAD_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const newsReducer = (state = initialNewsState, action: NewsActions): NewsState => {
  switch (action.type) {
    case NewsTypes.RESET_DATA:
      return initialNewsState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default newsReducer;
