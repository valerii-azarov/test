import { pool } from "../config/db.js";
import { getAllOfficesQuery, getOfficesOffsetQuery, getTotalOfficesCountQuery, getOfficesByCityIdQuery, getOfficeByIdQuery, createOfficeQuery, updateOfficeQuery, deleteOfficeQuery } from "../queries/officesQueries.js";

export async function getAllOffices() {
  try {
    const result = await pool.query(getAllOfficesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання офісів сталася помилка.");
  }
}

export async function getOfficesOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getOfficesOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання офісів сталася помилка.");
  }
}

export async function getTotalOfficesCount() {
  try {
    const result = await pool.query(getTotalOfficesCountQuery);
    return result.rows[0].count;
  } catch (error) {
    throw new Error("Помилка при отриманні загальної кількості офісів.");
  }
}

export async function getOfficesByCityId(cityId) {
  try {
    const result = await pool.query(getOfficesByCityIdQuery, [cityId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання офісів міста сталася помилка.");
  }
}

export async function getOfficeById(officeId) {
  try {
    const result = await pool.query(getOfficeByIdQuery, [officeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання офісу сталася помилка.");
  }
}

export async function createOffice(name, address, cityId, statusId) {
  try {
    const result = await pool.query(createOfficeQuery, [name, address, cityId, statusId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час створення офісу сталася помилка.");
  }
}

export async function updateOffice(name, address, cityId, statusId, officeId) {
  try {
    const result = await pool.query(updateOfficeQuery, [name, address, cityId, statusId, officeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час зміни офісу сталася помилка.");
  }
}

export async function deleteOffice(officeId) {
  try {
    const result = await pool.query(deleteOfficeQuery, [officeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час видалення офісу сталася помилка.");
  }
}

export default {
    getAllOffices,
    getOfficesOffset,
    getTotalOfficesCount,
    getOfficesByCityId,
    getOfficeById,
    createOffice,
    updateOffice,
    deleteOffice,
  };
