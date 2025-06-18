import React, { useState } from "react";
import "./SelectLabeledEditableContainer.css";

// Import icons for the buttons
import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
import { MdOutlineSave } from "react-icons/md";

/**
 * A reusable component that displays a labeled value and allows in-place editing
 * via a dropdown select input.
 */
function SelectEditableContainer({
  displayName,  // The label text to display for the field.
  field,        // An identifier for the field, passed to handleSave.
  handleSave,   // The function to call when saving the new value.
  initialValue, // The starting value to display.
  options = [],   // The list of options for the dropdown. Ex: [{ value: 'a', label: 'Option A' }]
}) {
  // State to toggle between display mode and edit mode.
  const [isEditing, setIsEditing] = useState(false);
  // State to hold the current value of the select input during editing.
  const [inputData, setInputData] = useState(initialValue || "");

  // Find the corresponding label for a given value from the options list.
  const getLabelForValue = (value) => {
    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : value;
  };

  // Handles changes from the select input.
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  // Switch to editing mode.
  const handleEditClick = () => {
    setIsEditing(true);
    setInputData(initialValue || ""); // Reset input to initial value on edit start.
  };

  // Handle the save action.
  const handleSaveClick = async () => {
    await handleSave(field, inputData); // Call the parent's save function.
    setIsEditing(false); // Exit editing mode.
  };

  // Cancel the edit and revert any changes.
  const handleCancelClick = () => {
    setInputData(initialValue || ""); // Revert to the original value.
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
            <select
              value={inputData}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus // Automatically focus the select input when it appears.
            >
              {/* Map over the options prop to create the dropdown list */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
              {/* Display the human-readable label for the initialValue */}
              {getLabelForValue(initialValue)}
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

export default SelectEditableContainer;