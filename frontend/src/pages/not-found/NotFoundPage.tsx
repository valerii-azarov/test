import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found__container">
      <div className="not-found__wrapper">
        <h1 className="not-found__title">
          Сторінку не знайдено
        </h1>
        <p className="not-found__subtitle">
          Сторінка, яку ви шукаєте, має іншу адресу або видалена. Перейдіть
          на&nbsp;<Link to="/home">головну сторінку</Link>.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
