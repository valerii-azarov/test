import employeesModel from "../models/employeesModel.js";
import generateActivationCode from "../utils/generateActivationCode.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function getAllEmployeesHandler(req, res) {
  try {
    const { limit, page } = req.query;

    let result, count;

    if (page && limit) {
      result = await employeesModel.getEmployeesOffset(page, limit);
    }

    count = await employeesModel.getTotalEmployeesCount();

    if (!result.length) {
      return res.status(404).json({
        message: "Дані про співробітники відсутні.",
      });
    }

    return res.status(200).json({
      count: count,
      employees: result,
    });
  } catch (error) {
    logger.error("Помилка при отриманні співробітників: ", error);
    return res.status(500).json({
      message: "Помилка при отриманні співробітників.",
    });
  }
}

async function submitHandler(req, res) {
  try {
    const { surname, name, patronymic, phone, email } = req.body;

    const existingPhoneEmployee = await employeesModel.getEmployeeByPhone(phone);
    const existingEmailEmployee = await employeesModel.getEmployeeByEmail(email);
    
    if (existingPhoneEmployee) {
      return res.status(400).json({ 
        message: "Номер телефону вже використовується.",
      });
    }

    if (existingEmailEmployee) {
      return res.status(400).json({ 
        message: "Електронна пошта вже використовується.",
      });
    }

    await employeesModel.insertEmployeeForRegistration(surname, name, patronymic, phone, email, 1);

    return res.json({ 
      message: "Вашу форму відправлено, чекайте схвалення від адміністратора.",
    });
  } catch (error) {
    console.error("Помилка при відправленні форми: ", error.message);
    return res.status(500).json({
      message: "Помилка при відправленні форми.",
    });
  }
}

async function approveHandler(req, res) {
  try {
    const employeeId = req.params.id;

    const employee = await employeesModel.getEmployeeById(employeeId);

    if (!employee) {
      return res.status(404).json({ 
        message: "Співробітника не знайдено.",
      });
    }

    if (employee.status_id === 1) {
      await employeesModel.updateEmployeeStatus(employeeId, 2);

      const activationCode = generateActivationCode();

      await employeesModel.insertActivationCode(employeeId, activationCode);

      return res.json({ 
        message: "Заявка схвалена успішно.", 
        activationCode, 
      });
    } else {
      return res.status(400).json({ 
        message: "Заявка вже оброблена.", 
      });
    }
  } catch (error) {
    console.error("Помилка при схваленні заявки співробітника: ", error);
    return res.status(500).json({ 
      message: "Помилка при схваленні заявки співробітника.",
    });
  }
}

async function checkHandler(req, res) {
  try {
    const { activationCode } = req.body;

    const employee = await employeesModel.getEmployeeByActivationCode(activationCode);

    if (!employee) {
      return res.status(404).json({ 
        message: "Код активації не знайдено",
      });
    }

    if (employee.status_id === 2) {
      await employeesModel.updateEmployeeStatus(employee.id, 3);

      return res.json({ 
        message: "Активація успішно пройшла. Заповніть залишкові поля, щоб отримати повний доступ до облікового запису.",
        employee: {
          id: employee.id,
          surname: employee.surname,
          name: employee.name,
          patronymic: employee.patronymic,
          phone: employee.phone,
          email: employee.email,
        },
      });
    } else {
      return res.status(400).json({ 
        message: "Активацію вже виконано. Якщо у вас виникли проблеми, зверніться до адміністраторів.", 
      });
    }
  } catch (error) {
    console.error("Помилка при активації: ", error);
    return res.status(500).json({ 
      message: "Помилка при активації.",
    });
  }
}

async function completeHandler(req, res) {
  try {
    const employeeId = req.params.id;
    const { username, password, position_id, office_id } = req.body;

    const employee = await employeesModel.getEmployeeById(employeeId);

    if (!employee) {
      return res.status(404).json({ 
        message: "Співробітника не знайдено.",
      });
    }

    if (employee.status_id === 3) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await employeesModel.updateEmployeeStatus(employee.id, 4);
      await employeesModel.updateEmployeeDetails(employeeId, username, hashedPassword, position_id, 3, office_id);

      return res.json({ 
        message: "Обліковий запис успішно активований з повноцінним доступом.",
      });
    } else {
      return res.status(400).json({ 
        message: "Обліковий запис вже активований.",
      });
    }
  } catch (error) {
    console.error("Помилка при оновленні даних співробітника: ", error);
    return res.status(500).json({
      message: "Помилка при оновленні даних співробітника.",
    });
  }
}

