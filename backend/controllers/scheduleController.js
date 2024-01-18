import scheduleModel from "../models/scheduleModel.js";

async function getScheduleByOfficeIdAndServiceIdHandler(req, res) {
  try {
    const { officeId, serviceId } = req.params;
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await scheduleModel.getScheduleByOfficeIdAndServiceIdOffset(page, limit, officeId, serviceId);
    } else {
      result = await scheduleModel.getScheduleByOfficeIdAndServiceId(officeId, serviceId);
    }

    count = await scheduleModel.getTotalScheduleCount(officeId, serviceId);

    if (!Object.keys(result).length) {
      return res.status(404).json({
        message: "Дані про розклад відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      schedule: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні розкладу: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні розкладу.",
    });
  }
}

export { 
  getScheduleByOfficeIdAndServiceIdHandler,
};
