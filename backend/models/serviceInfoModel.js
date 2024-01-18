import { pool } from "../config/db.js";
import { getServiceInfoQuery, getServiceInfoOffsetQuery, getTotalServiceInfoCountQuery } from "../queries/serviceInfoQueries.js";

export async function getServiceInfo() {
  try {
    const result = await pool.query(getServiceInfoQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання інформації про послуги сталася помилка.");
  }
}

export async function getServiceInfoOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getServiceInfoOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання інформації про послуги сталася помилка.");
  }
}

export async function getTotalServiceInfoCount() {
  try {
    const result = await pool.query(getTotalServiceInfoCountQuery);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості інформації про послуги сталася помилка.");
  }
}

export default {
  getServiceInfo,
  getServiceInfoOffset,
  getTotalServiceInfoCount,
};
