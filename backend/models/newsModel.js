import { pool } from "../config/db.js";
import { getNewsQuery, getNewsOffsetQuery, getTotalNewsCountQuery } from "../queries/newsQueries.js";

export async function getNews() {
  try {
    const result = await pool.query(getNewsQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання новин сталася помилка.");
  }
}

export async function getNewsOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getNewsOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання новин сталася помилка.");
  }
}

export async function getTotalNewsCount() {
  try {
    const result = await pool.query(getTotalNewsCountQuery);
    return result.rows[0].count;
  } catch (error) {
    throw new Error("Помилка при отриманні загальної кількості новин.");
  }
}

export default {
  getNews,
  getNewsOffset,
  getTotalNewsCount,
};
