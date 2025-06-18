// Import the Mongoose library, used for creating schemas and models for MongoDB.
import mongoose from "mongoose";

// Create a shorthand reference to the mongoose.Schema class for convenience.
const Schema = mongoose.Schema;

// Define the schema for the 'product' collection.
// This outlines the structure and data types for product documents.
const product = new Schema({
    // The category the product belongs to (e.g., 'Vegetables', 'Fruits').
    category: {
        type: String,
        required: true // This field is mandatory.
    },
    // The name of the product.
    name: {
        type: String,
        required: true // This field is mandatory.
    },
    // The price of the product.
    price: {
        type: Number,
        required: true // This field is mandatory.
    },
    // The available stock quantity for the product.
    stock: {
        type: Number,
        required: true // This field is mandatory.
    },
    // The number of units of this product that have been sold.
    sold: {
        type: Number,
        required: true // This field is mandatory.
    },
    // An optional, longer description of the product.
    description: {
        type: String // This field is not required.
    },
    // An optional field to store the product's image, likely as a URL or a base64 string.
    image: {
        type: String // This field is not required.
    }
});

// Create a Mongoose model from the schema.
const Product = mongoose.model('Product', product);

// Export the Product model so it can be used by other parts of the application
export default Product;