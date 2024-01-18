import { pool } from "../config/db.js";
import { getFaqQuery, getFaqOffsetQuery, getTotalFaqCountQuery } from "../queries/faqQueries.js";

export async function getFaq() {
  try {
    const result = await pool.query(getFaqQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання питань та відповідей сталася помилка.");
  }
}

export async function getFaqOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getFaqOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання питань та відповідей сталася помилка.");
  }
}

export async function getTotalFaqCount() {
  try {
    const result = await pool.query(getTotalFaqCountQuery);
    return result.rows[0].count;
  } catch (error) {
    throw new Error("Помилка при отриманні загальної кількості питань та відповідей.");
  }
}

export default {
  getFaq,
  getFaqOffset,
  getTotalFaqCount,
};
