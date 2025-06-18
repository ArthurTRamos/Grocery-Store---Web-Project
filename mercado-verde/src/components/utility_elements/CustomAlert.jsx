import "./CustomAlert.css"; // Import styles for the alert modal

/**
 * CustomAlert Component
 * Props:
 * - messageHeader: Title/header text
 * - alertMessage: Main message body
 * - onCancel: Function to execute when cancel button or background is clicked
 * - onCancelMessage: Text for the cancel button
 * - onConfirm: Function to execute when confirm button is clicked
 * - onConfirmMessage: Text for the confirm button (default: "Ok")
 * - error: Boolean to swap button colors (error = true shows confirm as red)
 */
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
    // Fullscreen overlay; clicking it triggers onCancel
    <div className="custom-alert" onClick={onCancel}>
      
      {/* Alert box; stops click from closing the modal */}
      <div className="alert-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Optional alert header */}
        <h3>{messageHeader}</h3>
        
        {/* Main message text */}
        <p>{alertMessage}</p>

        {/* Container for action buttons */}
        <div className="alert-buttons">

          {/* Optional cancel button, shown only if onCancelMessage exists */}
          {onCancelMessage && (
            <button
              className={error ? "confirm-button" : "cancel-button"} // Button color depends on error state
              onClick={onCancel}
            >
              {onCancelMessage}
            </button>
          )}

          {/* Confirm button */}
          <button
            className={error ? "cancel-button" : "confirm-button"} // Invert color when it's an error alert
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
