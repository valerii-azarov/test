import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { refreshToken, getUserInfo } from "./redux/actionCreators/authCreators";
import { loadAppearanceData } from "./redux/actionCreators/appearanceCreators";
import { transformColor } from "./utils/transformColor";

import Sidebar from "./layout/Sidebar/Sidebar";
import Content from "./layout/Content/Content";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { token, user } = useSelector((state: RootState) => state.auth);
  const { appearance } = useSelector((state: RootState) => state.interface.data);

  const variablesAndValues = useMemo(() => [
    { variable: "--default", value: transformColor(appearance.background, 0) },
    { variable: "--default-15", value: transformColor(appearance.background, 15) },
    { variable: "--default-30", value: transformColor(appearance.background, 30) },
  ], [appearance]);

  useEffect(() => {
    variablesAndValues.forEach(({ variable, value }) => {
      try {
        document.documentElement.style.setProperty(variable, value);
      } catch (error) {
        console.error(`Error setting CSS variable ${variable}:`, error);
      }
    }, [variablesAndValues]);
  }, [variablesAndValues]);

  const firstLogin = localStorage.getItem("firstLogin");

  useEffect(() => {
    firstLogin === "true" && dispatch(refreshToken());
  }, [firstLogin, dispatch]);

  useEffect(() => {
    token && dispatch(getUserInfo());
  }, [token, dispatch]);

  useEffect(() => {
    user.city_id && dispatch(loadAppearanceData(user.city_id));
  }, [user.city_id, dispatch]);
  
  return (
    <div className="container">
      <Sidebar />
      <Content />
      <ToastContainer />
    </div>
  );
};

export default App;
