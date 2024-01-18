import { pool } from "../config/db.js";
import { getAllBookingsQuery, getBookingsOffsetQuery, getTotalCountQuery, getStatusCountQuery } from "../queries/bookingQueries.js";

export async function getAllBookings() {
  try {
    const result = await pool.query(getAllBookingsQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання всіх заявок сталася помилка.");
  }
}

export async function getBookingsOffset(page, limit, employeeId) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getBookingsOffsetQuery, [limit, offset, employeeId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання заявок сталася помилка.");
  }
}

export async function getTotalCount(employeeId) {
  try {
    const result = await pool.query(getTotalCountQuery, [employeeId]);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості записів сталася помилка.");
  }
}

export async function getStatusCount(employeeId) {
  try {
    const result = await pool.query(getStatusCountQuery, [employeeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання кількості записів за статусами сталася помилка.");
  }
}

export default {
  getAllBookings,
  getBookingsOffset,
  getTotalCount,
  getStatusCount,
};
