import newsModel from "../models/newsModel.js";

async function getNewsHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await newsModel.getNewsOffset(page, limit);
    } else {
      result = await newsModel.getNews();
    }

    count = await newsModel.getTotalNewsCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про новини відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      news: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні новин: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні новин.",
    });
  }
}

export { 
  getNewsHandler,
};
