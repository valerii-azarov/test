import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { check, complete } from "../../redux/actionCreators/activationCreators";
import { loadRegionsData } from "../../redux/actionCreators/regionsCreators";
import { loadCitiesByRegionData } from "../../redux/actionCreators/citiesCreators";
import { loadOfficesByCityData } from "../../redux/actionCreators/officesCreators";
import { AccountInfo, EmploymentDetails } from "../../interfaces/employee-interface";

import Button from "../../components/Button/Button";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import "./style.css";

interface AdditionalData extends AccountInfo, EmploymentDetails {}

const initialState: AdditionalData = {
  username: "",
  password: "",
  confirmPassword: "",
  position_id: 0,
  region_id: 0,
  city_id: 0,
  office_id: 0,
};

const FIELDS = {
  username: "ім'я користувача",
  password: "пароль",
  confirmPassword: "підтвердження паролю",
  position_id: "посада",
  region_id: "область",
  city_id: "місто",
  office_id: "адреса ЦНАПу",
};

const PATTERNS = {
  username: /^[a-zA-Z0-9_.]{3,20}$/,
  password: /^[a-zA-Z0-9_.!@#$%^&*()-+=<>?/[\]{}|~]{8,}$/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  requiredActivationCode: "Код активації обов'язковий",
  usernameFormat: "Ім'я користувача повинно містити літери, цифри та підкреслення.",
  passwordFormat: "Пароль повинен містити принаймні одну літеру, одну цифру, та може включати спеціальні символи. Довжина паролю повинна бути не менше 8 символів.",
  confirmPassword: "Підтвердження паролю повинно співпадати з паролем.",
};

const ActivationPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isActivated, data: { message: checkMessage, employeeData }, error: checkError } = useSelector((state: RootState) => state.form.activation.check);
  const { message: activateMessage, error: activateError } = useSelector((state: RootState) => state.form.activation.complete);

  const { regions } = useSelector((state: RootState) => state.data.regions.data);
  const { cities } = useSelector((state: RootState) => state.data.cities.dataByRegion);
  const { offices } = useSelector((state: RootState) => state.data.offices.dataByCity);

  const [activationCode, setActivationCode] = useState<string>("");
  const [activationCodeError, setActivationCodeError] = useState<string | null>(null);

  const [values, setValues] = useState<AdditionalData>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleActivationSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    setActivationCodeError(validateActivationCode(activationCode));

    if (!validateActivationCode(activationCode)) {
      dispatch(check(activationCode));
    }
  };

  const handleCreateAccountSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors(validate(values));
    setTouched(Object.keys(values));
  
    if (!Object.keys(validate(values)).length) {
      employeeData.id && dispatch(complete(employeeData.id, values));
    }
  };

  const handleActivationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivationCode(event.target.value);
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

  const validateActivationCode = (code: string) => {
    return !code.trim() ? ERROR_MESSAGES.requiredActivationCode : null;
  };

  const validate = useCallback((data: AdditionalData) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];
  
      if (typeof value === "string") {          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else {
          if (key === "username" && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.usernameFormat;
          } 
          
          if (key === "password" && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.passwordFormat;
          } 
          
          if (key === "confirmPassword" && value !== data.password) {
            acc[key] = ERROR_MESSAGES.confirmPassword;
          }
        }
      } else if (typeof value === "number") {
        const numericFields = ["position_id", "region_id", "city_id", "office_id"];
          
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
    dispatch(loadRegionsData());
    values.region_id && dispatch(loadCitiesByRegionData(values.region_id));
    values.city_id && dispatch(loadOfficesByCityData(values.city_id));
  }, [values.region_id, values.city_id, dispatch]);

  return (
    <div className="activation__container">
      <div className="activation__wrapper">
        <div className="activation__title">Активація облікового запису</div>
        <div className="activation__subtitle">
          Якщо у вас немає коду активації, будь ласка, заповніть <Link to="/registration">форму</Link>.
        </div>
        <form onSubmit={isActivated ? handleCreateAccountSubmit : handleActivationSubmit} >
          <div className="form__field">
            <label className="form__label">Код активації</label>
            <input
              type="input"
              name="activationCode"
              value={activationCode}
              onChange={handleActivationCodeChange}
              className={`form__input ${activationCodeError ? "invalid" : ""}`}
              disabled={isActivated}
            />       
            {activationCodeError && <label className="error">{activationCodeError}</label>} 
          </div>

          {checkMessage && (
            <MessageContainer
              type="info"
              message={[checkMessage]}
              style={{ marginBottom: "15px" }}
            />
          )}
          
          {checkError && (
            <MessageContainer
              type="error"
              message={[checkError]}
              style={{ marginBottom: "15px" }}
            />
          )}

          {isActivated && (
            <React.Fragment>
              <div className="form__field">
                <label className="form__label">Прізвище</label>
                <input
                  type="input"
                  name="surname"
                  minLength={2}
                  maxLength={50}value={employeeData.surname}
                  className="form__input"
                  disabled
                />
              </div>

              <div className="form__field">
                <label className="form__label">Ім'я</label>
                <input
                  type="input"
                  name="name"
                  minLength={2}
                  maxLength={50}value={employeeData.name}
                  className="form__input"
                  disabled
                />
              </div>

              <div className="form__field">
                <label className="form__label">По-батькові</label>
                <input
                  type="input"
                  name="patronymic"
                  minLength={2}
                  maxLength={50}value={employeeData.patronymic}
                  className="form__input"
                  disabled
                />
              </div>

              <div className="form__field">
                <label className="form__label">Номер телефону</label>
                <input
                  type="input"
                  name="phone"
                  size={13}
                  minLength={13}
                  maxLength={13}
                  value={employeeData.phone}
                  className="form__input"
                  disabled
                />
              </div>

              <div className="form__field">
                <label className="form__label">Електронна пошта</label>
                <input
                  type="input"
                  name="email"
                  minLength={5}
                  maxLength={50}
                  value={employeeData.email}
                  className="form__input"
                  disabled
                />
              </div>

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
                {errors.username && <label className="error">{errors.username}</label>}
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
                <label className="form__label">Посада</label>
                <select
                  name="position_id"
                  value={values.position_id}
                  onChange={handleChange}
                  className="form__input"
                >
                  <option value={0} disabled>Не обрано</option>
                  <option value={1}>Співробітник</option>
                  <option value={2}>Менеджер</option>
                </select>
                {errors.position_id && <label className="error">{errors.position_id}</label>}
              </div>

              {regions.length > 0 && (
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
              )}

              {values.region_id !== 0 && cities.length > 0 && (
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
              )}

              {values.city_id !== 0 && offices.length > 0 && (
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
              )}        
            </React.Fragment>
          )}

          {activateMessage && (
            <MessageContainer
              type="success"
              message={[activateMessage]}
              style={{ marginBottom: "15px" }}
            />
          )}
          
          {activateError && (
            <MessageContainer
              type="error"
              message={[activateError]}
              style={{ marginBottom: "15px" }}
            />
          )}

          <Button 
            text={isActivated ? "Активувати" : "Перевірити"}
            type="submit" 
          />
        </form>
      </div>
    </div>
  );
};

export default ActivationPage;
