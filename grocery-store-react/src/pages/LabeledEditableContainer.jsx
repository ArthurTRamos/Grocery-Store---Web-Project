import React, { useState } from "react";

import "./LabeledEditableContainer.css"

function LabeledEditableContainer({
  displayName,
  field,
  handleSave,
  initialValue,
}) {
  const [isEditing, setIsEditing] = useState(true);
  const [inputData, setInputData] = useState("");

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setInputData(initialValue);
  };

  const handleSaveClick = (e) => {
    handleSave(field, inputData);
    initialValue = inputData;
  };

  const handleCancelClick = (e) => {
    setInputData(initialValue);
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
    <div>
      <div className="labeled-editable-container-display-name">{displayName}</div>
      <div className="labeled-editable-container-main">
        {isEditing ? (
          <div className="labeled-editable-container-input-group">
            <input
              type="text"
              value={inputData}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button onClick={handleSaveClick} className="save-button">
              Save
            </button>
            <button onClick={handleCancelClick} className="cancel-button">
              Cancel
            </button>
          </div>
        ) : (
            <div className="labeled-editable-container-display-group">
            <span className="labeled-editable-container-display-value">{initialValue}</span>
            <button onClick={handleEditClick} className="edit-button">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LabeledEditableContainer;
