import { ReportsTypes } from "../actionTypes/reportsTypes";
import { Report, TotalReports } from "../../interfaces/reports-interface"; 

export type ReportsActions =
  // завантаження звіту
  | { type: ReportsTypes.LOAD_REPORTS_REQUEST }
  | { type: ReportsTypes.LOAD_REPORTS_SUCCESS; payload: { isPaid: boolean, totalReports: TotalReports, dailyReports: Report[] } }
  | { type: ReportsTypes.LOAD_REPORTS_FAILURE; payload: string }
  // скидання даних
  | { type: ReportsTypes.RESET_DATA };
