import serviceTypesModel from "../models/serviceTypesModel.js";

async function getServiceTypesHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await serviceTypesModel.getServiceTypesOffset(page, limit);
    } else {
      result = await serviceTypesModel.getServiceTypes();
    }

    count = await serviceTypesModel.getTotalServiceTypesCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про види послуги відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      serviceTypes: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні видів послуги: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні видів послуги.",
    });
  }
}

async function getServiceTypesByServiceIdHandler(req, res) {
  try {
    const serviceId = req.params.id;
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await serviceTypesModel.getServiceTypesByServiceIdOffset(page, limit, serviceId);
    } else {
      result = await serviceTypesModel.getServiceTypesByServiceId(serviceId);
    }

    count = await serviceTypesModel.getTotalServiceTypesCount(serviceId);

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про види послуги відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      serviceTypes: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні видів послуги: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні видів послуги.",
    });
  }
}

export {
  getServiceTypesHandler,
  getServiceTypesByServiceIdHandler,
};
