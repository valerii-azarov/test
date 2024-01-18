import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import "./style.css";

const HomePage: React.FC = () => {
  const { user: { name, patronymic } } = useSelector((state: RootState) => state.auth);

  return (
    <div className="home__container">
      <div className="home__wrapper">
        <h1 className="home__title">
          {`Вітаємо, ${name} ${patronymic}👋`}
        </h1>
        <p className="home__subtitle">
          Тут ви можете виконувати свої робочі справи та отримувати необхідну
          інформацію.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
