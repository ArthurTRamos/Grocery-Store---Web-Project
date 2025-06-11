/**
 * Verifies a cardholder name.
 * - Must not be empty.
 * - Should contain only letters (including those with tone marks) and spaces.
 * - Must be less than 40 characters.
 * @param {string} value - The cardholder name.
 * @returns {boolean} - True if valid, false otherwise.
 */
const name = (value) => {
  const trimmedValue = value ? value.trim() : "";
  if (trimmedValue.length === 0 || trimmedValue.length >= 40) {
    return false;
  }
  // This regex uses Unicode property escapes (\p{L}) to match any letter
  // from any language, including those with tone marks. The 'u' flag is required.
  return /^[\p{L}\s]+$/u.test(trimmedValue);
};

/**
 * Verifies the card number has 16 digits.
 * @param {string} value - The card number.
 * @returns {boolean} - True if it has 16 digits, false otherwise.
 */
const cardNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.length === 16;
};

/**
 * Verifies an expiration date (MM/YY).
 * - Must be in the format MM/YY.
 * - Must be in the future.
 * - Month must be valid (01-12).
 * @param {string} value - The expiration date string.
 * @returns {boolean} - True if valid, false otherwise.
 */
const expirationDate = (value) => {
  // Check if the format is strictly MM/YY
  if (!/^\d{2}\/\d{2}$/.test(value)) {
    return false;
  }

  const parts = value.split("/");
  const month = parseInt(parts[0], 10);
  const year = parseInt(parts[1], 10);

  if (month < 1 || month > 12) {
    return false;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  // Check if the card is expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
};

/**
 * Verifies a CVV.
 * - Must be 3 or 4 digits.
 * @param {string} value - The CVV.
 * @returns {boolean} - True if valid, false otherwise.
 */
const cvv = (value) => {
  const cleaned = value.replace(/\D/g, "");
  return /^\d{3,4}$/.test(cleaned);
};

/**
 * Verifies an email address format.
 * @param {string} value - The email address.
 * @returns {boolean} - True if the format is valid, false otherwise.
 */
const email = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

/**
 * Verifies a Brazilian phone number.
 * - Must have 10 or 11 digits.
 * @param {string} value - The phone number.
 * @returns {boolean} - True if valid, false otherwise.
 */
const phone = (value) => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.length === 10 || cleaned.length === 11;
};

/**
 * Verifies a Brazilian postal code (CEP).
 * - Must have 8 digits.
 * @param {string} value - The postal code.
 * @returns {boolean} - True if valid, false otherwise.
 */
const postalCode = (value) => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.length === 8;
};

/**
 * Verifies if a string contains only numeric characters.
 * @param {string} value - The input string.
 * @returns {boolean} - True if numeric, false otherwise.
 */
const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

const verifiers = {
  cardNumber,
  expirationDate,
  cvv,
  name,
  email,
  phone,
  postalCode,
  isNumeric,
};

export default verifiers;