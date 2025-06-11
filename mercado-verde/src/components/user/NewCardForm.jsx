import React, { useState } from "react";
import { useIMask } from "react-imask"; // Import the hook
import "./NewCardForm.css";
import { MdOutlineSave } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

// Import the centralized imask configurations and the capitalize function
import { imaskOptions } from "../../services/Formatters";
import verifiers from "../../services/Verifiers";

function NewCardForm({ onSave, onCancel }) {
  // State for each field
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({});

  // Setup imask hooks for each input
  const { ref: cardNumberRef } = useIMask(imaskOptions.cardNumber, {
    onAccept: (value) => setCardNumber(value),
  });
  const { ref: expDateRef } = useIMask(imaskOptions.expirationDate, {
    onAccept: (value) => setExpirationDate(value),
  });
  const { ref: cvvRef } = useIMask(imaskOptions.cvv, {
    onAccept: (value) => setCvv(value),
  });

  // Handle manual input changes for non-masked fields
  const handleCardHolderNameChange = (e) => {
    const formattedValue = imaskOptions.capitalize(e.target.value);
    setCardHolderName(formattedValue);
    if (errors.cardHolderName) {
      setErrors((prev) => ({ ...prev, cardHolderName: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const inputInfo = { cardNumber, cardHolderName, expirationDate, cvv };

    const errorMessages = {
      cardHolderName: "Nome do titular inválido.",
      cardNumber: "O número do cartão deve ter 16 dígitos.",
      expirationDate: "Data de validade inválida.",
      cvv: "CVV deve ter 3 ou 4 dígitos.",
    };

    Object.keys(inputInfo).forEach((key) => {
      let isValid = true;
      if (key === "cardHolderName") {
        isValid = verifiers.name(inputInfo[key]);
      } else if (verifiers[key]) {
        isValid = verifiers[key](inputInfo[key]);
      }
      if (!isValid) {
        newErrors[key] = errorMessages[key] || "Campo inválido.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ cardNumber, cardHolderName, expirationDate, cvv });
    }
  };

  return (
    <div className="new-card-form-container">
      <div className="new-card-form-header">
        <p>Adicionar Novo Cartão</p>
        <div className="new-card-form-actions">
          <button type="submit" form="new-card-form"><MdOutlineSave /></button>
          <button type="button" onClick={onCancel}><AiOutlineClose /></button>
        </div>
      </div>
      <form id="new-card-form" onSubmit={handleSave} className="new-card-form" noValidate>
        <div className="new-card-form-content">
          <div className="new-card-form-left">
            <div className="new-card-form-group">
              <label htmlFor="cardHolderName">Nome do Titular</label>
              <input
                id="cardHolderName"
                name="cardHolderName"
                type="text"
                value={cardHolderName}
                onChange={handleCardHolderNameChange} // Use dedicated handler
                className={errors.cardHolderName ? "input-error" : ""}
                required
              />
              {errors.cardHolderName && <p className="error-message">{errors.cardHolderName}</p>}
            </div>
            <div className="new-card-form-group">
              <label htmlFor="cardNumber">Número do Cartão</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                ref={cardNumberRef} // Use the ref from the hook
                defaultValue={cardNumber}
                className={errors.cardNumber ? "input-error" : ""}
                required
              />
              {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
            </div>
          </div>
          <div className="new-card-form-right">
            <div className="new-card-form-group">
              <label htmlFor="expirationDate">Validade</label>
              <input
                id="expirationDate"
                name="expirationDate"
                type="text"
                ref={expDateRef} // Use the ref from the hook
                defaultValue={expirationDate}
                placeholder="MM/AA"
                className={errors.expirationDate ? "input-error" : ""}
                required
              />
              {errors.expirationDate && <p className="error-message">{errors.expirationDate}</p>}
            </div>
            <div className="new-card-form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                type="text"
                ref={cvvRef} // Use the ref from the hook
                defaultValue={cvv}
                className={errors.cvv ? "input-error" : ""}
                required
              />
              {errors.cvv && <p className="error-message">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewCardForm;