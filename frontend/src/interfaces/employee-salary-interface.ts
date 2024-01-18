export interface EmployeeSalary {
  id: number;
  employee_id: number;
  surname: string;
  name: string;
  patronymic: string;
  start_period: string;
  end_period: string;
  worked_hours: number;
  amount: number;
  is_paid: boolean;
}
