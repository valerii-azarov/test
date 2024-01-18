import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Category } from "../../../../interfaces/category-interface";

import Button from "../../../../components/Button/Button";
import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditCategoryProps {
  isOpen: boolean;
  onUpdateClick: (category: Category) => void;
  onDeleteClick: () => void;
  onCloseClick: () => void;
  category: Category;
}

const FIELDS = {
  name: "назва категорії",
};

const PATTERNS = {
  name: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const EditCategory: React.FC<EditCategoryProps> = ({ isOpen, onUpdateClick, onDeleteClick, onCloseClick, category }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.data.categories.data);

  const [values, setValues] = useState<Category>(category);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const isAdmin = user.role_id === 1;

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleUpdateCategory = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onUpdateClick(values);
    }
  };

  const handleDeleteCategory = () => {
    onDeleteClick();
  };

  const resetForm = () => {
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

  const validate = useCallback((data: Category) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];
  
      if (typeof value === "string") {          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else if (!pattern.test(value)) {
          acc[key] = ERROR_MESSAGES.patternMismatch(FIELDS[key as keyof typeof FIELDS]);
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

  return (
    <div className={`edit-category ${isOpen ? "active" : ""}`}>
      <div className="edit-category__container">
        <div className="edit-category__wrapper">
          <div className="edit-category__header">
            <div className="edit-category__title">Зміна послуги</div>
            <div>
              <div className="edit-category__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-category__content">
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

            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} 
          </div>

          <div className="edit-category__footer">
            <Button 
              text="Зберегти" 
              type="button" 
              onClick={handleUpdateCategory}
              disabled={!isAdmin}
            />
            <Button 
              text="Видалити" 
              type="button" 
              onClick={handleDeleteCategory}
              disabled={!isAdmin} 
            />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditCategory;
