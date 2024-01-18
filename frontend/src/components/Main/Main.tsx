import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import LoginPage from "../../pages/login/LoginPage";
import RegistrationPage from "../../pages/registration/RegistrationPage";
import ActivationPage from "../../pages/activation/ActivationPage";

import HomePage from "../../pages/home/HomePage";
import ServicesPage from "../../pages/services/ServicesPage";
import BookingPage from "../../pages/booking/BookingPage";
import EmployeesPage from "../../pages/employees/EmployeesPage";
import ReportsPage from "../../pages/reports/ReportsPage";
import SettingsPage from "../../pages/settings/SettingsPage";

import NotFoundPage from "../../pages/not-found/NotFoundPage";
import AccessDeniedPage from "../../pages/access-denied/AccessDeniedPage";

import "./style.css";

const Main: React.FC = () => {
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  const isAdmin = user.role_id === 1;
  const isEmployee = user.role_id === 3;

  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route 
            path="/" 
            element={<LoginPage />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            path="/registration" 
            element={<RegistrationPage />} 
          />
          <Route 
            path="/activation" 
            element={<ActivationPage />} 
          />
        </>
      ) : (
        <>
          <Route 
            path="/home" 
            element={<HomePage />} 
          />
          <Route 
            path="/services" 
            element={<ServicesPage />} 
          />
          <Route 
            path="/booking" 
            element={<BookingPage />} 
          />
          <Route
            path="/employees"
            element={isAdmin ? <EmployeesPage /> : <AccessDeniedPage />}
          />
          <Route
            path="/reports"
            element={(isAdmin || isEmployee) ? <ReportsPage /> : <AccessDeniedPage />}
          />          
          <Route 
            path="/settings" 
            element={<SettingsPage />} 
          />
        </>
      )}
      <Route 
        path="*" 
        element={<NotFoundPage />} 
      />
    </Routes>
  );
};

export default Main;
