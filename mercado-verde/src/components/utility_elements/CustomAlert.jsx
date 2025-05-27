import React from "react";
import "./CustomAlert.css";

function CustomAlert({
  alertMessage = "",
  onCancel = null,
  onCancelMessage = "",
  onConfirm,
  onConfirmMessage,
  messageHeader = "",
}) {
  return (
    <div className="custom-alert">
      <div className="alert-content">
        <h3>{messageHeader}</h3>
        <p>{alertMessage}</p>
        <div className="alert-buttons">
          {onCancelMessage && (
            <button className="cancel-button" onClick={onCancel}>
              {onCancelMessage}
            </button>
          )}
          <button className="confirm-button" onClick={onConfirm}>
            {onConfirmMessage}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
