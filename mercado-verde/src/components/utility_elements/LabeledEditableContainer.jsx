import React, { useState } from "react";
import { useIMask } from "react-imask"; // Import the imask hook

import "./LabeledEditableContainer.css";

import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

function LabeledEditableContainer({
  displayName,
  field,
  handleSave,
  initialValue,
  secret = false,
  formatter, // Now accepts an imask config object OR a function
  verifier = () => true,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputData, setInputData] = useState(initialValue || "");
  const [isValid, setIsValid] = useState(true);

  // 1Check if the formatter is an imask config object
  const isMasked = formatter && typeof formatter === 'object' && 'mask' in formatter;

  // Setup the imask hook to run unconditionally (as required by React Hooks)
  // It will only be active if `isMasked` is true.
  const { ref } = useIMask(
    isMasked ? formatter : {}, // Pass the mask config or an empty object
    {
      // `onAccept` is called when the value is changed and is valid according to the mask
      onAccept: (value) => {
        // We only let imask control the state for masked inputs
        if (isMasked) {
          setInputData(value);
        }
      },
    }
  );

  // Handle input changes for non-masked inputs
  const handleInputChange = (e) => {
    // This handler is now only for formatters that are functions (like capitalize)
    // or for inputs with no formatter at all.
    if (!isMasked) {
      const value = e.target.value;
      // If formatter is a function, use it. Otherwise, just set the value.
      setInputData(typeof formatter === 'function' ? formatter(value) : value);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setInputData(initialValue || "");
    setIsValid(true);
  };

  const handleSaveClick = () => {
    const isVerified = verifier(inputData);
    setIsValid(isVerified);

    if (isVerified) {
      handleSave(field, inputData);
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setInputData(initialValue || "");
    setIsValid(true);
    setIsEditing(false);
  };

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
          <div className="labeled-editable-container-input-group">
            <input
              type={secret ? "password" : "text"}
              // 4. Conditionally apply the ref for imask to take control
              ref={isMasked ? ref : null}
              // The value is always controlled by our React state
              value={inputData}
              // The onChange handler is now only for non-masked inputs
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className={!isValid ? "invalid-input" : ""}
            />
            <button onClick={handleSaveClick} className="save-button">
              <MdOutlineSave />
            </button>
            <button onClick={handleCancelClick} className="cancel-button">
              <TbEditOff />
            </button>
          </div>
        ) : (
          <div className="labeled-editable-container-display-group">
            <span className="labeled-editable-container-display-value">
              {secret ? "********" : initialValue}
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