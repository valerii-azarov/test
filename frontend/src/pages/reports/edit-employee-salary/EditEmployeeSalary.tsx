import React, { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EmployeeSalary } from "../../../interfaces/employee-salary-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditEmployeeSalaryProps {
  isOpen: boolean;
  onUpdateClick: (employeeSalary: EmployeeSalary) => void;
  onCloseClick: () => void;
  employeeSalary: EmployeeSalary;
}

const EditEmployeeSalary: React.FC<EditEmployeeSalaryProps> = ({ isOpen, onUpdateClick, onCloseClick, employeeSalary }) => {
  const { error } = useSelector((state: RootState) => state.data.employeeSalaries.actions.updateEmployee);

  const [values, setValues] = useState<EmployeeSalary>(employeeSalary);

  const handleClose = () => {
    onCloseClick();
  };
  
  const handleUpdateEmployeeSalary = () => {
    onUpdateClick(values);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ 
      ...values, 
      [event.target.name]: event.target.value 
    });
  };

  return (
    <div className={`edit-employee-salary ${isOpen ? "active" : ""}`}>
      <div className="edit-employee-salary__container">
        <div className="edit-employee-salary__wrapper">
          <div className="edit-employee-salary__header">
            <div className="edit-employee-salary__title">Дані про запис</div>
            <div>
              <div className="edit-employee-salary__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-employee-salary__content">
            <div className="form__field">
              <label className="form__label">
                Ідентифікатор записи
              </label>
              <label className="form__label">
                <b>{values.id.toString().padStart(8, "0")}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Ідентифікатор співробітника
              </label>
              <label className="form__label">
                <b>{values.employee_id.toString().padStart(8, "0")}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                ПІБ
              </label>
              <label className="form__label">
                <b>{`${values.surname} ${values.name} ${values.patronymic}`}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Дата
              </label>
              <label className="form__label">
                <b>{moment(values.start_period).format("YYYY/MM/DD")} - {moment(values.end_period).format("YYYY/MM/DD")}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Кількість відпрацьованих годин
              </label>
              <label className="form__label">
                <b>{values.worked_hours}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Сума з ПДВ
              </label>
              <label className="form__label">
                <b>{`${Number(values.amount).toFixed(2)} грн`}</b>
              </label>
            </div>

             <div className="form__field">
              <label className="form__label">Статус</label>
              <select
                name="is_paid"
                value={String(values.is_paid)}
                onChange={handleChange}
                className="form__input"
              >
                <option value="" disabled>Не обрано</option>
                <option value="true">Виплачена</option>
                <option value="false">Не виплачена</option>
              </select>
            </div>    

            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} 
          </div>

          <div className="edit-employee-salary__footer">
            <Button text="Зберегти" type="button" onClick={handleUpdateEmployeeSalary} />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditEmployeeSalary;
