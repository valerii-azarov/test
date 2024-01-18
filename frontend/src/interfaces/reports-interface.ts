export interface Report {
  id: number;
  date: string;
  totalBookings: number;
  totalWorkedHours: number;
  totalSalaryWithoutTax: number;
  vatFromTotalSalary: number;
  totalSalaryWithTax: number;
}

export interface TotalReports {
  totalBookings: number;
  totalWorkedHours: number;
  totalSalaryWithoutTax: number;
  vatFromTotalSalary: number;
  totalSalaryWithTax: number;
}
