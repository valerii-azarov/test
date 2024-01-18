import regionsModel from "../models/regionsModel.js";

async function getAllRegionsHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await regionsModel.getRegionsOffset(page, limit);
    } else {
      result = await regionsModel.getAllRegions();
    }

    count = await regionsModel.getTotalRegionsCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про регіони відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      regions: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні регіонів: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні регіонів.",
    });
  }
}

async function getRegionByIdHandler(req, res) {
  try {
    const regionId = req.params.id;

    const region = await regionsModel.getRegionById(regionId);

    if (!region) {
      return res.status(404).json({
        message: "Регіон не знайдено.",
      });
    }

    return res.status(200).json(region);
  } catch (error) {
    logger.error("Помилка при отриманні регіону: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні регіону.",
    });
  }
}

async function createRegionHandler(req, res) {
  try {
    const { name } = req.body;

    const newRegion = await regionsModel.createRegion(name);

    return res.status(201).json({
      message: "Регіон успішно створено.",
      data: newRegion,
    });
  } catch (error) {
    logger.error("Помилка при створенні регіону: ", error.message);
    return res.status(500).json({
      message: "Помилка при створенні регіону. Спробуйте ще раз.",
    });
  }
}

async function updateRegionHandler(req, res) {
  try {
    const regionId = req.params.id;
    const { name } = req.body;

    const updatedRegion = await regionsModel.updateRegion(name, regionId);

    if (!updatedRegion) {
      return res.status(404).json({
        message: "Регіон не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Регіон успішно змінено.",
      data: updatedRegion,
    });
  } catch (error) {
    logger.error("Помилка при зміни регіону: ", error.message);
    return res.status(500).json({
      message: "Помилка при зміни регіону. Спробуйте ще раз.",
    });
  }
}

async function deleteRegionHandler(req, res) {
  const regionId = req.params.id;

  try {
    const deletedRegion = await regionsModel.deleteRegion(regionId);

    if (!deletedRegion) {
      return res.status(404).json({
        message: "Регіон не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Регіон успішно видалено.",
      data: deletedRegion,
    });
  } catch (error) {
    logger.error("Помилка при видаленні регіону: ", error.message);
    return res.status(500).json({
      message: "Помилка при видаленні регіону. Спробуйте ще раз.",
    });
  }
}

export { 
  getAllRegionsHandler,
  getRegionByIdHandler,
  createRegionHandler,
  updateRegionHandler,
  deleteRegionHandler,
};
