const mongoose = require('mongoose');

const SaloonSchema = new mongoose.Schema({
    shopname: {
        type: String,
    },
    ownername: {
        type: String,
    },
    businessemailid: {
        type: String,
    },
    companytype: {
        type: String,
    },
    address: {
        type: String,
    },
    addresssec: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    map: {
        type: String,
    },
    avatar: {
        public_id: "",
        url: ""
    },
    businesshours: [{
        day: {
            type: String,
            required: true
        },
        from: {
            type: String,
            default: "closed",
        },
        to: {
            type: String,
            default: "closed",
        },
    }],
    images: [{
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    }],
    description: {
        type: String,
        // required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerUser"
    }],
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomerUser",
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})


module.exports = mongoose.model("Saloon", SaloonSchema)