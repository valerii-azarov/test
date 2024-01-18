import officesModel from "../models/officesModel.js";

async function getAllOfficesHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await officesModel.getOfficesOffset(page, limit);
    } else {
      result = await officesModel.getAllOffices();
    }

    count = await officesModel.getTotalOfficesCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про офіси відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      offices: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні офісів: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні офісів.",
    });
  }
}

async function getOfficesByCityIdHandler(req, res) {
  try {
    const cityId = req.params.id;

    const offices = await officesModel.getOfficesByCityId(cityId);

    if (!offices || offices.length === 0) {
      return res.status(404).json({
        message: "Місто не знайдено.",
      });
    }

    return res.status(200).json(offices);
  } catch (error) {
    console.error("Помилка при отриманні офісів міста: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні офісів міста.",
    });
  }
}

async function getOfficeByIdHandler(req, res) {
  try {
    const officeId = req.params.id;

    const office = await officesModel.getOfficeById(officeId);

    if (!office) {
      return res.status(404).json({
        message: "Офіс не знайдено.",
      });
    }

    return res.status(200).json(office);
  } catch (error) {
    console.error("Помилка при отриманні офісу: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні офісу.",
    });
  }
}

async function createOfficeHandler(req, res) {
  try {
    const { name, address, cityId, statusId } = req.body;

    const newOffice = await officesModel.createOffice(name, address, cityId, statusId);
    
    return res.status(201).json({
      message: "Офіс успішно створено.",
      data: newOffice,
    });
  } catch (error) {
    console.error("Помилка при створенні офісу: ", error.message);
    return res.status(500).json({
      message: "Помилка при створенні офісу. Спробуйте ще раз.",
    });
  }
}

async function updateOfficeHandler(req, res) {
  try {
    const officeId = req.params.id;
    const { name, address, cityId, statusId } = req.body;

    const updatedOffice = await officesModel.updateOffice(name, address, cityId, statusId, officeId);

    if (!updatedOffice) {
      return res.status(404).json({
        message: "Офіс не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Офіс успішно змінено.",
      data: updatedOffice,
    });
  } catch (error) {
    console.error("Помилка при зміни офісу: ", error.message);
    return res.status(500).json({
      message: "Помилка при зміни офісу. Спробуйте ще раз.",
    });
  }
}

async function deleteOfficeHandler(req, res) {
  try {
    const officeId = req.params.id;

    const deletedOffice = await officesModel.deleteOffice(officeId);

    if (!deletedOffice) {
      return res.status(404).json({
        message: "Офіс не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Офіс успішно видалено.",
      data: deletedOffice,
    });
  } catch (error) {
    console.error("Помилка при видаленні офісу: ", error.message);
    return res.status(500).json({
      message: "Помилка при видаленні офісу. Спробуйте ще раз.",
    });
  }
}

export {
  getAllOfficesHandler,
  getOfficesByCityIdHandler,
  getOfficeByIdHandler,
  createOfficeHandler,
  updateOfficeHandler,
  deleteOfficeHandler,
};
