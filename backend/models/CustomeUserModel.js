const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const CustomerUserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        require: true
    },
    otp: {
        type: Number
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerBooking'
    }],
    partnersBooking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Saloon"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// GENERATING JSONWEBTOKEN
CustomerUserModel.methods.generateTokens = function () {
    return jwt.sign({
            id: this._id
        },
        process.env.JWT_SECRET
    )
}

module.exports = mongoose.model("CustomerUser", CustomerUserModel)