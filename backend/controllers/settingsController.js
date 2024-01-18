import settingsModel from "../models/settingsModel.js";

async function getAppearanceByCityIdHandler(req, res) {
  try {
    const cityId = req.params.id;

    const appearance = await settingsModel.getAppearanceByCityId(cityId);

    if (!appearance) {
      return res.status(404).json({
        message: "Дані про налаштування відсутні для вказаного міста.",
      });
    }

    return res.status(200).json(appearance);
  } catch (error) {
    logger.error("Помилка при отриманні даних: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні даних.",
    });
  }
}

export { 
  getAppearanceByCityIdHandler,
};