async function loginHandler(req, res) {
  try {
    const { username, password } = req.body;

    const employee = await employeesModel.getEmployeeByUsername(username);

    if (!employee) {
      return res.status(401).json({
        message: "Користувача з таким ім'ям користувача не знайдено.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Невірний пароль.",
      });
    }

    const refreshToken = jwt.sign({
      id: employee.id
    },
    process.env.REFRESH_TOKEN_SECRET, { 
      expiresIn: "1d"
    });
    
    res.cookie("refresh_token", refreshToken, { 
      httpOnly: true, 
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    return res.status(200).json({
      message: "Успішний вхід.",
    });
  } catch (error) {
    console.error("Помилка при вході:", error.message);
    return res.status(500).json({
      message: "Помилка при вході.",
    });
  }
}

async function logoutHandler(req, res) {
  try {
    const refreshToken = req.cookies.refresh_token;
    
    if (!refreshToken) {
      return res.status(403).json({
        message: "Refresh token не знайдений.",
      });
    }

    res.clearCookie("refresh_token");

    return res.status(200).json({
      message: "Вихід здійснено.",
    });     
  }
  catch (error) {
    console.error("Помилка при виході:", error.message);
    return res.status(500).json({
      message: "Помилка при виході.",
    });
  }
}

async function getAccessTokenHandler(req, res) {
  try {
    const refreshToken = req.cookies.refresh_token;
    
    if (!refreshToken) {
      return res.status(403).json({
        message: "Refresh token не знайдений.",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(403).json({
        message: "Некоректний або закінчився refresh token.",
      });
    }

    const employee = await employeesModel.getEmployeeById(decoded.id);

    if (!employee) {
      return res.status(404).json({
        message: "Користувача не знайдено.",
      });
    }

    const newAccessToken = jwt.sign({ 
      id: employee.id 
    }, 
    process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Помилка при обробці refresh token:", error.message);
    return res.status(500).json({
      message: "Помилка при обробці refresh token.",
    });
  }
}

async function getEmployeeByIdHandler(req, res) {
  try {
    const employeeId = req.employee.id;

    const employee = await employeesModel.getEmployeeById(employeeId);
   
    if (!employee) {
      return res.status(404).json({
        message: "Співробітника не знайдено.",
      });
    }

    return res.status(200).json(employee);
  } catch (error) {
    logger.error("Помилка при отриманні даних про співробітника: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні даних про співробітника.",
    });
  }
}

async function getEmployeeDetailsByIdHandler(req, res) {
  try {
    const employeeId = req.params.id;

    const employee = await employeesModel.getEmployeeDetailsById(employeeId);
   
    if (!employee) {
      return res.status(404).json({
        message: "Співробітника не знайдено.",
      });
    }

    return res.status(200).json(employee);
  } catch (error) {
    logger.error("Помилка при отриманні даних про співробітника: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні даних про співробітника.",
    });
  }
}

async function createEmployeeHandler(req, res) {
  try {
    const { surname, name, patronymic, phone, email, username, password, position_id, office_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await employeesModel.createEmployee(surname, name, patronymic, phone, email, username, hashedPassword, position_id, 3, 4, office_id);

    return res.status(201).json({
      message: "Співробітник успішно створено.",
    });
  } catch (error) {
    logger.error("Помилка при створенні даних про співробітника: ", error.message);
    return res.status(500).json({
      message: "Помилка при створенні даних про співробітника. Спробуйте ще раз.",
    });
  }
}

async function updateEmployeeHandler(req, res) {
  try {
    const employeeId = req.params.id;
    const { surname, name, patronymic, phone, email, username, password, position_id, role_id, status_id, office_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedEmployee = await employeesModel.updateEmployee(surname, name, patronymic, phone, email, username, hashedPassword, position_id, role_id, status_id, office_id, employeeId);

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Співробітник не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Співробітник успішно змінено.",
    });
  } catch (error) {
    logger.error("Помилка при зміни даних про співробітника: ", error.message);
    return res.status(500).json({
      message: "Помилка при зміни даних про співробітника. Спробуйте ще раз.",
    });
  }
}

async function deleteEmployeeHandler(req, res) {
  const employeeId = req.params.id;

  try {
    const deletedEmployee = await employeesModel.deleteEmployee(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Співробітник не знайдено.",
      });
    }

    return res.status(200).json({
      message: "Співробітник успішно видалено.",
    });
  } catch (error) {
    logger.error("Помилка при видаленні співробітника: ", error.message);
    return res.status(500).json({
      message: "Помилка при видаленні співробітника. Спробуйте ще раз.",
    });
  }
}

export { 
  submitHandler,
  approveHandler,
  checkHandler,
  completeHandler,
  loginHandler,
  logoutHandler,
  getAccessTokenHandler,
  getAllEmployeesHandler,
  getEmployeeByIdHandler,
  getEmployeeDetailsByIdHandler,
  createEmployeeHandler,
  updateEmployeeHandler,
  deleteEmployeeHandler,
};