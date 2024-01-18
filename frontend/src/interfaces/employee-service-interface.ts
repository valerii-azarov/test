export interface EmployeeService {
  id: number;
  service_id: number;
  service_name?: string;
  start_time: string;
  end_time: string;
  interval: string;
  day_of_week_id: number;
  office_id?: number;
}
