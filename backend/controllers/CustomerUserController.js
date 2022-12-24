const CustomeUserModel = require("../models/CustomeUserModel");
const SalonModel = require("../models/SaloonSchema");
const UserBookingModel = require("../models/CustomerBookingModel");
const PartnerBookingModel = require("../models/BookingModel");
const config = require('../Twilio');
const client = require('twilio')(config.AccountSID, config.authToken)
const crypto = require('crypto');

// ROUTE 1 => REGISTERATION
exports.registerUser = async (req, res) => {
    try {
        const { phone, name } = req.body;
        const user = await CustomeUserModel.findOne({ phone: phone })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const ttl = 2 * 60 * 1000;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = crypto.createHmac('sha256', config.serviceId).update(data).digest('hex');
        const fullHash = `${hash}.${expires}`;

        client.messages
            .create({
                body: `Your One Time Password For Glowup is ${otp}`,
                from: +18155510422,
                to: '+91' + phone
            })
            .then((messages) => console.log(messages))
            .catch((err) => console.error(err));

        res.status(200).json({ phone, hash: fullHash, name, message: "OTP Send Successfully" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.registerBookingUser = async (req, res) => {
    try {
        const { phone, name } = req.body;
        let user = await CustomeUserModel.findOne({ phone: phone })
        if (user) {
            return res.status(200).json({
                success: true,
                user
            })
        }

        user = await CustomeUserModel.create({
            name, phone
        })
        await user.save()

        return res.status(200).json({
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

// ROUTE 2 => VERIFY USER
exports.verifyUser = async (req, res) => {
    try {
        const { name, phone, hash, otp } = req.body;
        const user = await CustomeUserModel.findOne({ phone: phone })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }
        let [hashValue, expires] = hash.split('.');

        let now = Date.now();
        if (now > parseInt(expires)) {
            return res.status(504).send({ msg: 'Timeout. Please try again' });
        }

        let data = `${phone}.${otp}.${expires}`;
        let newCalculatedHash = crypto.createHmac('sha256', config.serviceId).update(data).digest('hex');
        if (newCalculatedHash === hashValue) {
            const user = await CustomeUserModel.create({
                name, phone
            })
            await user.save()

            // Generating TOKEN
            const token = await user.generateTokens();
            const options = {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }


            return res.status(200).cookie("token", token, options).json({
                success: true,
                message: `Verified Success`,
                token,
                user
            })
        }
        else {
            return res.status(400).json({ success: false, message: `Incorrect Otp` })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// ROUTE 3 => LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { phone } = req.body;
        const user = await CustomeUserModel.findOne({ phone: phone })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exists"
            })
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const ttl = 2 * 60 * 1000;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = crypto.createHmac('sha256', config.serviceId).update(data).digest('hex');
        const fullHash = `${hash}.${expires}`;

        client.messages
            .create({
                body: `Your One Time Password For Glowup is ${otp}`,
                from: +18155510422,
                to: '+91' + phone
            })
            .then((messages) => console.log(messages))
            .catch((err) => console.error(err));

        res.status(200).json({ phone, hash: fullHash, message: "OTP Send Successfully" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 4 => VERIFY USER FOR LOGIN
exports.verifyUserLogin = async (req, res) => {
    try {
        const { phone, hash, otp } = req.body;
        const user = await CustomeUserModel.findOne({ phone: phone })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exists"
            })
        }

        // Generating TOKEN
        const token = await user.generateTokens();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        let [hashValue, expires] = hash.split('.');

        let now = Date.now();
        if (now > parseInt(expires)) {
            return res.status(504).send({ msg: 'Timeout. Please try again' });
        }

        let data = `${phone}.${otp}.${expires}`;
        let newCalculatedHash = crypto.createHmac('sha256', config.serviceId).update(data).digest('hex');
        if (newCalculatedHash === hashValue) {
            return res.status(200).cookie("token", token, options).json({
                success: true,
                message: `Verified Success`,
                token,
                user
            })
        }
        else {
            return res.status(400).json({ success: false, message: `Incorrect Otp` })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 5 => GET OWN USER DETAILS
exports.getLoggedInUser = async (req, res) => {
    try {
        const user = await CustomeUserModel.findById(req.user.id);
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

// ROUTE 6 => LOGOUT USER
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


// SEND BULK SMS
exports.sendBulkSMS = async (req, res) => {
    try {
        const numbersToMessage = ["+919820384039", "+919987487256", "+919920106756", "+919146624843", "+918850673793", "+919870259136", "+918108332771"]

        numbersToMessage.forEach(async number => {
            const message = await client.messages.create({
                body: 'Hey Ashish Yadav This Side SDE-Level 1',
                from: '+18155510422',
                to: number
            });
            console.log(message.status)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 1 => REGISTER A USER
// exports.registerUserDemoAccount = async (req, res) => {
//     try {
//         const { phone, name, otp } = req.body;
//         let user = await CustomeUserModel.findOne({ phone });
//         if (user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User Already Exists"
//             })
//         }

//         if (!phone || !name || !otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please fill all the required fields"
//             })
//         }

//         user = await CustomeUserModel.create({
//             name, phone, otp
//         })
//         await user.save()

//         // GENERATING TOKEN HERE
//         const token = await user.generateTokens();
//         const options = {
//             expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//             httpOnly: true
//         }

//         res.status(200).cookie("token", token, options).json({
//             success: true,
//             message: "Register Success",
//             user,
//             token
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }


// ROUTE 1 => REGISTER A USER
exports.loginUserDemoAccount = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        let user = await CustomeUserModel.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exists"
            })
        }

        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please Fill all the required fields"
            })
        }

        // if (phone !== 9820384039 || otp !== 4113) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "This Is a Demo Account You have to enter the demo account Phone Number & OTP!"
        //     })
        // }
        // GENERATING TOKEN HERE
        const token = await user.generateTokens();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Login Success",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// DELETE USER WITH ALL HIS/HER DATA
exports.deleteUser = async (req, res) => {
    try {
        const user = await CustomeUserModel.findById(req.user.id);
        const like = user.likes;
        const Userbook = user.bookings;
        const PartnerBook = user.partnersBooking;
        const userId = user._id;
        await user.remove();
        // LOGOUT USER AFTER DELETEING USER
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        // DELETE USER LIKES FROM SALOON
        for (let i = 0; i < like.length; i++) {
            const likee = await SalonModel.findById(like[i]);
            const index = likee.likes.indexOf(userId)
            likee.likes.splice(index, 1)
            await likee.save();
        }
        // DELETE USER APP BOOKING 
        for (let i = 0; i < Userbook.length; i++) {
            const UserAppBooking = await UserBookingModel.findById(Userbook[i]);
            await UserAppBooking.remove();
        }
        // DELETE PARTNER APP BOOKING 
        for (let i = 0; i < PartnerBook.length; i++) {
            const PartnerAppBooking = await PartnerBookingModel.findById(PartnerBook[i]);
            console.log(PartnerAppBooking)
            await PartnerAppBooking.remove();
        }
        res.status(200).json({
            success: true,
            message: "Profile Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}