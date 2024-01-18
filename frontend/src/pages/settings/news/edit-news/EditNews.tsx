import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { News } from "../../../../interfaces/news-interface";

import Button from "../../../../components/Button/Button";
// import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditNewsProps {
  isOpen: boolean;
  onUpdateClick: (news: News) => void;
  onDeleteClick: () => void;
  onCloseClick: () => void;
  news: News;
}

const FIELDS = {
  title: "заголовок новини",
  content: "текст публикації",
  is_important: "важливість",
};

const PATTERNS = {
  title: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  content: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const EditNews: React.FC<EditNewsProps> = ({ isOpen, onUpdateClick, onDeleteClick, onCloseClick, news }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  // const { error } = useSelector((state: RootState) => state.data.news.actions.updateNews);

  const [values, setValues] = useState<News>(news);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  delete values.publish_date;
  delete values.author_id;

  const isAdmin = user.role_id === 1;

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleUpdateNews = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onUpdateClick(values);
    }
  };

  const handleDeleteNews = () => {
    onDeleteClick();
  };

  const resetForm = () => {
    setErrors({});
    setTouched([]);
  };  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues({ 
      ...values, 
      [event.target.name]: event.target.value 
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!touched.includes(event.target.name)) {
      setTouched([
        ...touched, 
        event.target.name
      ]);
    }
  };

  const validate = useCallback((data: News) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];

      if (typeof value === "string") {
        const stringFields = ["is_important"];
          
        if (!value.trim()) {
          acc[key] = ERROR_MESSAGES.required(FIELDS[key as keyof typeof FIELDS]);
        } else if (!stringFields.includes(key) && !pattern.test(value)) {
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
    <div className={`edit-news ${isOpen ? "active" : ""}`}>
      <div className="edit-news__container">
        <div className="edit-news__wrapper">
          <div className="edit-news__header">
            <div className="edit-news__title">Зміна новини</div>
            <div>
              <div className="edit-news__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-news__content">
            <div className="form__field">
              <label className="form__label">Ідентифікатор новини</label>
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
              <label className="form__label">Заголовок новини</label>
              <input
                type="input"
                name="title"
                minLength={2}
                maxLength={50}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.title ? "invalid" : ""}`}
              />
              {errors.title && (
                <label className="error">{errors.title}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Текст публикації</label>
              <textarea
                name="content"
                rows={10}
                cols={45}
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__textarea ${errors.content ? "invalid" : ""}`}
              />
              {errors.content && (
                <label className="error">{errors.content}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Новина є важливой?</label>
              <select
                name="is_important"
                value={String(values.is_important)}
                onChange={handleChange}
                className="form__input"
              >
                <option value="" disabled>Не обрано</option>
                <option value="true">Так</option>
                <option value="false">Ні</option>
              </select>
            </div> 

            {/* {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} */}
          </div>

          <div className="edit-news__footer">
            <Button 
              text="Зберегти" 
              type="button" 
              onClick={handleUpdateNews}
              disabled={!isAdmin}
            />
            <Button 
              text="Видалити" 
              type="button" 
              onClick={handleDeleteNews}
              disabled={!isAdmin} 
            />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditNews;
