import mongoose from "mongoose";

const Schema = mongoose.Schema;

const product = new Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
});

const Product = mongoose.model('Product', product);
export default Product;

