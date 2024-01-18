import citiesModel from "../models/citiesModel.js";

async function getAllCitiesHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await citiesModel.getCitiesOffset(page, limit);
    } else {
      result = await citiesModel.getAllCities();
    }

    count = await citiesModel.getTotalCitiesCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про міста відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      cities: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні міст: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні міст.",
    });
  }
}

async function getCitiesByRegionIdHandler(req, res) {
  try {
    const regionId = req.params.id;

    const cities = await citiesModel.getCitiesByRegionId(regionId);

    if (!cities || cities.length === 0) {
      return res.status(404).json({
        message: "Регіон не знайдено.",
      });
    }

    return res.status(200).json(cities);
  } catch (error) {
    console.error("Помилка при отриманні міст області: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні міст області.",
    });
  }
}

async function getCityByIdHandler(req, res) {
  try {
    const cityId  = req.params.id;

    const city = await citiesModel.getCityById(cityId);

    if (!city) {
      return res.status(404).json({
        message: "Місто не знайдено.",
      });
    }

    return res.status(200).json(city);
  } catch (error) {
    console.error("Помилка при отриманні міста: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні міста.",
    });
  }
}

async function createCityHandler(req, res) {
  try {
    const { name, regionId, statusId } = req.body;

    const newCity = await citiesModel.createCity(name, regionId, statusId);

    return res.status(201).json({
      message: "Місто успішно створено.",
      data: newCity,
    });
  } catch (error) {
    logger.error("Помилка при створенні міста: ", error.message);
    return res.status(500).json({
      message: "Помилка при створенні міста. Спробуйте ще раз.",
    });
  }
}

async function updateCityHandler(req, res) {
  try {
    const cityId = req.params.id;
    const { name, regionId: newRegionId, statusId } = req.body;

    const updatedCity = await citiesModel.updateCity(name, newRegionId, statusId, cityId);

    if (!updatedCity) {
      return res.status(404).json({
        message: "Місто не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Місто успішно змінено.",
      data: updatedCity,
    });
  } catch (error) {
    logger.error("Помилка при зміни міста: ", error.message);
    return res.status(500).json({
      message: "Помилка при зміни міста. Спробуйте ще раз.",
    });
  }
}

async function deleteCityHandler(req, res) {
  try {
    const cityId = req.params.id;

    const deletedCity = await citiesModel.deleteCity(cityId);

    if (!deletedCity) {
      return res.status(404).json({
        message: "Місто не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Місто успішно видалено.",
      data: deletedCity,
    });
  } catch (error) {
    console.error("Помилка при видаленні міста: ", error.message);
    return res.status(500).json({
      message: "Помилка при видаленні міста. Спробуйте ще раз.",
    });
  }
}

export { 
  getAllCitiesHandler,
  getCitiesByRegionIdHandler,
  getCityByIdHandler,
  createCityHandler,
  updateCityHandler,
  deleteCityHandler,
};
