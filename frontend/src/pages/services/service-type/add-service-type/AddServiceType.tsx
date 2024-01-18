import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { loadServicesData } from "../../../../redux/actionCreators/servicesCreators";
import { ServiceType } from "../../../../interfaces/service-type-interface";

import Button from "../../../../components/Button/Button";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface AddServiceTypeProps {
  isOpen: boolean;
  onAddClick: (serviceType: ServiceType) => void;
  onCloseClick: () => void;
}

const initialState: ServiceType = {
  id: 0,
  name: "",
  service_id: 0,
};

const FIELDS = {
  name: "назва виду послуги",
  service_id: "послуга",
};

const PATTERNS = {
  name: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const AddServiceType: React.FC<AddServiceTypeProps> = ({ isOpen, onAddClick, onCloseClick }) => {
  const dispatch: AppDispatch = useDispatch();
  
  const { services, error } = useSelector((state: RootState) => state.data.services.data);
  
  const [values, setValues] = useState<ServiceType>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleAddServiceType = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onAddClick(values);
    }
  };
  
  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setTouched([]);
  };  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ 
      ...values, 
      [event.target.name]: event.target.value 
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!touched.includes(event.target.name)) {
      setTouched([
        ...touched, 
        event.target.name
      ]);
    }
  };

  const validate = useCallback((data: ServiceType) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];
  
      if (typeof value === "string") {
        const stringFields = ["service_id"];
          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else if (!stringFields.includes(key) && !pattern.test(value)) {
          acc[key] = ERROR_MESSAGES.patternMismatch(FIELDS[key as keyof typeof FIELDS]);  
        }
      } else if (typeof value === "number") {
        const numericFields = ["service_id"];
          
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
    <div className={`add-service-type ${isOpen ? "active" : ""}`}>
      <div className="add-service-type__container">
        <div className="add-service-type__wrapper">
          <div className="add-service-type__header">
            <div className="add-service-type__title">Додавання нового виду послуги</div>
            <div>
              <div className="add-service-type__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="add-service-type__content">
            <div className="form__field">
              <label className="form__label">Назва виду послуги</label>
              <input
                type="input"
                name="name"
                minLength={2}
                maxLength={50}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.name ? "invalid" : ""}`}
              />
              {errors.name && (
                <label className="error">{errors.name}</label>
              )}
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

            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} 
          </div>

          <div className="add-service-type__footer">
            <Button 
              text="Додати" 
              type="button" 
              onClick={handleAddServiceType}
            />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default AddServiceType;
