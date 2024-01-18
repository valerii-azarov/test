import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { loadServicesData } from "../../../../redux/actionCreators/servicesCreators";
import { ServiceInfo } from "../../../../interfaces/service-info-interface";

import Button from "../../../../components/Button/Button";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface AddServiceInfoProps {
  isOpen: boolean;
  onAddClick: (serviceInfo: ServiceInfo) => void;
  onCloseClick: () => void;
}

const initialState: ServiceInfo = {
  id: 0,
  service_id: 0,
  description: "",
  required_documents: "",
  regulatory_documents: "",
  delivery_time: "",
  price_id: 0,
};

const FIELDS = {
  service_id: "послуга",
  description: "опис",
  required_documents: "необхідні документи",
  regulatory_documents: "нормативні документи",
  delivery_time: "строки надання",
  price_id: "вартість",
};

const PATTERNS = {
  description: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  required_documents: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  regulatory_documents: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  delivery_time: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const AddServiceInfo: React.FC<AddServiceInfoProps> = ({ isOpen, onAddClick, onCloseClick }) => {
  const dispatch: AppDispatch = useDispatch();
  
  const { services, error } = useSelector((state: RootState) => state.data.services.data);
  
  const [values, setValues] = useState<ServiceInfo>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleAddService = () => {
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

  const validate = useCallback((data: ServiceInfo) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];

      if (typeof value === "string") {
        const stringFields = ["service_id", "price_id"];
          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else if (!stringFields.includes(key) && !pattern.test(value)) {
          acc[key] = ERROR_MESSAGES.patternMismatch(FIELDS[key as keyof typeof FIELDS]);
        }
      } else if (typeof value === "number") {
        const numericFields = ["service_id", "price_id"];
          
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
    <div className={`add-service-info ${isOpen ? "active" : ""}`}>
      <div className="add-service-info__container">
        <div className="add-service-info__wrapper">
          <div className="add-service-info__header">
            <div className="add-service-info__title">Додавання нової інформації про послугу</div>
            <div>
              <div className="add-service-info__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="add-service-info__content">
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
              <label className="form__label">Опис</label>
              <textarea
                name="description"
                rows={10}
                cols={45}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__textarea ${errors.description ? "invalid" : ""}`}
              />
              {errors.description && (
                <label className="error">{errors.description}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Необхідні документи</label>
              <textarea
                name="required_documents"
                rows={15}
                cols={45}
                value={values.required_documents}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__textarea ${errors.required_documents ? "invalid" : ""}`}
              />
              {errors.required_documents && (
                <label className="error">{errors.required_documents}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Нормативні документи</label>
              <textarea
                name="regulatory_documents"
                rows={15}
                cols={45}
                value={values.regulatory_documents}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__textarea ${errors.regulatory_documents ? "invalid" : ""}`}
              />              
              {errors.regulatory_documents && (
                <label className="error">{errors.regulatory_documents}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Строки надання</label>
              <textarea
                name="delivery_time"
                rows={5}
                cols={45}
                value={values.delivery_time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__textarea ${errors.delivery_time ? "invalid" : ""}`}
              />              
              {errors.delivery_time && (
                <label className="error">{errors.delivery_time}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Вартість</label>
              <select
                name="price_id"
                value={values.price_id}
                onChange={handleChange}
                className="form__input"
              >
                <option value={0} disabled>Не обрано</option>
                <option value={1}>Платно</option>
                <option value={2}>Безкоштовно</option>
              </select>
              {errors.price_id && (
                <label className="error">{errors.price_id}</label>
              )}
            </div>

            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} 
          </div>

          <div className="add-service-info__footer">
            <Button 
              text="Додати" 
              type="button" 
              onClick={handleAddService}
            />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default AddServiceInfo;
