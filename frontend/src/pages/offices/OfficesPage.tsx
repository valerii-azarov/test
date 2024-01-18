import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadOfficesData, addOffice, updateOffice, deleteOffice } from "../../redux/actionCreators/officesCreators";
import { Office } from "../../interfaces/office-interface";

import Button from "../../components/Button/Button";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import AddOffice from "./add-office/AddOffice";
import EditOffice from "./edit-office/EditOffice";

import "./style.css";

const OfficesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { offices, totalItems, error } = useSelector((state: RootState) => state.data.offices.data);

  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  const [isAddOfficeOpen, setAddOfficeOpen] = useState<boolean>(false);
  const [isEditOfficeOpen, setEditOfficeOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const statusLabels: Record<string, string> = {
    "active": "Відчинено",
    "closed": "Зачинено",
    "tempinop": "Тимчасово не працює",
  };

  const handleAddOffice = (Office: Office) => {
    dispatch(addOffice(Office));
    setAddOfficeOpen(false);
    setCallback(!callback);
  };

  const handleUpdateOffice = (Office: Office) => {
    dispatch(updateOffice(Office.id, Office));
    setSelectedOffice(null);
    setEditOfficeOpen(false);
    setCallback(!callback);
  };
  
  const handleDeleteOffice = () => {
    selectedOffice && dispatch(deleteOffice(selectedOffice.id));
    setSelectedOffice(null);
    setEditOfficeOpen(false);
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
    dispatch(loadOfficesData(itemsPerPage, currentPage));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="offices__container">
      <div className="offices__wrapper">
        <div className="offices__header">
          <h1 className="offices__title">ЦНАПи</h1>
          <button
            className="offices__refresh-button"
            onClick={() => setCallback(!callback)}
            title="Update"
          >
            <i className="fa-solid fa-rotate" />
          </button>
        </div>

        <div>
          <table className="offices-table">
            <thead>
              <tr>
                <th className="office-number">№ ЦНАПу</th>
                <th className="office-name">Назва ЦНАПу</th>
                <th className="office-address">Адреса ЦНАПу</th>
                <th className="office-city">Назва міста</th>
                <th className="office-status">Статус ЦНАПу</th>
                <th className="office-actions">Дії</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((office) => (
                <tr key={office.id}>
                  <td>{office.id.toString().padStart(8, "0")}</td>
                  <td>{office.name}</td>
                  <td>{office.address}</td>
                  <td>м.{office.city}</td>
                  <td className={`office-status ${office.status}`}>
                    {office.status && statusLabels[office.status]}
                  </td>
                  <td>
                    <button
                      className="button-view"
                      onClick={() => {
                        setSelectedOffice(office);
                        setEditOfficeOpen(!isEditOfficeOpen);
                      }}
                    >
                      Перегляд
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="offices-actions">
            <Button
              text="Додати"
              type="button"
              onClick={() => setAddOfficeOpen(!isAddOfficeOpen)}
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
        </div>
      </div>

      {error && (
        <MessageContainer
          type="error"
          message={[error]}
          style={{ marginTop: "15px" }}
        />
      )}

      <AddOffice
        isOpen={isAddOfficeOpen}
        onAddClick={handleAddOffice}
        onCloseClick={() => setAddOfficeOpen(!isAddOfficeOpen)}
      />

      {selectedOffice && (
        <EditOffice
          isOpen={isEditOfficeOpen}
          onUpdateClick={handleUpdateOffice}
          onDeleteClick={handleDeleteOffice}
          onCloseClick={() => {
            setEditOfficeOpen(!isEditOfficeOpen);
            setSelectedOffice(null);
          }}
          office={selectedOffice}
        />
      )}
    </div>
  );
};

export default OfficesPage;
