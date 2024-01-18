import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { login } from "../../redux/actionCreators/authCreators";
import { AccountInfo } from "../../interfaces/employee-interface";

import Button from "../../components/Button/Button";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

const initialState = {
  username: "",
  password: "",
};

const FIELDS = {
  username: "ім'я користувача",
  password: "пароль",
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
};

const LoginComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.auth);

  const [values, setValues] = useState<AccountInfo>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    setErrors(validate(values));
    setTouched(Object.keys(values));

    if (Object.keys(validate(values)).length === 0) {
      dispatch(login(values.username, values.password));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
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

  const validate = useCallback((data: AccountInfo) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
    
      if (typeof value === "string" && !value.trim()) {          
        acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
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
    <div className="login__container">
      <div className="login__wrapper">
        <div className="login__title">Вхід</div>
        <div className="login__subtitle">
          Якщо у вас немає облікового запису, ви можете подати <Link to="/registration">заявку</Link> на його створення.
        </div>
        <form onSubmit={handleLogin}>
          <div className="form__field">
            <label className="form__label">Ім'я користувача</label>
            <input
              type="text"
              name="username"
              minLength={2}
              maxLength={50}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form__input ${errors.username ? "invalid" : ""}`}
            />
            {errors.username && <label className="error">{errors.username}</label>}
          </div>

          <div className="form__field">
            <label className="form__label">Пароль</label>
            <input
              type="password"
              name="password"
              minLength={2}
              maxLength={100}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form__input ${errors.password ? "invalid" : ""}`}
            />
            {errors.password && <label className="error">{errors.password}</label>}
          </div>          
          
          {error && (
            <MessageContainer
              type="error"
              message={[error]}
              style={{ marginBottom: "15px" }}
            />
          )}

          <Button 
            text="Увійти" 
            type="submit" 
          />
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
