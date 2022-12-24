const jwt = require('jsonwebtoken');
const CustomeUserModel = require('../models/CustomeUserModel');

const CustomerAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please Login First",
            })
        }

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await CustomeUserModel.findById(decodeData.id);
        // console.log(req.user);
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = CustomerAuth;