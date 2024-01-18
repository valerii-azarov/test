import { pool } from "../config/db.js";
import { getServicesQuery, getServicesOffsetQuery, getServicesByCategoryIdQuery, getServicesByCategoryIdOffsetQuery, getTotalServicesCountQuery, getTotalServicesByCategoryIdCountQuery } from "../queries/servicesQueries.js";

export async function getServices() {
  try {
    const result = await pool.query(getServicesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання послуг сталася помилка.");
  }
}

export async function getServicesOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getServicesOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання послуг сталася помилка.");
  }
}

export async function getServicesByCategoryId(categoryId) {
  try {
    const result = await pool.query(getServicesByCategoryIdQuery, [categoryId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання послуг сталася помилка.");
  }
}

export async function getServicesByCategoryIdOffset(page, limit, categoryId) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getServicesByCategoryIdOffsetQuery, [limit, offset, categoryId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання послуг сталася помилка.");
  }
}

export async function getTotalServicesCount() {
  try {
    const result = await pool.query(getTotalServicesCountQuery);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості послуг сталася помилка.");
  }
}

export async function getTotalServicesByCategoryIdCount(categoryId) {
  try {
    const result = await pool.query(getTotalServicesByCategoryIdCountQuery, [categoryId]);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості послуг сталася помилка.");
  }
}

export default {
  getServices,
  getServicesOffset,
  getServicesByCategoryId,
  getServicesByCategoryIdOffset,
  getTotalServicesCount,
  getTotalServicesByCategoryIdCount,
};
