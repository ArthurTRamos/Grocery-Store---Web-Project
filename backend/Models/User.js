// Import the Mongoose library, used for creating schemas and models for MongoDB.
import mongoose from "mongoose";

// Create a shorthand reference to the mongoose.Schema class for convenience.
const Schema = mongoose.Schema;

// Define the schema for the 'user' collection.
// This is a comprehensive schema that includes nested objects and arrays of objects.
const user = new Schema({
    // A boolean flag to determine if the user has administrative privileges.
    admin: {
        type: Boolean,
        required: true // This field is mandatory.
    },
    // The user's full name.
    name: {
        type: String,
        required: true // This field is mandatory.
    },
    // The user's email address, used for login and communication.
    email: {
        type: String,
        required: true // This field is mandatory.
    },
    // The user's password. In a real application, this should be hashed before saving.
    password: {
        type: String,
        required: true // This field is mandatory.
    },
    // The user's cell phone number.
    cel: {
        type: String,
        required: true // This field is mandatory.
    },
    // A nested object containing the user's address information.
    adress: {
        streetName: String,
        streetNumber: String,
        apartmentNumber: String, // e.g., Apartment, suite, etc.
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    // An array of nested objects, where each object represents a saved payment method.
    paymentMethods: [{
      cardNumber: {
        type: String,
        required: true
      },
      cardHolderName: {
        type: String,
        required: true
      },
      expirationDate: {
        type: String,
        required: true
      },
      cvv: {
        type: String,
        required: true
      }
    }],
    // An array of nested objects representing coupons associated with the user.
    coupons: [{
      // The unique code of the coupon the user possesses.
      couponNumber: {
        type: String,
        required: true
      },
      // A boolean flag to track whether the user has already used this coupon.
      used: {
        type: Boolean,
        required: true
      }
    }]
});

// Create a Mongoose model from the schema.
const User = mongoose.model('User', user);

// Export the User model to make it available for other parts of the application.
export default User;