import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadServicesData } from "../../../redux/actionCreators/servicesCreators";
import { Service } from "../../../interfaces/service-interface";

import Button from "../../../components/Button/Button";
import Pagination from "../../../components/Pagination/Pagination";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import AddService from "./add-service/AddService";
import EditService from "./edit-service/EditService";

import "./style.css";

const ServicesContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { services, totalItems, error } = useSelector((state: RootState) => state.data.services.data);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isAddServiceOpen, setAddServiceOpen] = useState<boolean>(false);
  const [isEditServiceOpen, setEditServiceOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  
  const isAdmin = user.role_id === 1;

  const handleAddService = (service: Service) => {
    console.log(service);
    setAddServiceOpen(false);
    setCallback(!callback);
  };

  const handleUpdateService = (service: Service) => {
    console.log(service);
    setSelectedService(null);
    setEditServiceOpen(false);
    setCallback(!callback);
  };

  const handleDeleteService = () => {
    selectedService && console.log("service deleted");
    setSelectedService(null);
    setEditServiceOpen(false);
    setCallback(!callback);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(loadServicesData({ currentPage, itemsPerPage} ));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="service__container">
      <div className="service__header">
        <h1 className="service__title">Список послуг</h1>
        <button 
          className="service__refresh-button" 
          onClick={() => setCallback(!callback)}
          title="Update"
        >
          <i className="fa-solid fa-rotate" />
        </button>
      </div>

      <table className="services-table">
        <thead>
          <tr>
            <th className="service-number">№ послуги</th>
            <th className="service-name">Назва послуги</th>
            <th className="service-actions">Дії</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id.toString().padStart(8, "0")}</td>
              <td>{service.name}</td>
              <td>
                <button
                  className="button-view"
                  onClick={() => {
                    setSelectedService(service);
                    setEditServiceOpen(!isEditServiceOpen);
                  }}
                >
                  Перегляд
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="services-actions">
        <Button
          text="Додати"
          type="button"
          onClick={() => setAddServiceOpen(!isAddServiceOpen)}
          disabled={!isAdmin}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {error && (
        <MessageContainer
          type="error"
          message={[error]}
          style={{ marginTop: "15px" }}
        />
      )}

      <AddService
        isOpen={isAddServiceOpen}
        onAddClick={handleAddService}
        onCloseClick={() => setAddServiceOpen(!isAddServiceOpen)}
      />

      {selectedService && (
        <EditService
          isOpen={isEditServiceOpen}
          onUpdateClick={handleUpdateService}
          onDeleteClick={handleDeleteService}
          onCloseClick={() => {
            setEditServiceOpen(!isEditServiceOpen);
            setSelectedService(null);
          }}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default ServicesContainer;
