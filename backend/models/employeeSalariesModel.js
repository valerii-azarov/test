import { pool } from "../config/db.js";
import { hasEmployeeSalariesQuery, getIsPaidStatusForDateQuery, createEmployeeSalariesQuery, updateEmployeeSalariesQuery, updateIsPaidStatusByEmployeeIdQuery, getEmployeeSalariesQuery, getEmployeeSalariesOffsetQuery, getTotalEmployeeSalariesCountQuery } from "../queries/employeeSalariesQueries.js";

export async function hasEmployeeSalaries(employeeId, date) {
  try {
    const result = await pool.query(hasEmployeeSalariesQuery, [employeeId, date]);
    const count = parseInt(result.rows[0].count, 10);
    return count > 0;
  } catch (error) {
    throw new Error("Під час перевірки наявності запису сталася помилка.");
  }
}

export async function getIsPaidStatusForDate(employeeId, date) {
  try {
    const result = await pool.query(getIsPaidStatusForDateQuery, [employeeId, date]);
    return result.rows[0].is_paid;
  } catch (error) {
    throw new Error("Під час отримання статусу оплати для вказаної дати сталася помилка.");
  }
}

export async function getEmployeeSalaries() {
  try {
    const result = await pool.query(getEmployeeSalariesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання зарплат сталася помилка.");
  }
}

export async function getEmployeeSalariesOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getEmployeeSalariesOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання зарплат сталася помилка.");
  }
}

export async function getTotalEmployeeSalariesCount() {
  try {
    const result = await pool.query(getTotalEmployeeSalariesCountQuery);
    return result.rows[0].count;
  } catch (error) {
    throw new Error("Помилка при отриманні загальної кількості зарплат.");
  }
}

export async function createEmployeeSalaries(employeeId, startPeriod, endPeriod, workedHours, amount, isPaid) {
  try {
    const result = await pool.query(createEmployeeSalariesQuery, [employeeId, startPeriod, endPeriod, workedHours, amount, isPaid]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час створення даних про зарплату сталася помилка.");
  }
}

export async function updateEmployeeSalaries(employeeId, startPeriod, endPeriod, workedHours, amount) {
  try {
    const result = await pool.query(updateEmployeeSalariesQuery, [employeeId, startPeriod, endPeriod, workedHours, amount]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час зміни даних про зарплату сталася помилка.");
  }
}

export async function updateIsPaidStatusByEmployeeId(is_paid, employeeId) {
  try {
    const result = await pool.query(updateIsPaidStatusByEmployeeIdQuery, [is_paid, employeeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час зміни статусу оплати сталася помилка.");
  }
}

export default {
  hasEmployeeSalaries,
  getIsPaidStatusForDate,
  getEmployeeSalaries, 
  getEmployeeSalariesOffset, 
  getTotalEmployeeSalariesCount,
  createEmployeeSalaries,
  updateEmployeeSalaries,
  updateIsPaidStatusByEmployeeId,
};
