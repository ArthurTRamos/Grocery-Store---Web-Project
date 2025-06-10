import React, { useState } from "react";

import "./SelectLabeledEditableContainer.css";

import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

function SelectLabeledEditableContainer({
  displayName,
  field,
  handleTypeChange,
  initialValue,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputData, setInputData] = useState(initialValue); // true or false

  const handleInputChange = (e) => {
    const value = e.target.value === "true";
    setInputData(value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setInputData(initialValue);
  };

  const handleSaveClick = (e) => {
    handleTypeChange(inputData);
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

  const getDisplayText = (value) => {
    return value === true ? "Administrador" : "Cliente";
  };

  return (
    <div className="labeled-editable-container">
      <div className="labeled-editable-container-display-name">
        {displayName}
      </div>
      <div className="labeled-editable-container-main">
        {isEditing ? (
          <div className="labeled-editable-container-input-group">
            <select
                value={inputData.toString()}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                autoFocus
            >
                <option value="false">Cliente</option>
                <option value="true">Administrador</option>
            </select>
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
              {getDisplayText(initialValue)}
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

export default SelectLabeledEditableContainer;
