import React from "react";
import "./CustomAlert.css";

function CustomAlert({
  alertMessage = "",
  onCancel = null,
  onCancelMessage = "",
  onConfirm = "OK",
  onConfirmMessage = "Confirmar?",
  messageHeader = "",
  error = false,
}) {
  return (
    <div className="custom-alert">
      <div className="alert-content">
        <h3>{messageHeader}</h3>
        <p>{alertMessage}</p>
        <div className="alert-buttons">
          {onCancelMessage && (
            <button className={error ? "confirm-button" : "cancel-button"} onClick={onCancel}>
              {onCancelMessage}
            </button>
          )}
          <button className={error ? "cancel-button" : "confirm-button"} onClick={onConfirm}>
            {onConfirmMessage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
