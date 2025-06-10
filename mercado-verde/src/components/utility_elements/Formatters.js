// src/utility_elements/Formatters.js

import IMask from 'imask';

// Centralized imask configuration objects
export const imaskOptions = {
  cardNumber: {
    mask: '0000 0000 0000 0000',
  },
  expirationDate: {
    mask: 'MM/YY',
    blocks: {
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
      },
      YY: {
        mask: IMask.MaskedRange,
        from: new Date().getFullYear().toString().slice(2), // Current year
        to: (new Date().getFullYear() + 40).toString().slice(2), // 10 years from now
      },
    },
  },
  cvv: {
    mask: '000[0]', // 3 or 4 digits
  },
  phone: {
    mask: '(00) 00000-0000',
  },
  postalCode: {
    mask: '00000-000',
  },
  coupon: {
    mask: /.*/, // Allow any character
    prepare: (str) => str.toUpperCase(), // Force to uppercase
  },

  capitalize: (value) => {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },
};

export default imaskOptions;