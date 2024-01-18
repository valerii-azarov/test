import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadEmployeeServicesData } from "../../../redux/actionCreators/employeeServicesCreators";
import { EmployeeService } from "../../../interfaces/employee-service-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import AddEmployeeService from "./add-employee-service/AddEmployeeService";
import EditEmployeeService from "./edit-employee-service/EditEmployeeService";

import "./style.css";

const EmployeeServicesContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { employeeServices, totalItems, error } = useSelector((state: RootState) => state.data.employeeServices.data);
  
  const isEmployee = user.role_id === 3;

  const [selectedEmployeeService, setSelectedEmployeeService] = useState<EmployeeService | null>(null);
  const [isAddEmployeeServiceOpen, setAddEmployeeServiceOpen] = useState<boolean>(false);
  const [isEditEmployeeServiceOpen, setEditEmployeeServiceOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const dayLabels: Record<number, string> = {
    1: "Понеділок",
    2: "Вівторок",
    3: "Середа",
    4: "Четвер",
    5: "П'ятниця",
    6: "Субота",
    7: "Неділя",
  }; 

  const handleAddEmployeeService = (employeeService: EmployeeService) => {
    console.log(employeeService);
    setAddEmployeeServiceOpen(false);
    setCallback(!callback);
  };

  const handleUpdateEmployeeService = (employeeService: EmployeeService) => {
    console.log(employeeService);
    setSelectedEmployeeService(null);
    setEditEmployeeServiceOpen(false);
    setCallback(!callback);
  };

  const handleDeleteEmployeeService = () => {
    selectedEmployeeService && console.log("employeeService deleted");
    setSelectedEmployeeService(null);
    setEditEmployeeServiceOpen(false);
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
    user.id && dispatch(loadEmployeeServicesData({ employeeId: user.id, currentPage, itemsPerPage} ));
  }, [user.id, currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="employee-services__container">
      <div className="employee-services__header">
        <h1 className="employee-services__title">Мої послуги</h1>
        <button 
          className="employee-services__refresh-button" 
          onClick={() => setCallback(!callback)}
          title="Update"
        >
          <i className="fa-solid fa-rotate" />
        </button>
      </div>

      <table className="employee-services-table">
        <thead>
          <tr>
            <th className="employee-service-number">№ послуги</th>
            <th className="employee-service-name">Назва послуги</th>
            <th className="employee-service-start-time">Час початку</th>
            <th className="employee-service-end-time">Час закінчення</th>
            <th className="employee-service-end-day">День тижня</th>
            <th className="employee-service-interval">Тривалість</th>
            <th className="employee-service-actions">Дії</th>
          </tr>
        </thead>
        <tbody>
          {employeeServices.map((employeeService) => (
            <tr key={employeeService.id}>
              <td>{employeeService.id.toString().padStart(8, "0")}</td>
              <td>{employeeService.service_name}</td>
              <td>{moment(employeeService.start_time, "HH:mm:ss").format("HH:mm")}</td>
              <td>{moment(employeeService.end_time, "HH:mm:ss").format("HH:mm")}</td>
              <td>{dayLabels[employeeService.day_of_week_id]}</td>
              <td>{`${employeeService.interval} хв.`}</td>
              <td>
                <button
                  className="button-view"
                  onClick={() => {
                    setSelectedEmployeeService(employeeService);
                    setEditEmployeeServiceOpen(!isEditEmployeeServiceOpen);
                  }}
                >
                  Перегляд
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="employee-services-actions">
        <Button
          text="Додати"
          type="button"
          onClick={() => setAddEmployeeServiceOpen(!isAddEmployeeServiceOpen)}
          disabled={!isEmployee}
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

      <AddEmployeeService
        isOpen={isAddEmployeeServiceOpen}
        onAddClick={handleAddEmployeeService}
        onCloseClick={() => setAddEmployeeServiceOpen(!isAddEmployeeServiceOpen)}
      />

      {selectedEmployeeService && (
        <EditEmployeeService
          isOpen={isEditEmployeeServiceOpen}
          onUpdateClick={handleUpdateEmployeeService}
          onDeleteClick={handleDeleteEmployeeService}
          onCloseClick={() => {
            setEditEmployeeServiceOpen(!isEditEmployeeServiceOpen);
            setSelectedEmployeeService(null);
          }}
          employeeService={selectedEmployeeService}
        />
      )}
    </div>
  );
};

export default EmployeeServicesContainer;
