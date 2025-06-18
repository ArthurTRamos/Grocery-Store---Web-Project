import React, { useState } from "react";
import { useIMask } from "react-imask"; // Import the hook for input masking.
import "./NewCardForm.css";
import { MdOutlineSave } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

// Import centralized formatting configurations and validation functions from service files.
import { imaskOptions } from "../../services/Formatters";
import verifiers from "../../services/Verifiers";

/**
 * A form component for adding a new credit card, featuring input masking,
 * formatting, and validation.
 */
function NewCardForm({ onSave, onCancel }) {
  // State for each form field.
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  // State to hold validation error messages for each field.
  const [errors, setErrors] = useState({});

  // Setup imask hooks for each input that requires masking.
  // The hook takes the configuration and an `onAccept` callback to update the state.
  const { ref: cardNumberRef } = useIMask(imaskOptions.cardNumber, {
    onAccept: (value) => setCardNumber(value),
  });
  const { ref: expDateRef } = useIMask(imaskOptions.expirationDate, {
    onAccept: (value) => setExpirationDate(value),
  });
  const { ref: cvvRef } = useIMask(imaskOptions.cvv, {
    onAccept: (value) => setCvv(value),
  });

  // Handle input changes for the non-masked cardholder name field.
  const handleCardHolderNameChange = (e) => {
    // Use the imported capitalize function for consistent formatting.
    const formattedValue = imaskOptions.capitalize(e.target.value);
    setCardHolderName(formattedValue);
    // Clear the error message for this field as the user types.
    if (errors.cardHolderName) {
      setErrors((prev) => ({ ...prev, cardHolderName: null }));
    }
  };

  // Validates all form fields using the imported verifier functions.
  const validateForm = () => {
    const newErrors = {};
    const inputInfo = { cardNumber, cardHolderName, expirationDate, cvv };

    const errorMessages = {
      cardHolderName: "Nome do titular inválido.",
      cardNumber: "O número do cartão deve ter 16 dígitos.",
      expirationDate: "Data de validade inválida.",
      cvv: "CVV deve ter 3 ou 4 dígitos.",
    };

    // Iterate over each field to check its validity.
    Object.keys(inputInfo).forEach((key) => {
      let isValid = true;
      // Use the appropriate verifier for each key.
      if (key === "cardHolderName") {
        isValid = verifiers.name(inputInfo[key]);
      } else if (verifiers[key]) {
        isValid = verifiers[key](inputInfo[key]);
      }
      // If a field is not valid, add the corresponding error message.
      if (!isValid) {
        newErrors[key] = errorMessages[key] || "Campo inválido.";
      }
    });

    setErrors(newErrors); // Update the errors state.
    // The form is valid if the newErrors object is empty.
    return Object.keys(newErrors).length === 0;
  };

  // Handles the form submission.
  const handleSave = (e) => {
    e.preventDefault(); // Prevent the default browser form submission.
    // If the form is valid, call the onSave prop with the new card data.
    if (validateForm()) {
      onSave({ cardNumber, cardHolderName, expirationDate, cvv });
    }
  };

  return (
    <div className="new-card-form-container">
      <div className="new-card-form-header">
        <p>Adicionar Novo Cartão</p>
        <div className="new-card-form-actions">
          {/* These buttons control the form but are located outside of the <form> tag. */}
          <button type="submit" form="new-card-form"><MdOutlineSave /></button>
          <button type="button" onClick={onCancel}><AiOutlineClose /></button>
        </div>
      </div>
      {/* The `id` attribute links this form to the submit button in the header. */}
      {/* `noValidate` disables default browser validation to allow custom logic to handle it. */}
      <form id="new-card-form" onSubmit={handleSave} className="new-card-form" noValidate>
        <div className="new-card-form-content">
          <div className="new-card-form-left">
            <div className="new-card-form-group">
              <label htmlFor="cardHolderName">Nome do Titular</label>
              {/* This is a standard controlled input because it uses a custom formatter, not imask. */}
              <input
                id="cardHolderName"
                name="cardHolderName"
                type="text"
                value={cardHolderName}
                onChange={handleCardHolderNameChange}
                className={errors.cardHolderName ? "input-error" : ""}
                required
              />
              {/* Conditionally render the error message if it exists. */}
              {errors.cardHolderName && <p className="error-message">{errors.cardHolderName}</p>}
            </div>
            <div className="new-card-form-group">
              <label htmlFor="cardNumber">Número do Cartão</label>
              {/* This input is controlled by the useIMask hook via the ref. */}
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                ref={cardNumberRef}
                defaultValue={cardNumber} // Use defaultValue with imask ref.
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
                ref={expDateRef} // Attach the ref from the expiration date hook.
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
                ref={cvvRef} // Attach the ref from the CVV hook.
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