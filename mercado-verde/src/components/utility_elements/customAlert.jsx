import React from "react";
import "./CustomAlert.css";

function CustomAlert({ message, onClose, messageHeader }) {
  return (
    <div className="alert-container">
      <div className="alert-content">
        <h3>{messageHeader}</h3>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default CustomAlert;
