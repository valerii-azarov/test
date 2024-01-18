import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./style.css";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  const [active, setActive] = useState(false);

  const isAdmin = user.role_id === 1;
  const isEmployee = user.role_id === 3;

  return isAuth ? (
    <div className={`sidebar ${active ? "active" : ""}`} >
      <div className="user-info">
        <div className="user-info__image-container">
          <div className="user-info__image" onClick={() => setActive(!active)}></div>
        </div>
        <span className="user-info__name">
          {`${user.surname} ${user.name.charAt(0)}.${user.patronymic.charAt(0)}.`}
        </span>
      </div>

      <nav className="sidebar__navigation">
        <ul className="navigation__list">
          <li className="list__item">
            <NavLink
              to="/home"
              className={`item__link ${location.pathname === "/home" ? "active" : ""}`}
            >
              <i className="fa-solid fa-house" />
              <span className="item__link-text">Головна</span>
            </NavLink>
          </li>

          <li className="list__item">
            <NavLink
              to="/services"
              className={`item__link ${location.pathname === "/services" ? "active" : ""}`}
            >
              <i className="fa-solid fa-circle-info" />
              <span className="item__link-text">Послуги</span>
            </NavLink>
          </li>

          <li className="list__item">
            <NavLink
              to="/booking"
              className={`item__link ${location.pathname === "/booking" ? "active" : ""}`}
            >
              <i className="fa-solid fa-folder-open" />
              <span className="item__link-text">Заявки</span>
            </NavLink>
          </li>

          {isAdmin && (
            <React.Fragment>
              <li className="list__item">
                <NavLink
                  to="/employees"
                  className={`item__link ${location.pathname === "/employees" ? "active" : ""}`}
                >
                  <i className="fa-solid fa-user" />
                  <span className="item__link-text">Співробітники</span>
                </NavLink>
              </li>
            </React.Fragment>
          )}

          {(isAdmin || isEmployee) && (
            <li className="list__item">
              <NavLink
                to="/reports"
                className={`item__link ${location.pathname === "/reports" ? "active" : ""}`}
              >
                <i className="fa-solid fa-calendar" />
                <span className="item__link-text">Звіти</span>
              </NavLink>
            </li>
          )}

          <li className="list__item">
            <NavLink
              to="/settings"
              className={`item__link ${location.pathname === "/settings" ? "active" : ""}`}
            >
              <i className="fa-solid fa-gear" />
              <span className="item__link-text">Налаштування</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  ) : null;
};

export default Sidebar;
