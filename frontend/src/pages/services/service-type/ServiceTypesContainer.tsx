import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadServiceTypesData } from "../../../redux/actionCreators/serviceTypesCreators";
import { ServiceType } from "../../../interfaces/service-type-interface";

import Button from "../../../components/Button/Button";
import Pagination from "../../../components/Pagination/Pagination";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import AddServiceType from "./add-service-type/AddServiceType";
import EditServiceType from "./edit-service-type/EditServiceType";

import "./style.css";

const ServiceTypesContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { serviceTypes, totalItems, error } = useSelector((state: RootState) => state.data.serviceTypes.data);
  
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
  const [isAddServiceTypeOpen, setAddServiceTypeOpen] = useState<boolean>(false);
  const [isEditServiceTypeOpen, setEditServiceTypeOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const isAdmin = user.role_id === 1;

  const handleAddServiceType = (serviceType: ServiceType) => {
    console.log(serviceType);
    setAddServiceTypeOpen(false);
    setCallback(!callback);
  };

  const handleUpdateServiceType = (serviceType: ServiceType) => {
    console.log(serviceType);
    setSelectedServiceType(null);
    setEditServiceTypeOpen(false);
    setCallback(!callback);
  };

  const handleDeleteServiceType = () => {
    selectedServiceType && console.log("serviceType deleted");
    setSelectedServiceType(null);
    setEditServiceTypeOpen(false);
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
    dispatch(loadServiceTypesData({ currentPage, itemsPerPage }));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="service-type__container">
      <div className="service-type__header">
        <h1 className="service-type__title">Список видів послуги</h1>
        <button 
          className="service-type__refresh-button" 
          onClick={() => setCallback(!callback)}
          title="Update"
        >
          <i className="fa-solid fa-rotate" />
        </button>
      </div>

      <table className="service-types-table">
        <thead>
          <tr>
            <th className="servic-type-number">№ послуги</th>
            <th className="service-type-name">Назва послуги</th>
            <th className="service-type-actions">Дії</th>
          </tr>
        </thead>
        <tbody>
          {serviceTypes.map((serviceType) => (
            <tr key={serviceType.id}>
              <td>{serviceType.id.toString().padStart(8, "0")}</td>
              <td title={serviceType.name}>{serviceType.name.length > 135 ? `${serviceType.name.slice(0, 135)}...` : serviceType.name}</td>
              <td>
                <button
                  className="button-view"
                  onClick={() => {
                    setSelectedServiceType(serviceType);
                    setEditServiceTypeOpen(!isEditServiceTypeOpen);
                  }}
                >
                  Перегляд
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="service-types-actions">
        <Button
          text="Додати"
          type="button"
          onClick={() => setAddServiceTypeOpen(!isAddServiceTypeOpen)}
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

      <AddServiceType
        isOpen={isAddServiceTypeOpen}
        onAddClick={handleAddServiceType}
        onCloseClick={() => setAddServiceTypeOpen(!isAddServiceTypeOpen)}
      />

      {selectedServiceType && (
        <EditServiceType
          isOpen={isEditServiceTypeOpen}
          onUpdateClick={handleUpdateServiceType}
          onDeleteClick={handleDeleteServiceType}
          onCloseClick={() => {
            setEditServiceTypeOpen(!isEditServiceTypeOpen);
            setSelectedServiceType(null);
          }}
          serviceType={selectedServiceType}
        />
      )}
    </div>
  );
};

export default ServiceTypesContainer;
