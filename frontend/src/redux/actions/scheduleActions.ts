import { ScheduleTypes } from "../actionTypes/scheduleTypes";
import { Schedule } from "../../interfaces/schedule-interface"; 

export type ScheduleActions =
  // завантаження розкладу
  | { type: ScheduleTypes.LOAD_SCHEDULE_REQUEST }
  | { type: ScheduleTypes.LOAD_SCHEDULE_SUCCESS; payload: { schedule: Schedule, totalItems: number } }
  | { type: ScheduleTypes.LOAD_SCHEDULE_FAILURE; payload: string }
  // скидання даних
  | { type: ScheduleTypes.RESET_DATA };
