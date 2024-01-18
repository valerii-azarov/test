import { pool } from "../config/db.js";
import { getEmployeeByUsernameQuery, getEmployeeByActivationCodeQuery, getEmployeeByPhoneQuery, getEmployeeByEmailQuery, insertEmployeeForRegistrationQuery, insertActivationCodeQuery, updateEmployeeStatusQuery, updateEmployeeDetailsQuery, getEmployeesOffsetQuery, getTotalEmployeesCountQuery, getEmployeeByIdQuery, getEmployeeDetailsByIdQuery, createEmployeeQuery, updateEmployeeQuery, deleteEmployeeQuery } from "../queries/employeesQueries.js";

async function getEmployeeByUsername(username) {
  try {
    const result = await pool.query(getEmployeeByUsernameQuery, [username]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Помилка при отриманні користувача за ім'ям користувача.");
  }
}

async function getEmployeeByActivationCode(activationCode) {
  try {
    const result = await pool.query(getEmployeeByActivationCodeQuery, [
      activationCode,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання коду активації сталася помилка.");
  }
}

async function getEmployeeByPhone(phone) {
  try {
    const result = await pool.query(getEmployeeByPhoneQuery, [phone]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання даних про співробітника за номером телефону сталася помилка.");
  }
}

async function getEmployeeByEmail(email) {
  try {
    const result = await pool.query(getEmployeeByEmailQuery, [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання даних про співробітника за електронною поштою сталася помилка.");
  }
}

async function insertEmployeeForRegistration(surname, name, patronymic, phone, email, statusId) {
  try {
    await pool.query(insertEmployeeForRegistrationQuery, [surname, name, patronymic, phone, email, statusId]);
  } catch (error) {
    console.log(error);
    throw new Error("Під час створення даних про співробітника сталася помилка.");
  }
}

async function insertActivationCode(employeeId, activationCode) {
  try {
    await pool.query(insertActivationCodeQuery, [employeeId, activationCode]);
  } catch (error) {
    throw new Error("Під час створення коду активації сталася помилка.");
  }
}

async function updateEmployeeStatus(employeeId, newStatusId) {
  try {
    await pool.query(updateEmployeeStatusQuery, [newStatusId, employeeId]);
  } catch (error) {
    throw new Error("Під час зміни статусу співробітника сталася помилка.");
  }
}

async function updateEmployeeDetails(employeeId, username, password, positionId, roleId, officeId) {
  try {
    await pool.query(updateEmployeeDetailsQuery, [username, password, positionId, roleId, officeId, employeeId]);
  } catch (error) {
    throw new Error("Під час зміни даних співробітника сталася помилка.");
  }
}

export async function getEmployeesOffset(page, limit) {
  try {
    const offset = (page - 1) * limit;
    const result = await pool.query(getEmployeesOffsetQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання співробітників сталася помилка.");
  }
}

export async function getTotalEmployeesCount() {
  try {
    const result = await pool.query(getTotalEmployeesCountQuery);
    return result.rows[0].count;
  } catch (error) {
    throw new Error("Помилка при отриманні загальної кількості співробітників.");
  }
}

async function getEmployeeById(employeeId) {
  try {
    const result = await pool.query(getEmployeeByIdQuery, [employeeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання даних про співробітника сталася помилка.");
  }
}

async function getEmployeeDetailsById(employeeId) {
  try {
    const result = await pool.query(getEmployeeDetailsByIdQuery, [employeeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання даних про співробітника сталася помилка.");
  }
}

export async function createEmployee(surname, name, patronymic, phone, email, username, password, position_id, role_id, status_id, office_id) {
  try {
    const result = await pool.query(createEmployeeQuery, [surname, name, patronymic, phone, email, username, password, position_id, role_id, status_id, office_id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час створення даних про співробітника сталася помилка.");
  }
}

export async function updateEmployee(surname, name, patronymic, phone, email, username, password, position_id, role_id, status_id, office_id, employeeId) {
  try {
    const result = await pool.query(updateEmployeeQuery, [surname, name, patronymic, phone, email, username, password, position_id, role_id, status_id, office_id, employeeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час зміни даних про співробітника сталася помилка.");
  }
}

export async function deleteEmployee(employeeId) {
  try {
    const result = await pool.query(deleteEmployeeQuery, [employeeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час видалення співробітника сталася помилка.");
  }
}

export default {
  getEmployeeByUsername,
  getEmployeeByActivationCode,
  getEmployeeByPhone,
  getEmployeeByEmail,
  insertEmployeeForRegistration,
  insertActivationCode,
  updateEmployeeStatus,
  updateEmployeeDetails,
  getEmployeesOffset,
  getTotalEmployeesCount,
  getEmployeeById,
  getEmployeeDetailsById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
