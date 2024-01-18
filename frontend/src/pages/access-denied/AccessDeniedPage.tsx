import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const AccessDeniedPage: React.FC = () => {
  return (
    <div className="access-denied__container">
      <div className="access-denied__wrapper">
        <h1 className="access-denied__title">
          Доступ заборонено
        </h1>
        <p className="access-denied__subtitle">
          Вибачте, але у вас немає доступу до цієї сторінки. Перейдіть на&nbsp;
          <Link to="/home">головну сторінку</Link>.
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
