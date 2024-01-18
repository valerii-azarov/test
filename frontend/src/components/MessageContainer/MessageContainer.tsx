import React from "react";
import "./style.css";

interface MessageContainerProps {
  type: "info" | "success" | "error"; 
  message: string[];
  style?: React.CSSProperties;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ type, message, style }) => {
  return (
    <div className="message__container" style={style}>
      <div className={`message__content ${type}`}>
        {message.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div> 
    </div>
  );
};

export default MessageContainer;

