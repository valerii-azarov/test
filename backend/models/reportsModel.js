import { pool } from "../config/db.js";
import { getTotalBookingCountQuery, getTotalWorkedHoursQuery } from "../queries/reportsQueries.js";

export async function getTotalBookingCount(employeeId, date) {
  try {
    const result = await pool.query(getTotalBookingCountQuery, [employeeId, date]);
    return result.rows[0].total_bookings;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості заявок сталася помилка.");
  }
}

export async function getTotalWorkedHours(employeeId, date) {
  try {
    const result = await pool.query(getTotalWorkedHoursQuery, [employeeId, date]);
    return result.rows[0].total_worked_hours;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості відпрацьованих годин сталася помилка.");
  }
}

export default {
  getTotalBookingCount,
  getTotalWorkedHours,
};
