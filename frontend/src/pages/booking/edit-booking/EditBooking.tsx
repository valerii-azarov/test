import React, { useState } from "react";
import moment from "moment";
import "moment/locale/uk";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Booking } from "../../../interfaces/booking-interface";

import Button from "../../../components/Button/Button";
import MessageContainer from "../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditBookingProps {
  isOpen: boolean;
  onUpdateClick: (booking: Booking) => void;
  onDeleteClick: () => void;
  onCloseClick: () => void;
  booking: Booking;
}

const EditBooking: React.FC<EditBookingProps> = ({ isOpen, onUpdateClick, onDeleteClick, onCloseClick, booking }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.data.booking.actions.updateBooking);

  const [values, setValues] = useState<Booking>(booking);

  const isAdmin = user.role_id === 1;
  const isEmployee = user.role_id === 3;

  const handleClose = () => {
    onCloseClick();
  };
  
  const handleUpdateBooking = () => {
    onUpdateClick(values);
  };
  
  const handleDeleteBooking = () => {
    onDeleteClick();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ 
      ...values, 
      [event.target.name]: event.target.value 
    });
  };

  return (
    <div className={`edit-booking ${isOpen ? "active" : ""}`}>
      <div className="edit-booking__container">
        <div className="edit-booking__wrapper">
          <div className="edit-booking__header">
            <div className="edit-booking__title">Дані про заявку</div>
            <div>
              <div className="edit-booking__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-booking__content">
            <div className="form__field">
              <label className="form__label">
                Ідентифікатор заявки
              </label>
              <label className="form__label">
                <b>{values.booking_id.toString().padStart(8, "0")}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Категорія
              </label>
              <label className="form__label">
                <b>{values.category}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Послуга
              </label>
              <label className="form__label">
                <b>{values.service}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Вид послуги
              </label>
              <label className="form__label">
                <b>{values.service_type}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Час візиту
              </label>
              <label className="form__label">
                <b>{`${moment(values.date, "YYYY-MM-DD").format("D MMMM")}, ${moment(values.time, "HH:mm:ss").format("HH:mm")}`}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                ПІБ
              </label>
              <label className="form__label">
                <b>{`${values.surname} ${values.name} ${values.patronymic}`}</b>
              </label>
            </div>

            <div className="form__field">
              <label className="form__label">
                Телефон
              </label>
              <label className="form__label">
                <b>{values.phone}</b>
              </label>
            </div> 

             <div className="form__field">
              <label className="form__label">Статус заявки</label>
              <select
                name="status_id"
                value={values.status_id}
                onChange={handleChange}
                className="form__input"
              >
                <option value={0} disabled>Не обрано</option>
                <option value={1}>Нова</option>
                <option value={2}>В обробці</option>
                <option value={3}>Відхилено</option>
                <option value={4}>Вирішено</option>
              </select>
            </div>    

            {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} 
          </div>

          <div className="edit-booking__footer">
            <Button 
              text="Зберегти" 
              type="button" 
              onClick={handleUpdateBooking} 
              disabled={!isAdmin && !isEmployee}
            />
            <Button 
              text="Видалити" 
              type="button" 
              onClick={handleDeleteBooking}
              disabled={!isAdmin && !isEmployee}           
            />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditBooking;
