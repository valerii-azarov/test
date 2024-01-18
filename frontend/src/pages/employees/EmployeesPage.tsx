import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadEmployeesData, addEmployee, approveEmployee, updateEmployee, deleteEmployee } from "../../redux/actionCreators/employeesCreators";
import { Employee } from "../../interfaces/employee-interface";

import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import AddEmployee from "./add-employee/AddEmployee";
import ApproveEmployee from "./approve-employee/ApproveEmployee";
import EditEmployee from "./edit-employee/EditEmployee";

import "./style.css";

const positionLabels: Record<number, string> = {
  1: "Адміністратор",
  2: "Менеджер",
  3: "Співробітник",
}; 

const statusLabels: Record<number, { status: string; text: string }> = {
  1: { 
    status: "pending",
    text: "В очікуванні",
  },
  2: { 
    status: "approved",
    text: "Схвалено", 
  },
  3: { 
    status: "progress", 
    text: "У процесі",
  },
  4: { 
    status: "activated", 
    text: "Активовано",
  },
  5: { 
    status: "blocked", 
    text: "Заблоковано",
  },
};

const EmployeesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  const { employees, totalItems, error } = useSelector((state: RootState) => state.data.employees.data);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddEmployeeOpen, setAddEmployeeOpen] = useState<boolean>(false);
  const [isApproveEmployeeOpen, setApproveEmployeeOpen] = useState<boolean>(false);
  const [isEditEmployeeOpen, setEditEmployeeOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const handleAddEmployee = (employee: Employee) => {
    dispatch(addEmployee(employee));
    setAddEmployeeOpen(false);
    setCallback(!callback);
  };

  const handleApproveEmployee = (employeeId: number) => {
    dispatch(approveEmployee(employeeId));
    setCallback(!callback);
  };

  const handleUpdateEmployee = (employee: Employee) => {
    dispatch(updateEmployee(employee.id, employee));
    setSelectedEmployee(null);
    setEditEmployeeOpen(false);
    setCallback(!callback);
  };
  
  const handleDeleteEmployee = () => {
    selectedEmployee && dispatch(deleteEmployee(selectedEmployee.id));
    setSelectedEmployee(null);
    setEditEmployeeOpen(false);
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
    dispatch(loadEmployeesData(itemsPerPage, currentPage));
  }, [currentPage, itemsPerPage, callback, dispatch]);

  return (
    <div className="employees__container">
      <div className="employees__wrapper">
        <div className="employees__header">
          <h1 className="employees__title">Співробітники</h1>
          <button
            className="employees__refresh-button"
            onClick={() => setCallback(!callback)}
            title="Update"
          >
            <i className="fa-solid fa-rotate" />
          </button>
        </div>

        <div>
          <table className="employees-table">
            <thead>
              <tr>
                <th className="employee-number">№ співробітника</th>
                <th className="employee-name">ПІБ</th>                
                <th className="employee-position">Посада</th>
                <th className="employee-status">Статус</th>
                <th className="employee-actions">Дії</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id.toString().padStart(8, "0")}</td>
                  <td>{`${employee.surname} ${employee.name} ${employee.patronymic}`}</td>
                  <td>{positionLabels[employee.position_id] || "Невизначено"}</td>
                  <td className={`employee-status ${statusLabels[employee.status_id as number].status}`}>
                    {employee.status_id === 1 ? (
                      <button
                        className="button-approve"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setApproveEmployeeOpen(!isApproveEmployeeOpen);
                        }}
                      >
                        Схвалити
                      </button>
                    ) : (
                      statusLabels[employee.status_id as number].text
                    )}
                  </td>
                  <td>
                    <button
                      className="button-view"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setEditEmployeeOpen(!isEditEmployeeOpen);
                      }}
                    >
                      Перегляд
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="employees-actions">
            <Button
              text="Додати"
              type="button"
              onClick={() => setAddEmployeeOpen(!isAddEmployeeOpen)}
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
        </div>
      </div>

      {error && (
        <MessageContainer
          type="error"
          message={[error]}
          style={{ marginTop: "15px" }}
        />
      )}

      {selectedEmployee && (
        <ApproveEmployee
          isOpen={isApproveEmployeeOpen}
          onApproveClick={handleApproveEmployee}
          onCloseClick={() => {
            setApproveEmployeeOpen(!isApproveEmployeeOpen);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
        />
      )}

      <AddEmployee
        isOpen={isAddEmployeeOpen}
        onAddClick={handleAddEmployee}
        onCloseClick={() => setAddEmployeeOpen(!isAddEmployeeOpen)}
      />

      {selectedEmployee && (
        <EditEmployee
          isOpen={isEditEmployeeOpen}
          onUpdateClick={handleUpdateEmployee}
          onDeleteClick={handleDeleteEmployee}
          onCloseClick={() => {
            setEditEmployeeOpen(!isEditEmployeeOpen);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeesPage;
