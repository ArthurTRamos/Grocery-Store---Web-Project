import React, { useState } from "react";
import "./EditNewCardForm.css";
import { MdOutlineSave } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

// Component for adding a new credit card with formatted inputs and save/cancel actions
function EditNewCardForm({ onSave, onCancel }) {
  // State to store form inputs
  const [inputInfo, setInputInfo] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });

  // Formatters for specific inputs to format values as user types
  const formatters = {
    cardNumber: (value) => {
      const cleaned = value.replace(/\D/g, ""); // Remove non-digits
      return cleaned
        .replace(/(\d{4})/g, "$1 ") // Add space every 4 digits
        .trim()
        .slice(0, 19); // Max length for card number formatting
    },

    expirationDate: (value) => {
      const cleaned = value.replace(/\D/g, ""); // Remove non-digits
      if (cleaned.length >= 2) {
        // Format as MM/YY
        return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      return cleaned;
    },

    cvv: (value) => value.replace(/\D/g, "").slice(0, 3), // Only allow max 3 digits
  };

  // Handler for input changes applying formatting based on input name
  const handleInputData = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatters[name] ? formatters[name](value) : value;

    setInputInfo((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  // Submit handler that calls onSave prop with current input data
  const handleSave = (e) => {
    e.preventDefault();
    onSave(inputInfo);
  };

  return (
    <div className="new-card-form-container">
      {/* Header with title and action buttons */}
      <div className="new-card-form-header">
        <p>Adicionar Novo Cartão</p>
        <div className="new-card-form-actions">
          <button type="submit" form="new-card-form">
            <MdOutlineSave />
          </button>
          <button type="button" onClick={onCancel}>
            <AiOutlineClose />
          </button>
        </div>
      </div>

      {/* Form with controlled inputs */}
      <form id="new-card-form" onSubmit={handleSave} className="new-card-form">
        <div className="new-card-form-content">
          {/* Left side inputs: cardholder name and card number */}
          <div className="new-card-form-left">
            <div className="new-card-form-group">
              <label htmlFor="cardHolderName">Nome do Titular</label>
              <input
                id="cardHolderName"
                name="cardHolderName"
                type="text"
                value={inputInfo.cardHolderName}
                onChange={handleInputData}
                required
              />
            </div>
            <div className="new-card-form-group">
              <label htmlFor="cardNumber">Número do Cartão</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={inputInfo.cardNumber}
                onChange={handleInputData}
                required
              />
            </div>
          </div>

          {/* Right side inputs: expiration date and CVV */}
          <div className="new-card-form-right">
            <div className="new-card-form-group">
              <label htmlFor="expirationDate">Validade</label>
              <input
                id="expirationDate"
                name="expirationDate"
                type="text"
                value={inputInfo.expirationDate}
                onChange={handleInputData}
                placeholder="MM/AA"
                required
              />
            </div>
            <div className="new-card-form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                type="text"
                value={inputInfo.cvv}
                onChange={handleInputData}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditNewCardForm;
