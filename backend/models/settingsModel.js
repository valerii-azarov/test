import { pool } from "../config/db.js";
import { getAppearanceByCityIdQuery } from "../queries/settingsQueries.js";

export async function getAppearanceByCityId(cityId) {
  try {
    const result = await pool.query(getAppearanceByCityIdQuery, [cityId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання даних сталася помилка.");
  }
}

export default {
  getAppearanceByCityId,
};
