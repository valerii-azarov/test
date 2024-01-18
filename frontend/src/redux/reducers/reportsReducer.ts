import { ReportsTypes } from "../actionTypes/reportsTypes";
import { ReportsActions } from "../actions/reportsActions";
import { Report, TotalReports } from "../../interfaces/reports-interface"; 

interface CommonState {
  message?: string | null;
  error: string | null;
}

interface LoadDataState extends CommonState {
  isPaid: boolean;
  totalReports: TotalReports;
  dailyReports: Report[];
}

interface ReportsState {
  data: LoadDataState;
}

const initialLoadDataState: LoadDataState = {
  isPaid: false,
  totalReports: {
    totalBookings: 0,
    totalWorkedHours: 0,
    totalSalaryWithoutTax: 0,
    vatFromTotalSalary: 0,
    totalSalaryWithTax: 0,
  },
  dailyReports: [],
  error: null,
};

const initialReportsState: ReportsState = {
  data: initialLoadDataState,
};

// редюсер для завантаження звіту
const loadDataReducer = (state = initialLoadDataState, action: ReportsActions): LoadDataState => {
  switch (action.type) {
    case ReportsTypes.LOAD_REPORTS_REQUEST:
      return {
        ...state,
        error: null,
      };

    case ReportsTypes.LOAD_REPORTS_SUCCESS:
      return {
        ...state,
        isPaid: action.payload.isPaid,
        totalReports: action.payload.totalReports,
        dailyReports: action.payload.dailyReports,
        error: null,
      };

    case ReportsTypes.LOAD_REPORTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// основний редюсер, який об'єднує всі стани
const reportsReducer = (state = initialReportsState, action: ReportsActions): ReportsState => {
  switch (action.type) {
    case ReportsTypes.RESET_DATA:
      return initialReportsState;

    default:
      return {
        data: loadDataReducer(state.data, action),
      };
  }
};

export default reportsReducer;
