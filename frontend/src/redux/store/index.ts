import { combineReducers, createStore, applyMiddleware, compose, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";

import registrationReducer from "../reducers/registrationReducer";
import activationReducer from "../reducers/activationReducer";

import authReducer from "../reducers/authReducer";
import appearanceReducer from "../reducers/appearanceReducer";

import regionsReducer from "../reducers/regionsReducer";
import citiesReducer from "../reducers/citiesReducer";
import officesReducer from "../reducers/officesReducer";
import employeesReducer from "../reducers/employeesReducer";
import bookingReducer from "../reducers/bookingReducer";
import categoriesReducer from "../reducers/categoriesReducer";
import servicesReducer from "../reducers/servicesReducer";
import serviceTypesReducer from "../reducers/serviceTypesReducer";
import serviceInfoReducer from "../reducers/serviceInfoReducer";
import employeeServicesReducer from "../reducers/employeeServicesReducer";
import scheduleReducer from "../reducers/scheduleReducer";
import reportsReducer from "../reducers/reportsReducer";
import employeeSalariesReducer from "../reducers/employeeSalariesReducer";
import newsReducer from "../reducers/newsReducery";
import faqReducer from "../reducers/faqReducer";
import infoReducer from "../reducers/infoReducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const formReducer = combineReducers({
  registration: registrationReducer,
  activation: activationReducer,
});

const dataReducer = combineReducers({
  regions: regionsReducer,
  cities: citiesReducer,
  offices: officesReducer,
  employees: employeesReducer,
  booking: bookingReducer,
  categories: categoriesReducer,
  services: servicesReducer,
  serviceTypes: serviceTypesReducer,
  serviceInfo: serviceInfoReducer,
  employeeServices: employeeServicesReducer,
  schedule: scheduleReducer,
  reports: reportsReducer,
  employeeSalaries: employeeSalariesReducer, 
  news: newsReducer,
  faq: faqReducer,
  info: infoReducer,
});

const rootReducer = combineReducers({
  auth: authReducer,
  interface: appearanceReducer,
  form: formReducer,
  data: dataReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
