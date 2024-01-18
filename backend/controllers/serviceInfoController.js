import serviceInfoModel from "../models/serviceInfoModel.js";

async function getServiceInfoHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await serviceInfoModel.getServiceInfoOffset(page, limit);
    } else {
      result = await serviceInfoModel.getServiceInfo();
    }

    count = await serviceInfoModel.getTotalServiceInfoCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про інформацію про послуги відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      serviceInfo: result,
    });
  } catch (error) {
    console.error("Помилка при отриманні інформації про послуги: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні інформації про послуги.",
    });
  }
}

export {
  getServiceInfoHandler,
};
