import React, { useEffect } from "react";
import "./CustomAlert.css";

function CustomAlert({
  messageHeader = "",
  alertMessage = "",
  onCancel = null,
  onCancelMessage = "",
  onConfirm = null,
  onConfirmMessage = "Ok",
  error = false,
}) {
  return (
    <div className="custom-alert" onClick={onCancel}>
      <div className="alert-content" onClick={(e) => e.stopPropagation()}>
        <h3>{messageHeader}</h3>
        <p>{alertMessage}</p>
        <div className="alert-buttons">
          {onCancelMessage && (
            <button
              className={error ? "confirm-button" : "cancel-button"}
              onClick={onCancel}
            >
              {onCancelMessage}
            </button>
          )}
          <button
            className={error ? "cancel-button" : "confirm-button"}
            onClick={onConfirm}
          >
            {onConfirmMessage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
