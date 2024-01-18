import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Faq } from "../../../../interfaces/faq-interface";

import Button from "../../../../components/Button/Button";
// import MessageContainer from "../../../../components/MessageContainer/MessageContainer";

import "./style.css";

interface AddFaqProps {
  isOpen: boolean;
  onAddClick: (faq: Faq) => void;
  onCloseClick: () => void;
}

const initialState: Faq = {
  id: 0,
  question: "",
  answer: "",
};

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

const AddFaq: React.FC<AddFaqProps> = ({ isOpen, onAddClick, onCloseClick }) => { 
  // const { error } = useSelector((state: RootState) => state.data.faq.actions.addFaq);
  
  const [values, setValues] = useState<Faq>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleClose = () => {
    resetForm();
    onCloseClick();
  };
  
  const handleAddFaq = () => {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setTouched(Object.keys(values));
  
    if (!Object.keys(validationErrors).length) {
      onAddClick(values);
    }
  };
  
  const resetForm = () => {
    setValues(initialState);
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
    <div className={`add-faq ${isOpen ? "active" : ""}`}>
      <div className="add-faq__container">
        <div className="add-faq__wrapper">
          <div className="add-faq__header">
            <div className="add-faq__title">Додавання нового питання та відповіді</div>
            <div>
              <div className="add-faq__close" onClick={handleClose}></div>
            </div>
          </div>

          <div className="add-faq__content">
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
            )}  */}
          </div>

          <div className="add-faq__footer">
            <Button 
              text="Додати" 
              type="button" 
              onClick={handleAddFaq}
            />
          </div>
        </div>
      </div>

      <div className="overlay"></div>
    </div>
  );
};

export default AddFaq;
