const mongoose = require('mongoose');
const BookingModel = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    asignee: [{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Employee"
    }],
    service: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Booked"
    },
    result: [{
        type: String,
        // required: true
    }],
    price: {
        type: String,
        required: true
    },
    intime: {
        type: String,
        required: true
    },
    outtime: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    servicetype: {
        type: String,
        required: true
    },
    nail: {
        type: String
    },
    serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Booking", BookingModel)