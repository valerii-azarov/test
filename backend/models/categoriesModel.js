import { pool } from "../config/db.js";
import { getCategoriesQuery, getCategoriesOffsetQuery, getTotalCategoriesCountQuery } from "../queries/categoriesQueries.js";

export async function getCategories() {
  try {
    const result = await pool.query(getCategoriesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання категорій сталася помилка.");
  }
}

export async function getCategoriesOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getCategoriesOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання категорій сталася помилка.");
  }
}

export async function getTotalCategoriesCount() {
  try {
    const result = await pool.query(getTotalCategoriesCountQuery,);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості категорій сталася помилка.");
  }
}

export default {
  getCategories,
  getCategoriesOffset,
  getTotalCategoriesCount,
};
