import { pool } from "../config/db.js";
import { getScheduleByOfficeIdAndServiceIdQuery, getScheduleByOfficeIdAndServiceIdOffsetQuery, getTotalScheduleCountQuery } from "../queries/scheduleQueries.js";
import moment from "moment";

export async function getScheduleByOfficeIdAndServiceId(officeId, serviceId) {
  try {
    const result = await pool.query(getScheduleByOfficeIdAndServiceIdQuery, [officeId, serviceId]);

    const scheduleByDate = {};
    
    result.rows.forEach((row) => {
      const date = moment(row.date).format("YYYY-MM-DD");
      const time = moment(row.time, "HH:mm:ss").format("HH:mm:ss");
      const id = row.id;
      const availability = row.availability;

      if (!scheduleByDate[date]) {
        scheduleByDate[date] = [];
      }

      scheduleByDate[date].push({ id, time, availability });
    });

    return scheduleByDate;
  } catch (error) {
    throw new Error("Під час отримання розкладу за офісом та послугою сталася помилка.");
  }
}

export async function getScheduleByOfficeIdAndServiceIdOffset(page, limit, officeId, serviceId) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getScheduleByOfficeIdAndServiceIdOffsetQuery, [limit, offset, officeId, serviceId]);

    const scheduleByDate = {};
    
    result.rows.forEach((row) => {
      const date = moment(row.date).format("YYYY-MM-DD");
      const time = moment(row.time, "HH:mm:ss").format("HH:mm:ss");
      const id = row.id;
      const availability = row.availability;

      if (!scheduleByDate[date]) {
        scheduleByDate[date] = [];
      }

      scheduleByDate[date].push({ id, time, availability });
    });

    return scheduleByDate;
  } catch (error) {
    throw new Error("Під час отримання розкладу за офісом та послугою сталася помилка.");
  }
}

export async function getTotalScheduleCount(officeId, serviceId) {
  try {
    const result = await pool.query(getTotalScheduleCountQuery, [officeId, serviceId]);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Під час отримання загальної кількості записів за офісом та послугою сталася помилка.");
  }
}

export default {
  getScheduleByOfficeIdAndServiceId,
  getScheduleByOfficeIdAndServiceIdOffset,
  getTotalScheduleCount,
};
