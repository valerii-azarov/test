import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import CategoriesContainer from "./category/CategoriesContainer";
import ServicesContainer from "./service/ServicesContainer";
import ServiceTypesContainer from "./service-type/ServiceTypesContainer";
import ServiceInfoContainer from "./service-info/ServiceInfoContainer";
import EmployeeServicesContainer from "./employee-services/employeeServicesContainer";

import "./style.css";

const ServicesPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [activeTab, setActiveTab] = useState<string>("categories");

  const isEmployee = user.role_id === 3;

  const options = [
    { id: "categories", label: "Категорія" },
    { id: "services", label: "Послуга" },
    { id: "service_types", label: "Вид послуги" },
    { id: "service_info", label: "Інформація про послуги" },
    ...(isEmployee ? [{ id: "employee_services", label: "Мої послуги" }] : []),
  ];

  const handleChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="services__container">
      <div className="services__wrapper">
        <div className="services__top">
          <div className="services__header">
            <h1 className="services__title">Послуги</h1>
          </div>

          <div className="services__multi-switch-container">
            <div className="services__multi-switch-wrapper">
              <div className="services__multi-switch-slide">
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
        </div>

        <div className="services__bottom">
          {activeTab === "categories" && <CategoriesContainer />}
          {activeTab === "services" && <ServicesContainer />}
          {activeTab === "service_types" && <ServiceTypesContainer />}
          {activeTab === "service_info" && <ServiceInfoContainer />}
          {activeTab === "employee_services" && <EmployeeServicesContainer />}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
