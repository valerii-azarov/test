import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loadDetails } from "../../../redux/actionCreators/infoCreators";

import "./style.css";

const positionLabels: Record<number, string> = {
  1: "Адміністратор",
  2: "Менеджер",
  3: "Співробітник",
};

const roleLabels: Record<number, string> = {
  1: "Адміністратор",
  2: "Менеджер",
  3: "Співробітник",
};

const statusLabels: Record<number, string> = {
  4: "Активовано",
  5: "Заблоковано",
};

const InfoContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.data.info);

  useEffect(() => {
    user.id && dispatch(loadDetails(user.id));
  }, [user.id, dispatch]);

  return (
    <div className="info__container">
      <div className="info__wrapper">
        <div className="info__content">
          <div className="form__field">
            <label className="form__label">Ідентифікатор</label>
            <label className="form__label">
              <b>{data.id.toString().padStart(8, "0")}</b>
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">ПІБ</label>
            <label className="form__label">
              <b>{`${data.surname} ${data.name} ${data.patronymic}`}</b>
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">Телефон</label>
            <label className="form__label">
              <b>{data.phone}</b>
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">Електронна пошта</label>
            <label className="form__label">
              <b>{data.email}</b>
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">Посада</label>
            <label className="form__label">
              <b>{positionLabels[data.position_id as number]}</b>
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">Роль</label>
            <label className="form__label">
              <b>{roleLabels[data.role_id as number]}</b>
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">Регіон</label>
            <label className="form__label">
              <b>{`${data.region}, ${data.city}`}</b>
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">Адреса</label>
            <label className="form__label">
              <b>{data.office}</b>
            </label>
          </div>

          <div className="form__field">
            <label className="form__label">Статус облікового запису</label>
            <label className="form__label">
              <b>{statusLabels[data.status_id as number]}</b>
            </label>
          </div>
        </div>
      </div>

      {/* <div className="form__field">
        <label className="form__label">Статус заявки</label>
        <select
          name="status_id"
          value={values.status_id}
          onChange={handleChange}
          className="form__input"
        >
          <option value={0} disabled>
            Не обрано
          </option>
          <option value={1}>Нова</option>
          <option value={2}>В обробці</option>
          <option value={3}>Відхилено</option>
          <option value={4}>Вирішено</option>
        </select>
      </div> */}
    </div>
  );
};

export default InfoContainer;
