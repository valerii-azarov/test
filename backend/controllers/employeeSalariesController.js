import employeeSalariesModel from "../models/employeeSalariesModel.js";

async function getEmployeeSalariesHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await employeeSalariesModel.getEmployeeSalariesOffset(page, limit);
    } else {
      result = await employeeSalariesModel.getEmployeeSalaries();
    }

    count = await employeeSalariesModel.getTotalEmployeeSalariesCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про зарплати відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      employeeSalaries: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні зарплат: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні зарплат.",
    });
  }
}

async function updateIsPaidStatusHandler(req, res) {
  try {
    const employeeId = req.params.id;
    const { is_paid } = req.body;

    const updatedIsPaidStatus = await employeeSalariesModel.updateIsPaidStatusByEmployeeId(is_paid, employeeId);

    if (!updatedIsPaidStatus) {
      return res.status(404).json({
        message: "Запис не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Статус оплати успішно змінено.",
      data: updatedIsPaidStatus,
    });
  } catch (error) {
    logger.error("Помилка при зміни статусу оплати: ", error.message);
    return res.status(500).json({
      message: "Помилка при зміни статусу оплати. Спробуйте ще раз.",
    });
  }
}

export { 
  getEmployeeSalariesHandler,
  updateIsPaidStatusHandler,
};
