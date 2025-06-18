// src/services/Formatters.js

// Import the core IMask library, which is used to create input masks.
import IMask from 'imask';

// This object centralizes all imask configuration options for reusability across the application.
export const imaskOptions = {
  // Configuration for a credit card number input.
  cardNumber: {
    // Defines the mask format: 16 digits separated by spaces. '0' is a placeholder for a digit.
    mask: '0000 0000 0000 0000',
  },
  // Configuration for a credit card expiration date input.
  expirationDate: {
    // Defines the mask format as Month/Year.
    mask: 'MM/YY',
    // Defines specific rules for the 'MM' and 'YY' blocks of the mask.
    blocks: {
      MM: {
        // Use a masked range to limit the possible values.
        mask: IMask.MaskedRange,
        // The month must be between 1 and 12.
        from: 1,
        to: 12,
      },
      YY: {
        mask: IMask.MaskedRange,
        // The year must be from the last two digits of the current year...
        from: new Date().getFullYear().toString().slice(2),
        // ...to the last two digits of the year 40 years from now.
        to: (new Date().getFullYear() + 40).toString().slice(2),
      },
    },
  },
  // Configuration for a CVV (Card Verification Value) input.
  cvv: {
    // The mask allows for 3 mandatory digits and one optional digit in brackets.
    mask: '000[0]',
  },
  // Configuration for a Brazilian phone number.
  phone: {
    // Defines the standard Brazilian format with area code and the nine-digit number.
    mask: '(00) 00000-0000',
  },
  // Configuration for a Brazilian postal code (CEP).
  postalCode: {
    // Defines the standard XXXXX-XXX format for a CEP.
    mask: '00000-000',
  },
  // Configuration for a coupon code input.
  coupon: {
    // The mask is a regular expression that allows any sequence of any characters.
    mask: /.*/,
    // The 'prepare' function is called before setting the value, forcing it to uppercase for consistency.
    prepare: (str) => str.toUpperCase(),
  },

  // Configuration for formatting a number as a price or currency value.
  price: {
    // The mask is set to the Number constructor to handle numeric input.
    mask: Number,
    // Number of digits after the decimal point (e.g., for cents).
    scale: 2,
    // Disallow negative numbers.
    signed: false,
    // Character to use for separating thousands.
    thousandsSeparator: ',',
    // Always show the fractional part, e.g., '12' becomes '12.00'.
    padFractionalZeros: true,
    // Remove leading zeros from the integer part (e.g., '0123' becomes '123').
    normalizeZeros: true,
    // The character used for the decimal point.
    radix: '.',
    // An array of characters that should be treated as the radix point (e.g., allows the user to type a comma instead of a period).
    mapToRadix: [','],
    // The minimum allowed value.
    min: 0,
  },

  // This is a general-purpose utility function, not an imask configuration.
  // It capitalizes the first letter of each word in a given string.
  capitalize: (value) => {
    // Return an empty string if the input is falsy (null, undefined, empty).
    if (!value) return '';
    // Split the string into an array of words, capitalize the first letter of each,
    // convert the rest of the word to lowercase, and then join them back into a single string.
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },
};

// Export the configuration object as the default export to be used in other parts of the application.
export default imaskOptions;