import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Faq } from "../../../../interfaces/faq-interface";

import Button from "../../../../components/Button/Button";
// import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface EditFaqProps {
  isOpen: boolean;
  onUpdateClick: (faq: Faq) => void;
  onDeleteClick: () => void;
  onCloseClick: () => void;
  faq: Faq;
}

const FIELDS = {
  question: "питання",
  answer: "відповідь",
};

const PATTERNS = {
  question: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
  answer: /[А-ЩЬЮЯҐЄІЇа-щьюяґєії'`’ʼ-]+/,
};

const ERROR_MESSAGES = {
  required: (field: string) => `${field.charAt(0).toUpperCase() + field.slice(1)} обов'язковий.`,
  patternMismatch: (field: string) => `Пишіть, будь ласка, ${field} українською.`,
};

const EditFaq: React.FC<EditFaqProps> = ({ isOpen, onUpdateClick, onDeleteClick, onCloseClick, faq }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  // const { error } = useSelector((state: RootState) => state.data.Faq.actions.updateFaq);

  const [values, setValues] = useState<Faq>(faq);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const isAdmin = user.role_id === 1;

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleUpdateFaq = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onUpdateClick(values);
    }
  };

  const handleDeleteFaq = () => {
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

  const validate = useCallback((data: Faq) => {
    return Object.entries(data).reduce((acc: Record<string, string>, [key, value]) => {
      const pattern = PATTERNS[key as keyof typeof PATTERNS];

      if (typeof value === "string") {          
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
    const touchedErrors = Object.keys(validationErrors).reduce((acc: Record<string, string>, key) => {
      if (touched.includes(key)) {
        acc[key] = validationErrors[key];
      }
      return acc;
    }, {});
    setErrors(touchedErrors);
  }, [touched, values, validate]);

  return (
    <div className={`edit-faq ${isOpen ? "active" : ""}`}>
      <div className="edit-faq__container">
        <div className="edit-faq__wrapper">
          <div className="edit-faq__header">
            <div className="edit-faq__title">Зміна питання та відповіді</div>
            <div>
              <div className="edit-faq__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="edit-faq__content">
            <div className="form__field">
              <label className="form__label">Ідентифікатор питання та відповіді</label>
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
              <label className="form__label">Питання</label>
              <input
                type="input"
                name="question"
                minLength={2}
                maxLength={50}
                value={values.question}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__input ${errors.question ? "invalid" : ""}`}
              />
              {errors.question && (
                <label className="error">{errors.question}</label>
              )}
            </div>

            <div className="form__field">
              <label className="form__label">Відповідь</label>
              <textarea
                name="answer"
                rows={10}
                cols={45}
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form__textarea ${errors.answer ? "invalid" : ""}`}
              />
              {errors.answer && (
                <label className="error">{errors.answer}</label>
              )}
            </div> 

            {/* {error && (
              <MessageContainer
                type="error"
                message={[error]}
                style={{ marginBottom: "15px" }}
              />
            )} */}
          </div>

          <div className="edit-faq__footer">
            <Button 
              text="Зберегти" 
              type="button" 
              onClick={handleUpdateFaq}
              disabled={!isAdmin}
            />
            <Button 
              text="Видалити" 
              type="button" 
              onClick={handleDeleteFaq}
              disabled={!isAdmin} 
            />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default EditFaq;
