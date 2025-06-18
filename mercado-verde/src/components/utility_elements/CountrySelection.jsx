import React from "react";
import "./CountrySelection.css"; // Import the CSS file for styling

/**
 * CountrySelection Component
 * Props:
 * - value: selected country value (string)
 * - onChange: function to update selected country
 */
function CountrySelection({ value, onChange }) {
  
  // Handle change in select input and call parent onChange handler
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value); // Send selected value to parent component
    }
  };

  return (
    // Container for the label and select dropdown
    <div className="form-group">
      {/* Label for the country select dropdown */}
      <label htmlFor="pais">País</label>

      {/* Select dropdown with country options */}
      <select 
        id="pais"               // Link label to select
        value={value}           // Current selected value
        onChange={handleChange} // Handle selection change
      >
        {/* Default empty option */}
        <option value="">Selecione...</option>

        {/* Country options */}
        <option value="Brasil">Brasil</option>
        <option value="Argentina">Argentina</option>
        <option value="Chile">Chile</option>
        <option value="Colômbia">Colômbia</option>
        <option value="Uruguai">Uruguai</option>
        <option value="Paraguai">Paraguai</option>
        <option value="Peru">Peru</option>
        <option value="Equador">Equador</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Bolívia">Bolívia</option>
      </select>
    </div>
  );
}

export default CountrySelection;
