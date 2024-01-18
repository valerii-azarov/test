import employeeServicesModel from "../models/employeeServicesModel.js";

async function getEmployeeServicesHandler(req, res) {
  try {
    const employeeId = req.params.id;
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await employeeServicesModel.getEmployeeServicesByEmployeeIdOffset(page, limit, employeeId);
    } else {
      result = await employeeServicesModel.getEmployeeServicesByEmployeeId(employeeId);
    }

    count = await employeeServicesModel.getTotalServicesByEmployeeIdCount(employeeId);

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про послуги співробітників відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      employeeServices: result,
    });
  } catch (error) {
    console.error("Помилка при отриманні послуг співробітників: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні послуг співробітників.",
    });
  }
}

export {
  getEmployeeServicesHandler,
};
