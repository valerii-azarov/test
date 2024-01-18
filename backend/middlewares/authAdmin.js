import employeesModel from "../models/employeesModel.js";

async function authAdmin(req, res, next) {
  const employee = await employeesModel.getEmployeeById(req.employee.id);

  if (!employee || employee.role_id !== 1) {
    return res.status(500).json({
      message: "Доступ до ресурсів адміністратора заборонено.",
    });
  }

  next();
}

export default authAdmin;
