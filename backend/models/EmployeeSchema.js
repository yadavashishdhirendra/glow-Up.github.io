const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
    avatar: {
        public_id: "",
        url: ""
    },
    status: {
        type: String,
        default: "Active"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    result: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Employee", EmployeeSchema)