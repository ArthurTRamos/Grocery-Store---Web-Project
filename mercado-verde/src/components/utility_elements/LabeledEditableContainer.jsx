import React, { useState } from "react";
import { useIMask } from "react-imask"; // Import the hook from the react-imask library.

import "./LabeledEditableContainer.css";

// Import icons for the edit, cancel, and save buttons.
import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

/**
 * A reusable component that displays a labeled value and allows in-place editing.
 * It supports advanced input formatting/masking via the `imask` library.
 */
function LabeledEditableContainer({
  displayName, // The label text to display for the field.
  field, // An identifier for the field, passed to handleSave.
  handleSave, // The async function to call when saving the new value.
  initialValue, // The starting value to display.
  secret = false, // If true, the value is hidden (like a password).
  formatter, // Can be an `imask` config object or a simple formatting function.
  verifier = () => true, // A function to validate the input before saving. Defaults to always valid.
}) {
  // State to toggle between display mode and edit mode.
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the current value of the input field during editing.
  const [inputData, setInputData] = useState(initialValue || "");
  // State to track if the current input is valid according to the verifier.
  const [isValid, setIsValid] = useState(true);

  // Determine if the `formatter` prop is an imask configuration object.
  const isMasked = formatter && typeof formatter === 'object' && 'mask' in formatter;

  // Setup the useIMask hook. It must be called unconditionally on every render.
  // It returns a 'ref' that we will attach to our input element.
  const { ref } = useIMask(
    isMasked ? formatter : {}, // Pass the mask config only if `isMasked` is true. Otherwise, pass an empty object.
    {
      // `onAccept` is the imask callback that fires when the value is changed and is valid according to the mask.
      onAccept: (value) => {
        // We only allow imask to control the state for masked inputs to prevent conflicts with the standard onChange handler.
        if (isMasked) {
          setInputData(value);
        }
      },
    }
  );

  // This function handles input changes ONLY for non-masked inputs.
  const handleInputChange = (e) => {
    // If the input is masked, imask's `onAccept` handles the state update, so this function does nothing.
    if (!isMasked) {
      const value = e.target.value;
      // If the formatter is a function (e.g., capitalize), apply it. Otherwise, just set the raw value.
      setInputData(typeof formatter === 'function' ? formatter(value) : value);
    }
  };

  // Switch to editing mode.
  const handleEditClick = () => {
    setIsEditing(true);
    setInputData(initialValue || ""); // Reset input to initial value on edit start.
    setIsValid(true); // Reset validation state.
  };

  // Handle the save action.
  const handleSaveClick = async () => {
    const isVerified = verifier(inputData); // Run the custom validation logic.
    setIsValid(isVerified); // Update the validation state.

    // Only proceed with saving if the input is verified.
    if (isVerified) {
      await handleSave(field, inputData); // Call the parent's save function.
      setIsEditing(false); // Exit editing mode.
    }
  };

  // Cancel the edit and revert any changes.
  const handleCancelClick = () => {
    setInputData(initialValue || ""); // Revert to the original value.
    setIsValid(true);
    setIsEditing(false);
  };

  // Add keyboard shortcuts for better user experience.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveClick();
    } else if (e.key === "Escape") {
      handleCancelClick();
    }
  };

  return (
    <div className="labeled-editable-container">
      <div className="labeled-editable-container-display-name">
        {displayName}
      </div>
      <div className="labeled-editable-container-main">
        {isEditing ? (
          // -- EDITING VIEW --
          <div className="labeled-editable-container-input-group">
            <input
              type={secret ? "password" : "text"}
              // Conditionally apply the ref from useIMask. It will only be attached for masked inputs.
              ref={isMasked ? ref : null}
              // The `value` is always controlled by the React state.
              value={inputData}
              // The `onChange` handler is only used for non-masked inputs.
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus // Automatically focus the input when it appears.
              className={!isValid ? "invalid-input" : ""} // Apply error class if not valid.
            />
            <button onClick={handleSaveClick} className="save-button">
              <MdOutlineSave />
            </button>
            <button onClick={handleCancelClick} className="cancel-button">
              <TbEditOff />
            </button>
          </div>
        ) : (
          // -- DISPLAY VIEW --
          <div className="labeled-editable-container-display-group">
            <span className="labeled-editable-container-display-value">
              {/* If secret is true, show asterisks. Otherwise, show the actual value. */}
              {secret ? "********" : String(initialValue)}
            </span>
            <button onClick={handleEditClick} className="edit-button">
              <TbEdit />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LabeledEditableContainer;