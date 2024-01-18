import { ScheduleTypes } from "../actionTypes/scheduleTypes";
import { ScheduleActions } from "../actions/scheduleActions";
import { Schedule } from "../../interfaces/schedule-interface";

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  schedule: Schedule;
  totalItems: number;
}

interface ScheduleState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  schedule: {},
  totalItems: 0,
  error: null,
};

const initialScheduleState: ScheduleState = {
  data: initialLoadDataState,
};

// редюсер для завантаження розкладу
const loadDataReducer = (state = initialLoadDataState, action: ScheduleActions): LoadDataState => {
  switch (action.type) {
    case ScheduleTypes.LOAD_SCHEDULE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case ScheduleTypes.LOAD_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.payload.schedule,
        totalItems: action.payload.totalItems,
        error: null,
      };

    case ScheduleTypes.LOAD_SCHEDULE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const scheduleReducer = (state = initialScheduleState, action: ScheduleActions): ScheduleState => {
  switch (action.type) {
    case ScheduleTypes.RESET_DATA:
      return initialScheduleState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default scheduleReducer;
