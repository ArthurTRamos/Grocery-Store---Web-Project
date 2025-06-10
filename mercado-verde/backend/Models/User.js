import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
    admin: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cel: {
        type: String,
        required: true
    },
    adress: {
        streetName: String,
        streetNumber: String,
        apartmentNumber: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
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
    coupons: [{
      couponNumber: {
        type: String,
        required: true
      },
      used: {
        type: Boolean,
        required: true
      }
    }]
});

const User = mongoose.model('User', user);
export default User;