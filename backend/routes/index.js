import express from "express";

import { 
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
  deleteEmployeeHandler 
} from "../controllers/employeesController.js";

import { 
  getAllRegionsHandler, 
  getRegionByIdHandler, 
  createRegionHandler, 
  updateRegionHandler, 
  deleteRegionHandler 
} from "../controllers/regionsController.js";

import { 
  getAllCitiesHandler, 
  getCitiesByRegionIdHandler, 
  getCityByIdHandler, 
  createCityHandler, 
  updateCityHandler, 
  deleteCityHandler 
} from "../controllers/citiesController.js";

import { 
  getAllOfficesHandler, 
  getOfficesByCityIdHandler, 
  getOfficeByIdHandler, 
  createOfficeHandler, 
  updateOfficeHandler, 
  deleteOfficeHandler 
} from "../controllers/officesController.js";

import { 
  getCategoriesHandler 
} from "../controllers/categoriesController.js";

import { 
  getServicesHandler, 
  getServicesByCategoryHandler 
} from "../controllers/servicesController.js";

import { 
  getServiceTypesHandler, 
  getServiceTypesByServiceIdHandler 
} from "../controllers/serviceTypesController.js";

import { 
  getServiceInfoHandler 
} from "../controllers/serviceInfoController.js";

import { 
  getScheduleByOfficeIdAndServiceIdHandler 
} from "../controllers/scheduleController.js";

import { 
  getEmployeeServicesHandler 
} from "../controllers/employeeServicesController.js";

import { 
  getReportsByEmployeeIdHandler 
} from "../controllers/reportsController.js";

import { 
  getEmployeeSalariesHandler, 
  updateIsPaidStatusHandler 
} from "../controllers/employeeSalariesController.js";

import { 
  getBookingHandler 
} from "../controllers/bookingController.js";

import { 
  getNewsHandler 
} from "../controllers/newsController.js";

import { 
  getFaqHandler 
} from "../controllers/faqController.js";

import { 
  getAppearanceByCityIdHandler 
} from "../controllers/settingsController.js";

import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

const routes = [
  // regions
  { path: "/regions", method: "GET", handler: getAllRegionsHandler },
  { path: "/regions/:id", method: "GET", middleware: [auth, authAdmin], handler: getRegionByIdHandler },
  { path: "/regions", method: "POST", middleware: [auth, authAdmin], handler: createRegionHandler },
  { path: "/regions/:id", method: "PUT", middleware: [auth, authAdmin], handler: updateRegionHandler },
  { path: "/regions/:id", method: "DELETE", middleware: [auth, authAdmin], handler: deleteRegionHandler },

  // cities
  { path: "/cities", method: "GET", handler: getAllCitiesHandler },
  { path: "/cities/region/:id", method: "GET", handler: getCitiesByRegionIdHandler },
  { path: "/cities/:id", method: "GET", middleware: [auth, authAdmin], handler: getCityByIdHandler },
  { path: "/cities", method: "POST", middleware: [auth, authAdmin], handler: createCityHandler },
  { path: "/cities/:id", method: "PUT", middleware: [auth, authAdmin], handler: updateCityHandler },
  { path: "/cities/:id", method: "DELETE", middleware: [auth, authAdmin], handler: deleteCityHandler },

  // offices
  { path: "/offices", method: "GET", handler: getAllOfficesHandler },
  { path: "/offices/city/:id", method: "GET", handler: getOfficesByCityIdHandler },
  { path: "/offices/:id", method: "GET", middleware: [auth, authAdmin], handler: getOfficeByIdHandler },
  { path: "/offices", method: "POST", middleware: [auth, authAdmin], handler: createOfficeHandler },
  { path: "/offices/:id", method: "PUT", middleware: [auth, authAdmin], handler: updateOfficeHandler },
  { path: "/offices/:id", method: "DELETE", middleware: [auth, authAdmin], handler: deleteOfficeHandler },

  // employees
  { path: "/employees/submit", method: "POST", handler: submitHandler },
  { path: "/employees/approve/:id", method: "PUT", middleware: [auth, authAdmin], handler: approveHandler },
  { path: "/employees/check-activation-code", method: "POST", handler: checkHandler },
  { path: "/employees/complete-account/:employeeId", method: "PUT", handler: completeHandler },
  { path: "/employees/login", method: "POST", handler: loginHandler },
  { path: "/employees/logout", method: "GET", handler: logoutHandler },
  { path: "/employees/refresh_token", method: "GET", handler: getAccessTokenHandler },
  { path: "/employees", method: "GET", middleware: [auth, authAdmin], handler: getAllEmployeesHandler },
  { path: "/employees/info", method: "GET", middleware: [auth], handler: getEmployeeByIdHandler },
  { path: "/employees/employee/:id", method: "GET", middleware: [auth], handler: getEmployeeDetailsByIdHandler },
  { path: "/employees", method: "POST", middleware: [auth, authAdmin], handler: createEmployeeHandler },
  { path: "/employees/:id", method: "PUT", middleware: [auth, authAdmin], handler: updateEmployeeHandler },
  { path: "/employees/:id", method: "DELETE", middleware: [auth, authAdmin], handler: deleteEmployeeHandler },

  // bookings
  { path: "/booking/:id", method: "GET", middleware: [auth], handler: getBookingHandler },

  // categories
  { path: "/categories", method: "GET", middleware: [auth], handler: getCategoriesHandler },

  // services
  { path: "/services", method: "GET", middleware: [auth], handler: getServicesHandler },
  { path: "/services/:id", method: "GET", middleware: [auth], handler: getServicesByCategoryHandler },

  // service types
  { path: "/service_types", method: "GET", middleware: [auth], handler: getServiceTypesHandler },
  { path: "/service_types/:id", method: "GET", middleware: [auth], handler: getServiceTypesByServiceIdHandler },

  // service info
  { path: "/service-info", method: "GET", middleware: [auth], handler: getServiceInfoHandler },

  // employee services
  { path: "/employee-services/:id", method: "GET", middleware: [auth], handler: getEmployeeServicesHandler },

  // schedule
  { path: "/schedule/:officeId/:serviceId", method: "GET", middleware: [auth], handler: getScheduleByOfficeIdAndServiceIdHandler },

  // reports
  { path: "/reports/:id", method: "GET", middleware: [auth], handler: getReportsByEmployeeIdHandler },

  // employee salaries
  { path: "/employee-salaries", method: "GET", middleware: [auth, authAdmin], handler: getEmployeeSalariesHandler },
  { path: "/employee-salaries/:id", method: "PUT", middleware: [auth, authAdmin], handler: updateIsPaidStatusHandler },

  // settings
  { path: "/appearance/:id", method: "GET", handler: getAppearanceByCityIdHandler },

  // news
  { path: "/news", method: "GET", middleware: [auth, authAdmin], handler: getNewsHandler },

  // FAQ
  { path: "/faq", method: "GET", middleware: [auth, authAdmin], handler: getFaqHandler },
];

routes.forEach(route => {
  switch (route.method) {
    case "GET":
      router.get(route.path, route.middleware || [], route.handler);
      break;
    case "POST":
      router.post(route.path, route.middleware || [], route.handler);
      break;
    case "PUT":
      router.put(route.path, route.middleware || [], route.handler);
      break;
    case "DELETE":
      router.delete(route.path, route.middleware || [], route.handler);
      break;
    default:
      break;
  }
});

export default router;
