import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadCitiesData } from "../../../redux/actionCreators/citiesCreators";
import { Office } from "../../../interfaces/office-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditOfficeProps {
  isOpen: boolean;
  onUpdateClick: (office: Office) => void;
  onDeleteClick: () => void;
  onCloseClick: () => void;
  office: Office;
}

const FIELDS = {
  name: "назва ЦНАПу",
  address: "адреса",
  cityId: "місто",
  statusId: "статус",
};

const PATTERNS = {
  name: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  address: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const EditOffice: React.FC<EditOfficeProps> = ({ isOpen, onUpdateClick, onDeleteClick, onCloseClick, office }) => {
  const dispatch: AppDispatch = useDispatch();
  

  const { cities } = useSelector((state: RootState) => state.data.cities.data);
  const { error } = useSelector((state: RootState) => state.data.offices.actions.addOffice);

  const [values, setValues] = useState<Office>(office);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleUpdateoffice = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onUpdateClick(values);
    }
  };

  const handleDeleteoffice = () => {
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

  const validate = useCallback((data: Office) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      if (typeof value === "string") {
        const pattern = PATTERNS[key as keyof typeof PATTERNS];

        if (pattern && !value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else if (pattern && !pattern.test(value)) {
          acc[key] = ERROR_MESSAGES.patternMismatch(FIELDS[key as keyof typeof FIELDS]);
        }
      } else if (typeof value === "number") {
        const numericFields = ["cityId", "statusId"];
  
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
    dispatch(loadCitiesData());
  }, [dispatch]);

  return (
    <div className={`edit-office ${isOpen ? "active" : ""}`}>
      <div className="edit-office__container">
        <div className="edit-office__wrapper">
          <div className="edit-office__header">
            <div className="edit-office__title">Зміна ЦНАПу</div>
            <div>
              <div className="edit-office__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-office__content">
            <div className="form__field">
              <label className="form__label">Ідентифікатор ЦНАПу</label>
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
              <label className="form__label">Назва ЦНАПу</label>
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

            <div className="form__field">
              <label className="form__label">Адреса</label>
              <input
                type="input"
                name="address"
                minLength={2}
                maxLength={50}
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.address ? "invalid" : ""}`}
              />
              {errors.address && (
                <label className="error">{errors.address}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Назва міста</label>
              <select
                name="cityId"
                value={values.cityId}
                onChange={handleChange}
                className="form__input"
              >
                <option value={0} disabled>Не обрано</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.cityId && <label className="error">{errors.cityId}</label>}
            </div>

            <div className="form__field">
              <label className="form__label">Статус міста</label>
              <select
                name="statusId"
                value={values.statusId}
                onChange={handleChange}
                className="form__input"
              >
                <option value={0} disabled>Не обрано</option>              
                <option value={1}>Відчинено</option>   
                <option value={2}>Зачинено</option>                 
                <option value={2}>Тимчасово не працює</option>
              </select>
              {errors.statusId && <label className="error">{errors.statusId}</label>}
            </div>
            
            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )}
          </div>

          <div className="edit-office__footer">
            <Button text="Зберегти" type="button" onClick={handleUpdateoffice} />
            <Button text="Видалити" type="button" onClick={handleDeleteoffice} />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditOffice;
