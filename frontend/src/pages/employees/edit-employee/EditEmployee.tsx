import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadRegionsData } from "../../../redux/actionCreators/regionsCreators";
import { loadCitiesByRegionData } from "../../../redux/actionCreators/citiesCreators";
import { loadOfficesByCityData } from "../../../redux/actionCreators/officesCreators";
import { Employee } from "../../../interfaces/employee-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditEmployeeProps {
  isOpen: boolean;
  onUpdateClick: (employee: Employee) => void;
  onDeleteClick: () => void;
  onCloseClick: () => void;
  employee: Employee;
}

const FIELDS = {
  surname: "прізвище",
  name: "ім'я",
  patronymic: "по-батькові",
  phone: "номер телефону",
  email: "електронна пошта",
  username: "ім'я користувача",
  password: "пароль",
  confirmPassword: "підтвердження паролю",
  status_id: "статус",
  role_id: "роль",
  position_id: "посада",
  region_id: "область",
  city_id: "місто",
  office_id: "адреса ЦНАПу",
};

const PATTERNS = {
  surname: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  name: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  patronymic: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  phone: /\+380\d{9}$/,
  email: /^[^@]+@(?!.*(?:mail\.ru|yandex\.ru|ya\.ru)).*$/i,
  username: /^[a-zA-Z0-9_.]{3,20}$/,
  password: /^[a-zA-Z0-9_.!@#$%^&*()-+=<>?/[\]{}|~]{8,}$/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  phoneFormat: "Номер телефону має містити 13 символів, зокрема +380 та 9 цифр номера.",
  emailFormat: "Будь ласка, введіть правильний формат електронної пошти та уникайте використання доменів, пов'язаних із країною-агресором.",
  usernameFormat: "Ім'я користувача повинно містити літери, цифри та підкреслення.",
  passwordFormat: "Пароль повинен містити принаймні одну літеру, одну цифру, та може включати спеціальні символи. Довжина паролю повинна бути не менше 8 символів.",
  confirmPassword: "Підтвердження паролю повинно співпадати з паролем.",
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const EditEmployee: React.FC<EditEmployeeProps> = ({ isOpen, onUpdateClick, onDeleteClick, onCloseClick, employee }) => {
  const dispatch: AppDispatch = useDispatch();
  
  const { regions } = useSelector((state: RootState) => state.data.regions.data);
  const { cities } = useSelector((state: RootState) => state.data.cities.dataByRegion);
  const { offices } = useSelector((state: RootState) => state.data.offices.dataByCity);

  const { error } = useSelector((state: RootState) => state.data.employees.actions.updateEmployee);

  const [values, setValues] = useState<Employee>({ ...employee, password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleUpdateEmployee = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onUpdateClick(values);
    }
  };

  const handleDeleteEmployee = () => {
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

  const validate = useCallback((data: Employee) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];
  
      if (typeof value === "string") {
        const stringFields = ["phone", "email", "username", "password", "confirmPassword", "status_id" ,"role_id", "position_id", "region_id", "city_id", "office_id"];
          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else {        
          if (key === "phone" && (!data.phone.startsWith("+380") || data.phone.slice(4).length !== 9)) {
            acc[key] = ERROR_MESSAGES.phoneFormat;
          } 
          
          if (key === "email" && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.emailFormat;
          } 
          
          if (key === "username" && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.usernameFormat;
          } 
          
          if (key === "password" && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.passwordFormat;
          } 
          
          if (key === "confirmPassword" && value !== data.password) {
            acc[key] = ERROR_MESSAGES.confirmPassword;
          } 
          
          if (!stringFields.includes(key) && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.patternMismatch(FIELDS[key as keyof typeof FIELDS]);
          }
        }
      } else if (typeof value === "number") {
        const numericFields = ["status_id", "role_id", "position_id", "region_id", "city_id", "office_id"];
          
        if (numericFields.includes(key) && value === 0) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        }
      }
  
      return acc;
    }, {});
  }, []);
  

  useEffect(() => {
    const val_idationErrors = validate(values);
    const touchedErrors = Object.keys(val_idationErrors).reduce((acc: Record<string, string>, key) => {
      if (touched.includes(key)) {
        acc[key] = val_idationErrors[key];
      }
      return acc;
    }, {});
    setErrors(touchedErrors);
  }, [touched, values, validate]);

  useEffect(() => {
    dispatch(loadRegionsData());
    values.region_id && dispatch(loadCitiesByRegionData(values.region_id));
    values.city_id && dispatch(loadOfficesByCityData(values.city_id));
  }, [values.region_id, values.city_id, dispatch]);

  return (
    <div className={`edit-employee ${isOpen ? "active" : ""}`}>
      <div className="edit-employee__container">
        <div className="edit-employee__wrapper">
          <div className="edit-employee__header">
            <div className="edit-employee__title">Зміна співробітника</div>
            <div>
              <div className="edit-employee__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-employee__content">            
            <div className="form__field">
              <label className="form__label">Ідентифікатор співробітника</label>
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
              <label className="form__label">Прізвище</label>
              <input
                type="input"
                name="surname"
                minLength={2}
                maxLength={50}
                value={values.surname}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.surname ? "invalid" : ""}`}
              />
              {errors.surname && <label className="error">{errors.surname}</label>}
            </div>

            <div className="form__field">
              <label className="form__label">Ім'я</label>
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
              {errors.name && <label className="error">{errors.name}</label>}
            </div>

            <div className="form__field">
              <label className="form__label">По-батькові</label>
              <input
                type="input"
                name="patronymic"
                minLength={2}
                maxLength={50}
                value={values.patronymic}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.patronymic ? "invalid" : ""}`}
              />
              {errors.patronymic && <label className="error">{errors.patronymic}</label>}
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
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.phone ? "invalid" : ""}`}
              />
              {errors.phone && <label className="error">{errors.phone}</label>}
            </div>

            <div className="form__field">
              <label className="form__label">Електронна пошта</label>
              <input
                type="input"
                name="email"
                minLength={5}
                maxLength={50}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.email ? "invalid" : ""}`}
              />
              {errors.email && <label className="error">{errors.email}</label>}
            </div>

            {(values.status_id as number) >= 4 && (
              <React.Fragment>
                <div className="form__field">
                  <label className="form__label">Ім'я користувача</label>
                  <input
                    type="input"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form__input ${errors.username ? "invalid" : ""}`}
                  />
                  {errors.username && (<label className="error">{errors.username}</label>)}
                </div>

                <div className="form__field">
                  <label className="form__label">Пароль</label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form__input ${errors.password ? "invalid" : ""}`}
                  />
                  {errors.password && <label className="error">{errors.password}</label>}
                </div>
                
                <div className="form__field">
                  <label className="form__label">Підтвердження паролю</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form__input ${errors.confirmPassword ? "invalid" : ""}`}
                  />
                  {errors.confirmPassword && <label className="error">{errors.confirmPassword}</label>}
                </div>

                <div className="form__field">
                  <label className="form__label">Статус</label>
                  <select
                    name="status_id"
                    value={values.status_id}
                    onChange={handleChange}
                    className="form__input"
                  >
                    <option value={0} disabled>Не обрано</option>
                    <option value={4}>Активовано</option>
                    <option value={5}>Заблоковано</option>
                  </select>
                  {errors.status_id && <label className="error">{errors.status_id}</label>}
                </div>

                <div className="form__field">
                  <label className="form__label">Роль</label>
                  <select
                    name="role_id"
                    value={values.role_id}
                    onChange={handleChange}
                    className="form__input"
                  >
                    <option value={0} disabled>Не обрано</option>
                    <option value={1}>Адміністратор</option>
                    <option value={2}>Менеджер</option>
                    <option value={3}>Співробітник</option>                   
                  </select>
                  {errors.role_id && <label className="error">{errors.role_id}</label>}
                </div>

                <div className="form__field">
                  <label className="form__label">Посада</label>
                  <select
                    name="position_id"
                    value={values.position_id}
                    onChange={handleChange}
                    className="form__input"
                  >
                    <option value={0} disabled>Не обрано</option>
                    <option value={1}>Адміністратор</option>
                    <option value={2}>Менеджер</option>
                    <option value={3}>Співробітник</option>
                  </select>
                  {errors.position_id && <label className="error">{errors.position_id}</label>}
                </div>
            
                <div className="form__field">
                  <label className="form__label">Область</label>
                  <select
                    name="region_id"
                    value={values.region_id}
                    onChange={handleChange}
                    className="form__input"
                  >
                    <option value={0} disabled>Не обрано</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                  {errors.region_id && <label className="error">{errors.region_id}</label>}
                </div>

                <div className="form__field">
                  <label className="form__label">Місто</label>
                  <select
                    name="city_id"
                    value={values.city_id}
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
                  {errors.city_id && <label className="error">{errors.city_id}</label>}
                </div>

                <div className="form__field">
                  <label className="form__label">Адреса ЦНАПу</label>
                  <select
                    name="office_id"
                    value={values.office_id}
                    onChange={handleChange}
                    className="form__input"
                  >
                    <option value={0} disabled>Не обрано</option>
                    {offices.map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                  {errors.office_id && <label className="error">{errors.office_id}</label>}
                </div>
              </React.Fragment>
            )}
            
            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )}
          </div>

          <div className="edit-employee__footer">
            <Button text="Зберегти" type="button" onClick={handleUpdateEmployee} />
            <Button text="Видалити" type="button" onClick={handleDeleteEmployee} />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditEmployee;
