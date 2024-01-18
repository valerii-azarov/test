

const calculateDailySalary = (totalBookings, totalWorkedMinutes) => {
  const fixedMonthlySalary = 10000;
  const vatRate = 0.2;

  const totalWorkedHours = totalWorkedMinutes / 60;
  const hourlyRate = (fixedMonthlySalary * 12) / 1987;
  const dailySalary = hourlyRate * totalWorkedHours;

  const totalSalaryWithoutTax = totalWorkedMinutes > 0 ? dailySalary : 0;

  const vatFromTotalSalary = (totalSalaryWithoutTax / (1 + vatRate)) * vatRate;

  const totalSalaryWithTax = totalSalaryWithoutTax + vatFromTotalSalary;

  return {
    totalBookings,
    totalWorkedHours,
    totalSalaryWithoutTax,
    vatFromTotalSalary,
    totalSalaryWithTax,
  };
};

export default calculateDailySalary;
