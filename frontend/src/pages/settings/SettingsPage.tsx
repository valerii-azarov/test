import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import NewsContainer from "./news/NewsContainer";
import FaqContainer from "./faq/FaqContainer";
import InfoContainer from "./info/InfoContainer";

import "./style.css";

const SettingsPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [activeTab, setActiveTab] = useState<string>("news");

  const isAdmin = user.role_id === 1;

  const options = [
    { id: "news", label: "Новини" },
    { id: "faq", label: "Питання та відповіді" },
    { id: "info", label: "Інформація" },
  ];

  const handleChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="settings__container">
      <div className="settings__wrapper">
        <div className="settings__top">
          <div className="settings__header">
            <h1 className="settings__title">
              {isAdmin ? "Налаштування" : "Інформація"}
            </h1>
          </div>
          {isAdmin && (
            <div className="settings__multi-switch-container">
              <div className="settings__multi-switch-wrapper">
                <div className="settings__multi-switch-slide">
                  {options.map((option) => (
                    <React.Fragment key={option.id}>
                      <input
                        type="radio"
                        name="account"
                        id={option.id}
                        checked={activeTab === option.id}
                        onChange={() => handleChange(option.id)}
                      />
                      <label onClick={() => setActiveTab(option.id)}>
                        {option.label}
                      </label>
                    </React.Fragment>
                  ))}
                  <a className="slide" aria-hidden={true} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="settings__bottom">
          {isAdmin ? (
            <React.Fragment>
              {activeTab === "news" && <NewsContainer />}
              {activeTab === "faq" && <FaqContainer />}
              {activeTab === "info" && <InfoContainer />}
            </React.Fragment>
          ) : (
            <InfoContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
