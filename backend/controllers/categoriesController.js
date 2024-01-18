import categoryModel from "../models/categoriesModel.js";

async function getCategoriesHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await categoryModel.getCategoriesOffset(page, limit);
    } else {
      result = await categoryModel.getCategories();
    }

    count = await categoryModel.getTotalCategoriesCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про категорії відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      categories: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні категорій: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні категорій.",
    });
  }
}

export { 
  getCategoriesHandler,
};
