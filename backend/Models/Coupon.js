import mongoose from "mongoose";

const Schema = mongoose.Schema;

const coupon = new Schema({
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

const Coupon = mongoose.model('Coupons', coupon);
export default Coupon;