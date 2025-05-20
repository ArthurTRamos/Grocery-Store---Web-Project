import React, { useState } from "react";
import "./NewCardForm.css";
import { MdOutlineSave } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

function NewCardForm({ onSave, onCancel }) {
  const [inputInfo, setInputInfo] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  });

  // Format functions
  const formatters = {
    cardNumber: (value) => {
      const cleaned = value.replace(/\D/g, "");
      return cleaned
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    },

    expirationDate: (value) => {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length >= 2) {
        return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      return cleaned;
    },

    cvv: (value) => value.replace(/\D/g, "").slice(0, 3),
  };

  // Handle input changes
  const handleInputData = (e) => {
    // Take the name and value from the event target
    const { name, value } = e.target;
    // Format the value based on the input name
    const formattedValue = formatters[name] ? formatters[name](value) : value;

    setInputInfo((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    onSave(inputInfo);
  };

  return (
    <div className="new-card-form-container">
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
      <form id="new-card-form" onSubmit={handleSave} className="new-card-form">
        <div className="new-card-form-content">
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

export default NewCardForm;
