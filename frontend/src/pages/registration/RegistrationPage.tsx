import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { submit } from "../../redux/actionCreators/registrationCreators";
import { PersonalInfo } from "../../interfaces/employee-interface";

import Button from "../../components/Button/Button";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

const initialState: PersonalInfo = {
  id: 0,
  surname: "",
  name: "",
  patronymic: "",
  phone: "+380",
  email: "",
};

const FIELDS = {
  surname: "прізвище",
  name: "ім’я",
  patronymic: "по-батькові",
  phone: "номер телефону",
  email: "електронна пошта",
};

const PATTERNS = {
  surname: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  name: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  patronymic: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  phone: /\+380\d{9}$/,
  email: /^[^@]+@(?!.*(?:mail\.ru|yandex\.ru|ya\.ru)).*$/i,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  phoneFormat: "Номер телефону має містити 13 символів, зокрема +380 та 9 цифр номера.",
  emailFormat: "Будь ласка, введіть правильний формат електронної пошти та уникайте використання доменів, пов'язаних із країною-агресором.",
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const RegistrationPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { message, error } = useSelector((state: RootState) => state.form.registration);
  
  const [values, setValues] = useState<PersonalInfo>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors(validate(values));
    setTouched(Object.keys(values));

    if (Object.keys(validate(values)).length === 0) {
      dispatch(submit(values));
    }
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

  const validate = useCallback((data: PersonalInfo) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];
  
      if (typeof value === "string") {     
        const stringFields = ["phone", "email"];
        
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else {          
          if (key === "phone" && (!data.phone.startsWith("+380") || data.phone.slice(4).length !== 9)) {
            acc[key] = ERROR_MESSAGES.phoneFormat;
          } 
          
          if (key === "email" && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.emailFormat;
          }
          
          if (!stringFields.includes(key) && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.patternMismatch(FIELDS[key as keyof typeof FIELDS]);
          }
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
    <div className="registration__container">
      <div className="registration__wrapper">
        <div className="registration__title">Заявка на створення облікового запису</div>
        <div className="registration__subtitle">
          Якщо ви отримали код активації, будь ласка, <Link to="/activation">активуйте його</Link>.
        </div>
        <form onSubmit={handleSubmit}>
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

          {message && (
            <MessageContainer
              type="success"
              message={[message]}
              style={{ marginBottom: "15px" }}
            />
          )}
          
          {error && (
            <MessageContainer
              type="error"
              message={[error]}
              style={{ marginBottom: "15px" }}
            />
          )}

          <Button 
            text="Відправити" 
            type="submit" 
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
