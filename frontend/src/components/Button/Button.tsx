import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

interface ButtonProps {
  text: string;
  link?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ text, link, disabled, onClick, type }) => {
  return link ? (
    <Link to={link} className="button-fill">
      {text}
    </Link>
  ) : (
    <button type={type} className="button-fill-normal" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
