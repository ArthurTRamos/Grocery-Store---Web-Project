import React, { useState } from "react";

import "./SelectLabeledEditableContainer.css";

import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

/**
 * SelectLabeledEditableContainer component
 * 
 * Props:
 * - displayName: label text for the field
 * - field: field name (not used here but could be useful)
 * - handleTypeChange: function to call when saving a new value (boolean)
 * - initialValue: initial boolean value (true = Admin, false = Client)
 */
function SelectLabeledEditableContainer({
  displayName,
  field,
  handleTypeChange,
  initialValue,
}) {
  // State to track if the component is in edit mode or display mode
  const [isEditing, setIsEditing] = useState(false);

  // State to hold the current value of the select input (boolean)
  const [inputData, setInputData] = useState(initialValue);

  // Handle changes in the select input and convert string "true"/"false" to boolean
  const handleInputChange = (e) => {
    const value = e.target.value === "true";
    setInputData(value);
  };

  // Enable editing mode and reset inputData to initialValue
  const handleEditClick = () => {
    setIsEditing(true);
    setInputData(initialValue);
  };

  // Save the selected value by calling the parent's handler and exit edit mode
  const handleSaveClick = () => {
    handleTypeChange(inputData);
    setIsEditing(false);
  };

  // Cancel editing, revert changes, and exit edit mode
  const handleCancelClick = () => {
    setInputData(initialValue);
    setIsEditing(false);
  };

  // Handle keyboard shortcuts: Enter saves, Escape cancels
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveClick();
    } else if (e.key === "Escape") {
      handleCancelClick();
    }
  };

  // Convert boolean value to a user-friendly display string
  const getDisplayText = (value) => {
    return value === true ? "Administrador" : "Cliente";
  };

  return (
    <div className="labeled-editable-container">
      {/* Display the label for the input */}
      <div className="labeled-editable-container-display-name">
        {displayName}
      </div>

      {/* Main content: switches between display mode and edit mode */}
      <div className="labeled-editable-container-main">
        {isEditing ? (
          // Edit mode: show a select input with save and cancel buttons
          <div className="labeled-editable-container-input-group">
            <select
              value={inputData.toString()} // convert boolean to string for select
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              autoFocus
            >
              <option value="false">Cliente</option>
              <option value="true">Administrador</option>
            </select>

            {/* Save button */}
            <button onClick={handleSaveClick} className="save-button">
              <MdOutlineSave />
            </button>

            {/* Cancel button */}
            <button onClick={handleCancelClick} className="cancel-button">
              <TbEditOff />
            </button>
          </div>
        ) : (
          // Display mode: show the current value text and an edit button
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