// Import the Mongoose library, which is used to create schemas and models for MongoDB.
import mongoose from "mongoose";

// Create a shorthand reference to the mongoose.Schema class.
const Schema = mongoose.Schema;

// Define the schema for the 'coupon' collection.
// A schema outlines the structure, data types, and validation rules for the documents.
const coupon = new Schema({
    // Defines the coupon code itself.
    couponNumber: {
        type: String, // The data type is a string.
        required: true // This field must be provided for a document to be valid.
    },
    // Defines the value of the discount.
    discount: {
        type: Number, // The data type is a number.
        required: true // This field is mandatory.
    },
    // Defines the type of discount (e.g., 'money' or 'percentage').
    type: {
        type: String, // The data type is a string.
        required: true // This field is mandatory.
    }
});

// Create a Mongoose model from the schema.
const Coupon = mongoose.model('Coupons', coupon);

// Export the Coupon model to be used in other parts of the application
export default Coupon;