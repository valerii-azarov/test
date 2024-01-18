import { pool } from "../config/db.js";
import { getEmployeeServicesByEmployeeIdQueries, getEmployeeServicesByEmployeeIdOffsetQuery, getTotalServicesByEmployeeIdCountQuery } from "../queries/employeeServicesQueries.js";

export async function getEmployeeServicesByEmployeeId(employeeId) {
  try {
    const result = await pool.query(getEmployeeServicesByEmployeeIdQueries, [employeeId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання послуг співробітників сталася помилка.");
  }
}

export async function getEmployeeServicesByEmployeeIdOffset(page, limit, employeeId) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getEmployeeServicesByEmployeeIdOffsetQuery, [limit, offset, employeeId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання послуг співробітників сталася помилка.");
  }
}

export async function getTotalServicesByEmployeeIdCount(employeeId) {
  try {
    const result = await pool.query(getTotalServicesByEmployeeIdCountQuery, [employeeId]);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості послуг співробітників сталася помилка.");
  }
}

export default {
  getEmployeeServicesByEmployeeId,
  getEmployeeServicesByEmployeeIdOffset,
  getTotalServicesByEmployeeIdCount,
};
