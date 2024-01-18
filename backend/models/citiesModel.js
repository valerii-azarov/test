import { pool } from "../config/db.js";
import { getAllCitiesQuery, getCitiesOffsetQuery, getTotalCitiesCountQuery, getCitiesByRegionIdQuery, getCityByIdQuery, createCityQuery, updateCityQuery, deleteCityQuery } from "../queries/citiesQueries.js";

export async function getAllCities() {
  try {
    const result = await pool.query(getAllCitiesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання міст сталася помилка.");
  }
}

export async function getCitiesOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getCitiesOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання міст сталася помилка.");
  }
}

export async function getTotalCitiesCount() {
  try {
    const result = await pool.query(getTotalCitiesCountQuery);
    return result.rows[0].count;
  } catch (error) {
    throw new Error("Помилка при отриманні загальної кількості міст.");
  }
}

export async function getCitiesByRegionId(regionId) {
  try {
    const result = await pool.query(getCitiesByRegionIdQuery, [regionId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання міста області сталася помилка.");
  }
}

export async function getCityById(cityId) {
  try {
    const result = await pool.query(getCityByIdQuery, [cityId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання міста сталася помилка.");
  }
}

export async function createCity(name, regionId, statusId) {
  try {
    const result = await pool.query(createCityQuery, [name, regionId, statusId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час створення міста сталася помилка.");
  }
}

export async function updateCity(name, regionId, statusId, cityId) {
  try {
    const result = await pool.query(updateCityQuery, [name, regionId, statusId, cityId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час зміни міста сталася помилка.");
  }
}

export async function deleteCity(cityId) {
  try {
    const result = await pool.query(deleteCityQuery, [cityId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час видалення регіону сталася помилка.");
  }
}

export default {
  getAllCities,
  getCitiesOffset, 
  getTotalCitiesCount,
  getCitiesByRegionId,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
};
