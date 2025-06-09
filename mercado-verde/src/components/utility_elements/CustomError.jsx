import React from "react";
import "./CustomAlert.css";

function CustomError({
  alertMessage = "",
  onError,
  onErrorMessage,
  messageHeader = "",
}) {
  return (
    <div className="custom-alert">
      <div className="alert-content">
        <h3>{messageHeader}</h3>
        <p>{alertMessage}</p>
        <div className="alert-buttons">
          <button className="cancel-button" onClick={onError}>
            {onErrorMessage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomError;