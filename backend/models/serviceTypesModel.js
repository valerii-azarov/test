import { pool } from "../config/db.js";
import { getServiceTypesQuery, getServiceTypesOffsetQuery, getServiceTypesByServiceIdQuery, getServiceTypesByServiceIdOffsetQuery, getTotalServiceTypesCountQuery, getTotalServiceTypesByServiceIdCountQuery } from "../queries/serviceTypesQueries.js";

export async function getServiceTypes() {
  try {
    const result = await pool.query(getServiceTypesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання видів послуги сталася помилка.");
  }
}

export async function getServiceTypesOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getServiceTypesOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання видів послуги сталася помилка.");
  }
}

export async function getServiceTypesByServiceId(serviceId) {
  try {
    const result = await pool.query(getServiceTypesByServiceIdQuery, [serviceId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання видів послуги сталася помилка.");
  }
}

export async function getServiceTypesByServiceIdOffset(page, limit, serviceId) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getServiceTypesByServiceIdOffsetQuery, [limit, offset, serviceId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання видів послуги сталася помилка.");
  }
}

export async function getTotalServiceTypesCount() {
  try {
    const result = await pool.query(getTotalServiceTypesCountQuery);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості видів послуги сталася помилка.");
  }
}

export async function getTotalServiceTypesByServiceIdCount(serviceId) {
  try {
    const result = await pool.query(getTotalServiceTypesByServiceIdCountQuery, [serviceId]);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості видів послуги сталася помилка.");
  }
}

export default {
  getServiceTypes,
  getServiceTypesOffset,
  getServiceTypesByServiceId,
  getServiceTypesByServiceIdOffset,
  getTotalServiceTypesCount,
  getTotalServiceTypesByServiceIdCount,
};
