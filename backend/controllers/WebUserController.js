const BookingModel = require('../models/BookingModel');
const WebUser = require('../models/UserWebModel');

// ROUTE 1 => REGISTER A USER
exports.registerWebUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await WebUser.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        user = await WebUser.create({
            name, email, password
        })

        // GENERATING TOKEN HERE
        const token = await user.generateCookie();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Register Success",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 2 => LOGIN USER
exports.loginWebUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await WebUser.findOne({ email }).select("+password");
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't exist"
            })
        }
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email id or password"
            })
        }
        // GENERATING TOKEN HERE
        const token = await user.generateCookie();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Login Success",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 3 => GET ALL BOOKINGS
exports.allBookingsWeb = async (req, res) => {
    try {
        const bookings = await BookingModel.find().populate({
            path: "owner",
            populate: {
                path: "saloon",
                model: "Saloon"
            },
        }).populate("asignee").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            bookings,
            book: bookings.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 4 => LOGOUT USER
exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getWebUser = async (req, res) => {
    try {
        const user = await WebUser.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}