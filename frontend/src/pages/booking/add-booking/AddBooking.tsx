import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadRegionsData } from "../../../redux/actionCreators/regionsCreators";
import { loadCitiesByRegionData } from "../../../redux/actionCreators/citiesCreators";
import { loadOfficesByCityData } from "../../../redux/actionCreators/officesCreators";
import { loadCategoriesData } from "../../../redux/actionCreators/categoriesCreators";
import { loadServicesData } from "../../../redux/actionCreators/servicesCreators";
import { loadServiceTypesData } from "../../../redux/actionCreators/serviceTypesCreators";
import { loadScheduleData } from "../../../redux/actionCreators/scheduleCreators";
import { Booking } from "../../../interfaces/booking-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface AddBookingProps {
  isOpen: boolean;
  onAddClick: (booking: Booking) => void;
  onCloseClick: () => void;
}

const initialState: Booking = {
  booking_id: 0,
  surname: "",
  name: "",
  patronymic: "",
  phone: "+380",
  city_id: 0,
  region_id: 0,
  office_id: 0,
  category_id: 0,
  service_id: 0,
  service_type_id: 0,
};

const FIELDS = {
  surname: "прізвище",
  name: "ім'я",
  patronymic: "по-батькові",
  phone: "номер телефону",
  region_id: "область",
  city_id: "місто",
  office_id: "адреса",
  category_id: "категорія",
  service_id: "послуга",
  service_type_id: "вид послуги",
  date: "дата",
  time: "час",
};

const PATTERNS = {
  surname: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  name: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  patronymic: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  phone: /\+380\d{9}$/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  phoneFormat: "Номер телефону має містити 13 символів, зокрема +380 та 9 цифр номера.",
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const AddBooking: React.FC<AddBookingProps> = ({ isOpen, onAddClick, onCloseClick }) => {
  const dispatch: AppDispatch = useDispatch();
  
  const { regions } = useSelector((state: RootState) => state.data.regions.data);
  const { cities } = useSelector((state: RootState) => state.data.cities.dataByRegion);
  const { offices } = useSelector((state: RootState) => state.data.offices.dataByCity);
  const { categories } = useSelector((state: RootState) => state.data.categories.data);
  const { services } = useSelector((state: RootState) => state.data.services.data);
  const { serviceTypes } = useSelector((state: RootState) => state.data.serviceTypes.data);
  const { schedule } = useSelector((state: RootState) => state.data.schedule.data);

  const { error } = useSelector((state: RootState) => state.data.booking.actions.addBooking);

  const [values, setValues] = useState<Booking>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleAddBooking = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      const selectedRecord = values.date && values.time ? schedule[values.date]?.find(record => record.time === values.time) : null;
      const selectedId = selectedRecord?.id;

      onAddClick({ 
        ...values, 
        record_id: selectedId,
      });
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

  const validate = useCallback((data: Booking) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];
  
      if (typeof value === "string") {
        const stringFields = ["phone", "date", "time", "region_id", "city_id", "office_id", "category_id", "service_id", "service_type_id", "record_id"];
          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else {
          if (key === "phone" && (!data.phone.startsWith("+380") || data.phone.slice(4).length !== 9)) {
            acc[key] = ERROR_MESSAGES.phoneFormat;
          } 
                    
          if (!stringFields.includes(key) && !pattern.test(value)) {
            acc[key] = ERROR_MESSAGES.patternMismatch(FIELDS[key as keyof typeof FIELDS]);
          }
        }
      } else if (typeof value === "number") {
        const numericFields = ["region_id", "city_id", "office_id", "category_id", "service_id", "service_type_id"];
          
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
    values.office_id && dispatch(loadCategoriesData());
    values.category_id && dispatch(loadServicesData({ categoryId: values.category_id }));
    values.service_id && dispatch(loadServiceTypesData({ serviceId: values.service_id }));
    values.office_id && values.service_id && dispatch(loadScheduleData(values.office_id, values.service_id));
  }, [values.region_id, values.city_id, values.office_id, values.category_id, values.service_id, dispatch]);

  return (
    <div className={`add-booking ${isOpen ? "active" : ""}`}>
      <div className="add-booking__container">
        <div className="add-booking__wrapper">
          <div className="add-booking__header">
            <div className="add-booking__title">Додавання нової заявки</div>
            <div>
              <div className="add-booking__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="add-booking__content">
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
                <label className="form__label">Адреса</label>
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

          {values.office_id !== 0 && categories.length > 0 && (
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

            {values.category_id !== 0 && services.length > 0 && (
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

            {values.service_id !== 0 && serviceTypes.length > 0 && (
              <div className="form__field">
                <label className="form__label">Вид послуги</label>
                <select
                  name="service_type_id"
                  value={values.service_type_id}
                  onChange={handleChange}
                  className="form__input"
                >
                  <option value={0} disabled>Не обрано</option>
                  {serviceTypes.map((serviceType) => (
                    <option key={serviceType.id} value={serviceType.id} title={serviceType.name}>
                      {serviceType.name.length > 40 ? `${serviceType.name.slice(0, 40)}...` : serviceType.name}
                    </option>
                  ))}
                </select>
                {errors.service_type_id && <label className="error">{errors.service_type_id}</label>}
              </div>
            )}

            {values.service_type_id !== 0 && (
              <div className="form__field">
                <label className="form__label">Дата</label>
                <select
                  name="date"
                  value={values.date} 
                  onChange={handleChange}
                  className="form__input"
                >
                  <option value={0} disabled>Не обрано</option>
                  {Object.keys(schedule).map((date, index) => (
                    <option key={index} value={date}>
                      {moment(date).format("YYYY/MM/DD")}
                    </option>
                  ))}
                </select>
                {errors.date && <label className="error">{errors.date}</label>}
              </div>
            )}

            {values.date && (
              <div className="form__field">
                <label className="form__label">Час</label>
                <select
                  name="time"
                  value={values.time} 
                  onChange={handleChange}
                  className="form__input"
                >
                  <option value={0} disabled>Не обрано</option>
                  {schedule[values.date].map((record) => (
                    <option key={record.id} value={record.time}>
                      {moment(record.time, "HH:mm:ss").format("HH:mm")}
                    </option>
                  ))}
                </select>
                {errors.date && <label className="error">{errors.date}</label>}
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

          <div className="add-booking__footer">
            <Button text="Додати" type="button" onClick={handleAddBooking} />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default AddBooking;
