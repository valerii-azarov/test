import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Region } from "../../../interfaces/region-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditRegionProps {
  isOpen: boolean;
  onUpdateClick: (region: Region) => void;
  onDeleteClick: () => void;
  onCloseClick: () => void;
  region: Region;
}

interface ValidationErrors {
  [key: string]: string | boolean;
}

const FIELDS = {
  name: "назва регіону",
};

const PATTERNS = {
  name: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const EditRegion: React.FC<EditRegionProps> = ({ isOpen, onUpdateClick, onDeleteClick, onCloseClick, region }) => {
  const { error } = useSelector((state: RootState) => state.data.regions.actions.updateRegion);
  
  const [values, setValues] = useState<Region>(region);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleUpdateRegion = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onUpdateClick(values);
    }
  };

  const handleDeleteRegion = () => {
    onDeleteClick();
  };
  
  const resetForm = () => {
    setErrors({});
    setTouched([]);
  };  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const validate = useCallback((data: Region) => {
    return Object.entries(data).reduce((acc: ValidationErrors, [key, value]) => {
      if (typeof value === "string") {
        const pattern = PATTERNS[key as keyof typeof PATTERNS];

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
    const touchedErrors = Object.keys(validationErrors).reduce((acc: ValidationErrors, key) => {
      if (touched.includes(key)) {
        acc[key] = validationErrors[key];
      }
      return acc;
    }, {});
    setErrors(touchedErrors);
  }, [touched, values, validate]);

  return (
    <div className={`edit-region ${isOpen ? "active" : ""}`}>
      <div className="edit-region__container">
        <div className="edit-region__wrapper">
          <div className="edit-region__header">
            <div className="edit-region__title">Зміна регіону</div>
            <div>
              <div className="edit-region__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-region__content">
            <div className="form__field">
              <label className="form__label">Ідентифікатор регіону</label>
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

            <div className="form__field">
              <label className="form__label">Назва регіону</label>
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

          <div className="edit-region__footer">
            <Button text="Зберегти" type="button" onClick={handleUpdateRegion} />
            <Button text="Видалити" type="button" onClick={handleDeleteRegion} />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditRegion;
