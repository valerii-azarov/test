import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { loadCategoriesData } from "../../../../redux/actionCreators/categoriesCreators";
import { Service } from "../../../../interfaces/service-interface";

import Button from "../../../../components/Button/Button";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface AddServiceProps {
  isOpen: boolean;
  onAddClick: (service: Service) => void;
  onCloseClick: () => void;
}

const initialState: Service = {
  id: 0,
  name: "",
  category_id: 0,
};

const FIELDS = {
  name: "назва послуги",
  category_id: "категорія",
};

const PATTERNS = {
  name: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const AddService: React.FC<AddServiceProps> = ({ isOpen, onAddClick, onCloseClick }) => {
  const dispatch: AppDispatch = useDispatch();
  
  const { categories, error } = useSelector((state: RootState) => state.data.categories.data);
  
  const [values, setValues] = useState<Service>(initialState);
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

  const validate = useCallback((data: Service) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];
  
      if (typeof value === "string") {
        const stringFields = ["category_id"];
          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else {                    
          if (!stringFields.includes(key) && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.patternMismatch(FIELDS[key as keyof typeof FIELDS]);
          }
        }
      } else if (typeof value === "number") {
        const numericFields = ["category_id"];
          
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
    dispatch(loadCategoriesData());
  }, [dispatch]);

  return (
    <div className={`add-service ${isOpen ? "active" : ""}`}>
      <div className="add-service__container">
        <div className="add-service__wrapper">
          <div className="add-service__header">
            <div className="add-service__title">Додавання нової послуги</div>
            <div>
              <div className="add-service__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="add-service__content">
            <div className="form__field">
              <label className="form__label">Назва послуги</label>
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

            {categories.length > 0 && (
              <div className="form__field">
                <label className="form__label">Категорія</label>
                <select
                  name="category_id"
                  value={values.category_id}
                  onChange={handleChange}
                  className="form__input"
                >
                  <option value={0} disabled>Не обрано</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} title={category.name}>
                      {category.name.length > 30 ? `${category.name.slice(0, 30)}...` : category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <label className="error">{errors.category_id}</label>}
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

          <div className="add-service__footer">
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

export default AddService;
