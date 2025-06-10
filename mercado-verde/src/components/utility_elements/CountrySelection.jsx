import React from "react";

import "./CountrySelection.css"; // Import the CSS file for styling

function CountrySelection({value, onChange}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="pais">País</label>
      <select 
        id="pais" 
        value={value}
        onChange={handleChange}
      >
        <option value="">Selecione...</option>
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
