const mongoose = require('mongoose');

const CustomerBookingModel = new mongoose.Schema({
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
        ref: "Employee",
        default: '123'
    }],
    servicename: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Booked"
    },
    results: [{
        type: String,
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
    servicetype: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
    },
    shopname: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
    },
    contact: {
        type: Number,
    },
    paylater: {
        type: String,
    },
    selectedDate: {
        type: String,
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerUser",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "Booked"
    }
})

module.exports = mongoose.model("CustomerBooking", CustomerBookingModel)