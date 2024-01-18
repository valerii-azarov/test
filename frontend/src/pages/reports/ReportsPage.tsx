import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { loadReportsData } from "../../redux/actionCreators/reportsCreators";
import { loadEmployeeSalariesData, updateEmployeeSalary } from "../../redux/actionCreators/employeeSalariesCreators";
import { EmployeeSalary } from "../../interfaces/employee-salary-interface";

import Pagination from "../../components/Pagination/Pagination";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import EditEmployeeSalary from "./edit-employee-salary/EditEmployeeSalary";

import "./style.css";

const ReportsPage: React.FC = () => {
  const currentDate = moment();

  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { isPaid, totalReports, dailyReports } = useSelector((state: RootState) => state.data.reports.data);
  const { employeeSalaries, totalItems } = useSelector((state: RootState) => state.data.employeeSalaries.data);

  const [selectedEmployeeSalary, setSelectedEmployeeSalary] = useState<EmployeeSalary | null>(null);
  const [isEditEmployeeSalaryOpen, setEditEmployeeSalaryOpen] = useState<boolean>(false);
  const [callback, setCallback] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const isAdmin = user.role_id === 1;
  const isEmployee = user.role_id === 3;

  const handleUpdateEmployeeSalary = (employeeSalary: EmployeeSalary) => {
    dispatch(updateEmployeeSalary(employeeSalary.employee_id, employeeSalary));
    setSelectedEmployeeSalary(null);
    setEditEmployeeSalaryOpen(false);
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
    isAdmin && dispatch(loadEmployeeSalariesData(itemsPerPage, currentPage));
    (isEmployee && user.id) && dispatch(loadReportsData(user.id));
  }, [currentPage, itemsPerPage, user.id, isAdmin, isEmployee, callback, dispatch]);

  return (
    <div className="reports__container">
      <div className="reports__wrapper">
        <div className="reports__top">
          <div className="reports__header">
            <h1 className="reports__title">
              {isEmployee ? "Звіти" : "Облік зарплати співробітників"}
            </h1>
            {isAdmin && (
              <button
                className="reports__refresh-button"
                onClick={() => setCallback(!callback)}
                title="Оновити"
              >
                <i className="fa-solid fa-rotate" />
              </button>
            )}
          </div>
          
          {(isEmployee) && (
              <MessageContainer
              type={isPaid ? "success" : "info"}
              message={[
                isPaid 
                  ? `Зарплата в розмірі ${Number(totalReports.totalSalaryWithTax).toFixed(2)} грн успішно виплачена. Дякуємо за вашу працю!` 
                  : "Зарплата ще не виплачена. Будь ласка, зачекайте на її обробку."
              ]}
            />
          )}
        </div>

        <div className="reports__bottom">
          {isEmployee && (
            <div className="reports__header">
              <h1 className="reports__title">{`За ${moment(currentDate).format("MMMM YYYY")} року`}</h1>
              <button
                className="reports__refresh-button"
                onClick={() => setCallback(!callback)}
                title="Оновити"
              >
                <i className="fa-solid fa-rotate" />
              </button>
            </div>
          )}

          {isEmployee ? (
            <div>
              <table className="reports-table">
                <thead>
                  <tr>
                    <th className="report-number">№</th>
                    <th className="report-date">Дата</th>
                    <th className="report-bookings">Кількість виконаних заявок</th>
                    <th className="report-worked-hours">Кількість відпрацьованих годин</th>
                    <th className="report-without-tax">Сума без ПДВ</th>
                    <th className="report-vat-from-total">ПДВ</th>
                    <th className="report-with-tax">Сума з ПДВ</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(dailyReports).map(([date, report], index) => (
                    <tr key={date}>
                      <td>{(index + 1).toString().padStart(8, "0")}</td>
                      <td>{moment(date).format("DD/MM/YYYY")}</td>
                      <td>{report.totalBookings > 0 ? report.totalBookings : "-"}</td>
                      <td>{report.totalWorkedHours > 0 ? report.totalWorkedHours : "-"}</td>
                      <td>{report.totalSalaryWithoutTax > 0 ? `${Number(report.totalSalaryWithoutTax).toFixed(2)} грн` : "-"}</td>
                      <td>{report.vatFromTotalSalary > 0 ? `${Number(report.vatFromTotalSalary).toFixed(2)} грн` : "-"}</td>
                      <td>{report.totalSalaryWithTax > 0 ? `${Number(report.totalSalaryWithTax).toFixed(2)} грн` : "-"}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>Всього:</td>
                    <td>{totalReports.totalBookings}</td>
                    <td>{totalReports.totalWorkedHours}</td>
                    <td>{`${Number(totalReports.totalSalaryWithoutTax).toFixed(2)} грн`}</td>
                    <td>{`${Number(totalReports.vatFromTotalSalary).toFixed(2)} грн`}</td>
                    <td>{`${Number(totalReports.totalSalaryWithTax).toFixed(2)} грн`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <table className="employee-salaries-table">
                <thead>
                  <tr>
                    <th className="employee-salary-number">№</th>
                    <th className="employee-salary-name">ПІБ</th>                
                    <th className="employee-salary-date">Дата</th>
                    <th className="employee-salary-worked-hours">Кількість відпрацьованих годин</th>
                    <th className="employee-salary-with-tax">Сума з ПДВ</th>
                    <th className="employee-salary-status">Статус</th>
                    <th className="employee-salary-actions">Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeSalaries.map((employeeSalary) => (
                    <tr key={employeeSalary.id}>
                      <td>{employeeSalary.id.toString().padStart(8, "0")}</td>
                      <td>{`${employeeSalary.surname} ${employeeSalary.name.charAt(0)}.${employeeSalary.patronymic.charAt(0)}.`}</td>
                      <td>
                        {moment(employeeSalary.start_period).format("YYYY/MM/DD")} - {moment(employeeSalary.end_period).format("YYYY/MM/DD")}
                      </td>
                      <td>{employeeSalary.worked_hours}</td>
                      <td>{`${Number(employeeSalary.amount).toFixed(2)} грн`}</td>
                      <td className={`employee-salary-status ${employeeSalary.is_paid ? "paid" : "not-paid"}`}>
                        {employeeSalary.is_paid ? "Виплачена" : "Не виплачена"}
                      </td>               
                      <td>
                        <button
                          className="button-view"
                          onClick={() => {
                            setSelectedEmployeeSalary(employeeSalary);
                            setEditEmployeeSalaryOpen(!isEditEmployeeSalaryOpen);
                          }}
                        >
                          Перегляд
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="employee-salaries-actions">
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
          )}
        </div>
      </div>

      {(isAdmin && selectedEmployeeSalary) && (
        <EditEmployeeSalary
          isOpen={isEditEmployeeSalaryOpen}
          onUpdateClick={handleUpdateEmployeeSalary}
          onCloseClick={() => {
            setEditEmployeeSalaryOpen(!isEditEmployeeSalaryOpen);
            setSelectedEmployeeSalary(null);
          }}
          employeeSalary={selectedEmployeeSalary}
        />
      )}
    </div>
  );
};

export default ReportsPage;
