import { FaqTypes } from "../actionTypes/faqTypes";
import { FaqActions } from "../actions/faqActions";
import { Faq } from "../../interfaces/faq-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  faq: Faq[];
  totalItems: number;
}

interface FaqState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  faq: [],
  totalItems: 0,
  error: null,
};

const initialFaqState: FaqState = {
  data: initialLoadDataState,
};

// редюсер для завантаження питань та відповідей
const loadDataReducer = (state = initialLoadDataState, action: FaqActions): LoadDataState => {
  switch (action.type) {
    case FaqTypes.LOAD_FAQ_REQUEST:
      return {
        ...state,
        error: null,
      };

    case FaqTypes.LOAD_FAQ_SUCCESS:
      return {
        ...state,
        faq: action.payload.faq,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case FaqTypes.LOAD_FAQ_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const faqReducer = (state = initialFaqState, action: FaqActions): FaqState => {
  switch (action.type) {
    case FaqTypes.RESET_DATA:
      return initialFaqState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default faqReducer;
