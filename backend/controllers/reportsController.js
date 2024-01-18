import moment from "moment";
import reportsModel from "../models/reportsModel.js";
import employeeSalariesModel from "../models/employeeSalariesModel.js";
import calculateDailySalary from "../functions/calculateDailySalary.js";

async function getReportsByEmployeeIdHandler(req, res) {
  try {
    const employeeId = req.params.id;

    const currentDate = moment();
    const startOfMonth = moment(currentDate).startOf('month');

    const dailyReports = {};
    let totalReports = {
      totalBookings: 0,
      totalWorkedHours: 0,
      totalSalaryWithoutTax: 0,
      vatFromTotalSalary: 0,
      totalSalaryWithTax: 0,
    };

    for (let day = 1; day <= currentDate.date(); day++) {
      const date = moment(currentDate).date(day);
      
      const totalBookings = await reportsModel.getTotalBookingCount(employeeId, date.format('YYYY-MM-DD'));
      const totalWorkedHours = await reportsModel.getTotalWorkedHours(employeeId, date.format('YYYY-MM-DD'));

      const dailySalaryInfo = calculateDailySalary(totalBookings, totalWorkedHours);

      Object.entries(dailySalaryInfo).forEach(([key, value]) => {
        totalReports[key] += value;
      });

      dailyReports[date.format('YYYY-MM-DD')] = dailySalaryInfo;
    }

    const isPaidStatus = await employeeSalariesModel.getIsPaidStatusForDate(employeeId, startOfMonth.format('YYYY-MM-DD'));

    const hasRecordForCurrentMonth = await employeeSalariesModel.hasEmployeeSalaries(employeeId, startOfMonth.format('YYYY-MM-DD'));

    if (!hasRecordForCurrentMonth) {
      await employeeSalariesModel.createEmployeeSalaries(employeeId, startOfMonth.format('YYYY-MM-DD'), startOfMonth.endOf('month').format('YYYY-MM-DD'), totalReports.totalWorkedHours, totalReports.totalSalaryWithTax, false);
    } else {
      const existingRecord = await employeeSalariesModel.updateEmployeeSalaries(employeeId, startOfMonth.format('YYYY-MM-DD'), startOfMonth.endOf('month').format('YYYY-MM-DD'), totalReports.totalWorkedHours, totalReports.totalSalaryWithTax);

      if (existingRecord === 0) {
        await employeeSalariesModel.createEmployeeSalaries(employeeId, startOfMonth.format('YYYY-MM-DD'), startOfMonth.endOf('month').format('YYYY-MM-DD'), totalReports.totalWorkedHours, totalReports.totalSalaryWithTax, false);
      }
    }

    return res.status(200).json({
      isPaid: isPaidStatus,
      totalReports,
      dailyReports,
    });
  } catch (error) {
    console.error("Помилка при отриманні звітів: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні звітів.",
    });
  }
}

export {
  getReportsByEmployeeIdHandler,
};
