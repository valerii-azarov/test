import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadServiceInfoData } from "../../../redux/actionCreators/serviceInfoCreators";
import { ServiceInfo } from "../../../interfaces/service-info-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import AddServiceInfo from "./add-service-info/AddServiceInfo";
import EditServiceInfo from "./edit-service-info/EditServiceInfo";

import "./style.css";

const ServiceInfoContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { serviceInfo, totalItems, error } = useSelector((state: RootState) => state.data.serviceInfo.data);

  const isAdmin = user.role_id === 1;

  const [selectedServiceInfo, setSelectedServiceInfo] = useState<ServiceInfo | null>(null);
  const [isAddServiceInfoOpen, setAddServiceInfoOpen] = useState<boolean>(false);
  const [isEditServiceInfoOpen, setEditServiceInfoOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const handleAddServiceInfo = (serviceInfo: ServiceInfo) => {
    console.log(serviceInfo);
    setAddServiceInfoOpen(false);
    setCallback(!callback);
  };

  const handleUpdateServiceInfo = (serviceInfo: ServiceInfo) => {
    console.log(serviceInfo);
    setSelectedServiceInfo(null);
    setEditServiceInfoOpen(false);
    setCallback(!callback);
  };

  const handleDeleteServiceInfo = () => {
    selectedServiceInfo && console.log("serviceInfo deleted");
    setSelectedServiceInfo(null);
    setEditServiceInfoOpen(false);
    setCallback(!callback);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

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
    dispatch(loadServiceInfoData({ currentPage, itemsPerPage} ));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="service-info__container">
      <div className="service-info__header">
        <h1 className="service-info__title">Список послуг</h1>
        <button 
          className="service-info__refresh-button" 
          onClick={() => setCallback(!callback)}
          title="Update"
        >
          <i className="fa-solid fa-rotate" />
        </button>
      </div>

      <table className="service-info-table">
        <thead>
          <tr>
            <th className="info-number">№ послуги</th>
            <th className="info-name">Назва послуги</th>
            <th className="info-actions">Дії</th>
          </tr>
        </thead>
        <tbody>
          {serviceInfo.map((info) => (
            <tr key={info.id}>
              <td>{info.id.toString().padStart(8, "0")}</td>
              <td>{info.service_name}</td>
              <td>
                <button
                  className="button-view"
                  onClick={() => {
                    setSelectedServiceInfo(info);
                    setEditServiceInfoOpen(!isEditServiceInfoOpen);
                  }}
                >
                  Перегляд
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="service-info-actions">
        <Button
          text="Додати"
          type="button"
          onClick={() => setAddServiceInfoOpen(!isAddServiceInfoOpen)}
          disabled={!isAdmin}
        />
        <div className="pagination-controls">
          <select
            className="pagination-columns-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
          <div className="pagination-count">
            <span>{`${startItem}-${endItem} із ${totalItems}`}</span>
          </div>
          <button
            className="pagination-prev-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-angle-left" />
          </button>
          <button
            className="pagination-next-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-angle-right" />
          </button>
        </div>
      </div>

      {error && (
        <MessageContainer
          type="error"
          message={[error]}
          style={{ marginTop: "15px" }}
        />
      )}

      <AddServiceInfo
        isOpen={isAddServiceInfoOpen}
        onAddClick={handleAddServiceInfo}
        onCloseClick={() => setAddServiceInfoOpen(!isAddServiceInfoOpen)}
      />

      {selectedServiceInfo && (
        <EditServiceInfo
          isOpen={isEditServiceInfoOpen}
          onUpdateClick={handleUpdateServiceInfo}
          onDeleteClick={handleDeleteServiceInfo}
          onCloseClick={() => {
            setEditServiceInfoOpen(!isEditServiceInfoOpen);
            setSelectedServiceInfo(null);
          }}
          serviceInfo={selectedServiceInfo}
        />
      )}
    </div>
  );
};

export default ServiceInfoContainer;
