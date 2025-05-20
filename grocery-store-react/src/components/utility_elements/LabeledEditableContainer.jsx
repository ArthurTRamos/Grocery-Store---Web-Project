import React, { useState } from "react";

import "./LabeledEditableContainer.css";

import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

function LabeledEditableContainer({
  displayName,
  field,
  handleSave,
  initialValue,
  secret=false,
  select=false
}) {
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(false);
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
    <div className="labeled-editable-container">
      <div className="labeled-editable-container-display-name">
        {displayName}
      </div>
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
              <MdOutlineSave />
            </button>
            <button onClick={handleCancelClick} className="cancel-button">
              <TbEditOff />
            </button>
          </div>
        ) : (
          <div className="labeled-editable-container-display-group">
            {select ? select : (<span className="labeled-editable-container-display-value">
              {secret ? "*******" : initialValue}
            </span>)}
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
