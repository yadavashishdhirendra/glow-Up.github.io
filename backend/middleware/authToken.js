const jwt = require('jsonwebtoken');
const Saloon = require('../models/SaloonSchema');
const User = require('../models/UserModel');

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please Login First"
            })
        }
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodeData.id);
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}