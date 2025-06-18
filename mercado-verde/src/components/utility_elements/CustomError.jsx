import React from "react";
import "./CustomAlert.css"; // Reuses styling from the CustomAlert component

/**
 * CustomError Component
 * Props:
 * - alertMessage: Error message to display
 * - onError: Function called when user dismisses the error
 * - onErrorMessage: Text to display on the button
 * - messageHeader: Title/header for the error alert
 */
function CustomError({
  alertMessage = "",
  onError,
  onErrorMessage,
  messageHeader = "",
}) {
  return (
    // Overlay that covers the screen to focus user attention
    <div className="custom-alert">
      
      {/* Alert content box (prevents clicks from propagating if needed) */}
      <div className="alert-content">

        {/* Optional title/header */}
        <h3>{messageHeader}</h3>

        {/* Main error message */}
        <p>{alertMessage}</p>

        {/* Button container with only one button (usually "Fechar", "Entendi", etc.) */}
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
