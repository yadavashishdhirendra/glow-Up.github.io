const validator = require('validator')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Please Enter a valid Email']
    },
    password: {
        type: String,
        required: true,
        select: false,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    avatar: {
        public_id: "",
        url: ""
    },
    mobileno: {
        type: Number,
    },
    saloon: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Saloon'
    }],
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services'
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }]
})


// BCRYPTING PASSWORD
UserModel.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// GENERATING JSON WEBTOKEN
UserModel.methods.generateToken = function () {
    return jwt.sign({
            id: this._id
        },
        process.env.JWT_SECRET
    )
}

// UPDATE MATCH PASSWORD 
UserModel.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


// COMPARE PASSWORD WHEN LOGIN
UserModel.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
module.exports = mongoose.model("User", UserModel)