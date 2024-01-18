import { pool } from "../config/db.js";
import { getAllRegionsQuery, getRegionsOffsetQuery, getTotalRegionsCountQuery, getRegionByIdQuery, createRegionQuery, updateRegionQuery, deleteRegionQuery } from "../queries/regionsQueries.js";

export async function getAllRegions() {
  try {
    const result = await pool.query(getAllRegionsQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання регіонів сталася помилка.");
  }
}

export async function getRegionsOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getRegionsOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання регіонів сталася помилка.");
  }
}

export async function getTotalRegionsCount() {
  try {
    const result = await pool.query(getTotalRegionsCountQuery);
    return result.rows[0].count;
  } catch (error) {
    throw new Error("Помилка при отриманні загальної кількості регіонів.");
  }
}

export async function getRegionById(regionId) {
  try {
    const result = await pool.query(getRegionByIdQuery, [regionId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання регіону сталася помилка.");
  }
}

export async function createRegion(name) {
  try {
    const result = await pool.query(createRegionQuery, [name]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час створення регіону сталася помилка.");
  }
}

export async function updateRegion(name, regionId) {
  try {
    const result = await pool.query(updateRegionQuery, [name, regionId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час зміни регіону сталася помилка.");
  }
}

export async function deleteRegion(regionId) {
  try {
    const result = await pool.query(deleteRegionQuery, [regionId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час видалення регіону сталася помилка.");
  }
}

export default {
  getAllRegions,
  getRegionsOffset,
  getTotalRegionsCount,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
};
