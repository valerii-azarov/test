import servicesModel from "../models/servicesModel.js";

async function getServicesHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await servicesModel.getServicesOffset(page, limit);
    } else {
      result = await servicesModel.getServices();
    }

    count = await servicesModel.getTotalServicesCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про послуги відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      services: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні послуг: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні послуг.",
    });
  }
}

async function getServicesByCategoryHandler(req, res) {
  try {
    const categoryId = req.params.id;
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await servicesModel.getServicesByCategoryIdOffset(page, limit, categoryId);
    } else {
      result = await servicesModel.getServicesByCategoryId(categoryId);
    }

    count = await servicesModel.getTotalServicesByCategoryIdCount(categoryId);

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про послуги відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      services: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні послуг: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні послуг.",
    });
  }
}

export {
  getServicesHandler,
  getServicesByCategoryHandler,
};
