import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { PersonalInfo } from "../../../interfaces/employee-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface ApproveEmployeeProps {
  isOpen: boolean;
  onApproveClick: (employeeId: number) => void;
  onCloseClick: () => void;
  employee: PersonalInfo;
}

const ApproveEmployee: React.FC<ApproveEmployeeProps> = ({ isOpen, onApproveClick, onCloseClick, employee }) => {
  const { activationCode, error } = useSelector((state: RootState) => state.data.employees.actions.approveEmployee);
 
  const [values] = useState<PersonalInfo>(employee);
  const [isCopied, setIsCopied] = useState(false);

  const handleClose = () => {
    onCloseClick();
  };
  
  const handleApproveEmployee = () => {    
    onApproveClick(employee.id);
  };
  
  const copyToClipboard = () => {
    setIsCopied(true);
    activationCode && navigator.clipboard.writeText(activationCode);
    setTimeout(() => setIsCopied(false), 2000);
  }; 
  
  return (
    <div className={`approve-employee ${isOpen ? "active" : ""}`}>
      <div className="approve-employee__container">
        <div className="approve-employee__wrapper">
          <div className="approve-employee__header">
            <div className="approve-employee__title">Схвалення заявки</div>
            <div>
              <div className="approve-employee__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="approve-employee__content">
            <div className="form__field">
              <label className="form__label">Прізвище</label>
              <input
                type="input"
                name="surname"
                minLength={2}
                maxLength={50}
                value={values.surname}
                className="form__input"
                disabled
              />
            </div>

            <div className="form__field">
              <label className="form__label">Ім'я</label>
              <input
                type="input"
                name="name"
                minLength={2}
                maxLength={50}
                value={values.name}
                className="form__input"
                disabled
              />
            </div>

            <div className="form__field">
              <label className="form__label">По-батькові</label>
              <input
                type="input"
                name="patronymic"
                minLength={2}
                maxLength={50}
                value={values.patronymic}
                className="form__input"
                disabled
              />
            </div>

            <div className="form__field">
              <label className="form__label">Номер телефону</label>
              <input
                type="input"
                name="phone"
                size={13}
                minLength={13}
                maxLength={13}
                value={values.phone}
                className="form__input"
                disabled
              />
            </div>

            <div className="form__field">
              <label className="form__label">Електронна пошта</label>
              <input
                type="input"
                name="email"
                minLength={5}
                maxLength={50}
                value={values.email}
                className="form__input"
                disabled
              />
            </div>

            {activationCode && (
              <div className="form__field">
                <label className="form__label">Код активації</label>
                <div className={`form__copy-code${isCopied ? ' active' : ''}`}>
                  <input
                    type="input"
                    name="activationCode"
                    value={activationCode}
                    className="form__input"
                    disabled
                  />
                  <button onClick={copyToClipboard}>
                    <i className="fa fa-clone" />
                  </button>                  
                </div>                
              </div>
            )}

            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} 
          </div>

          <div className="approve-employee__footer">
            <Button text="Схвалити" type="button" onClick={handleApproveEmployee} />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default ApproveEmployee;
