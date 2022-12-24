const validator = require('validator')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserWebModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
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
    }
})


// BCRYPTING PASSWORD
UserWebModel.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// GENERATING JSONWEBTOKEN
UserWebModel.methods.generateCookie = function () {
    return jwt.sign({
            id: this._id
        },
        process.env.JWT_SECRET
    )
}

// COMPARE PASSWORD WHEN LOGIN
UserWebModel.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("UserWeb", UserWebModel)