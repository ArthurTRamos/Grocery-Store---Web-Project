import mongoose from "mongoose";

const Schema = mongoose.Schema;

const coupons = new Schema({
    couponNumber: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Coupons = mongoose.model('Coupons', coupons);
export default Coupons;