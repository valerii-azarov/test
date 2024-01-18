import faqModel from "../models/faqModel.js";

async function getFaqHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await faqModel.getFaqOffset(page, limit);
    } else {
      result = await faqModel.getFaq();
    }

    count = await faqModel.getTotalFaqCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про питання та відповіді відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      faq: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні питань та відповідей: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні питань та відповідей.",
    });
  }
}

export { 
  getFaqHandler,
};
