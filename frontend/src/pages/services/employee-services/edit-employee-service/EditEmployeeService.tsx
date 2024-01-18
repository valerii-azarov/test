import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { loadServicesData } from "../../../../redux/actionCreators/servicesCreators";
import { EmployeeService } from "../../../../interfaces/employee-service-interface";

import Button from "../../../../components/Button/Button";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditEmployeeServiceProps {
  isOpen: boolean;
  onUpdateClick: (employeeService: EmployeeService) => void;
  onDeleteClick: () => void;
  onCloseClick: () => void;
  employeeService: EmployeeService;
}

const FIELDS = {
  service_id: "послуга",
  start_time: "час початку",
  end_time: "час закінчення	",
  interval: "тривалість",
  day_of_week_id: "день тижня",
};

const PATTERNS = {
  interval: /^\d+$/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  intervalFormat: "Будь ласка, введіть числове.",
};

const EditEmployeeService: React.FC<EditEmployeeServiceProps> = ({ isOpen, onUpdateClick, onDeleteClick, onCloseClick, employeeService }) => {
  const dispatch: AppDispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const { services, error } = useSelector((state: RootState) => state.data.services.data);

  const [values, setValues] = useState<EmployeeService>(employeeService);  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  delete values.service_name;
  delete values.office_id;

  const isEmployee = user.role_id === 3;

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleUpdateEmployeeService = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onUpdateClick(values);
    }
  };

  const handleDeleteEmployeeService = () => {
    onDeleteClick();
  };
  
  const resetForm = () => {
    setErrors({});
    setTouched([]);
  };  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues({ 
      ...values, 
      [event.target.name]: event.target.value 
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!touched.includes(event.target.name)) {
      setTouched([
        ...touched, 
        event.target.name
      ]);
    }
  };

  const validate = useCallback((data: EmployeeService) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];

      if (typeof value === "string") {
        const stringFields = ["start_time", "end_time", "service_id", "day_of_week_id"];
          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else if (!stringFields.includes(key) && !pattern.test(value)) {
          acc[key] = ERROR_MESSAGES.intervalFormat;
        }
      } else if (typeof value === "number") {
        const numericFields = ["service_id", "day_of_week_id"];
          
        if (numericFields.includes(key) && value === 0) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        }
      }
  
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    const validationErrors = validate(values);
    const touchedErrors = Object.keys(validationErrors).reduce((acc: Record<string, string>, key) => {
      if (touched.includes(key)) {
        acc[key] = validationErrors[key];
      }
      return acc;
    }, {});
    setErrors(touchedErrors);
  }, [touched, values, validate]);

  useEffect(() => {
    dispatch(loadServicesData());
  }, [dispatch]);

  return (
    <div className={`edit-edit-employee ${isOpen ? "active" : ""}`}>
      <div className="edit-edit-employee__container">
        <div className="edit-edit-employee__wrapper">
          <div className="edit-edit-employee__header">
            <div className="edit-edit-employee__title">Зміна послуги</div>
            <div>
              <div className="edit-edit-employee__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-edit-employee__content">
            <div className="form__field">
              <label className="form__label">Ідентифікатор послуги</label>
              <input
                type="input"
                name="id"
                minLength={2}
                maxLength={50}
                value={values.id.toString().padStart(8, "0")}
                className="form__input"
                disabled
              />
            </div>

            {services.length > 0 && (
              <div className="form__field">
                <label className="form__label">Послуга</label>
                <select
                  name="service_id"
                  value={values.service_id}
                  onChange={handleChange}
                  className="form__input"
                >
                  <option value={0} disabled>Не обрано</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id} title={service.name}>
                      {service.name.length > 30 ? `${service.name.slice(0, 30)}...` : service.name}
                    </option>
                  ))}
                </select>
                {errors.service_id && <label className="error">{errors.service_id}</label>}
              </div>
            )}

            <div className="form__field">
              <label className="form__label">Час початку</label>
              <input
                type="time"
                name="start_time"               
                value={values.start_time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.start_time ? "invalid" : ""}`}
              />             
              {errors.start_time && (
                <label className="error">{errors.start_time}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Час закінчення</label>
              <input
                type="time"
                name="end_time"               
                value={values.end_time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.end_time ? "invalid" : ""}`}
              />             
              {errors.end_time && (
                <label className="error">{errors.end_time}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Тривалість (хв.)</label>
              <input
                type="input"
                name="interval"
                minLength={1}
                maxLength={3}
                value={values.interval}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.interval ? "invalid" : ""}`}
              />             
              {errors.interval && (
                <label className="error">{errors.interval}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Послуга</label>
              <select
                name="day_of_week_id"
                value={values.day_of_week_id}
                onChange={handleChange}
                className="form__input"
              >
                <option value={0} disabled>Не обрано</option>
                <option value={1}>Понеділок</option>
                <option value={2}>Вівторок</option>
                <option value={3}>Середа</option>
                <option value={4}>Четвер</option>
                <option value={5}>П'ятниця</option>
                <option value={6}>Субота</option>
                <option value={7}>Неділя</option>
              </select>
              {errors.day_of_week_id && <label className="error">{errors.day_of_week_id}</label>}
            </div>

            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} 
          </div>

          <div className="edit-edit-employee__footer">
            <Button 
              text="Зберегти" 
              type="button" 
              onClick={handleUpdateEmployeeService}
              disabled={!isEmployee}
            />
            <Button 
              text="Видалити" 
              type="button" 
              onClick={handleDeleteEmployeeService}
              disabled={!isEmployee} 
            />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditEmployeeService;
