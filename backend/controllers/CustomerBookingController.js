const moment = require("moment");
const CustomerBooking = require("../models/CustomerBookingModel");
const CustomerUser = require('../models/CustomeUserModel');
const BookingModel = require("../models/BookingModel");
const UserModel = require('../models/UserModel');
const config = require('../Twilio');
const client = require('twilio')(config.AccountSID, config.authToken)

// ROUTE 1 => BOOK AN APPOINTMENT
exports.createCustomerBooking = async (req, res) => {
    try {
        const {
            date,
            category,
            asignee,
            servicename,
            results,
            price,
            intime,
            outtime,
            servicetype,
            paymentId,
            shopname,
            mobileno,
            paylater,
            selectedDate,
            serviceId
        } = req.body;
        const bookings = await CustomerBooking.create({
            date,
            category,
            asignee,
            servicename,
            results,
            price,
            intime,
            outtime,
            servicetype,
            paymentId,
            shopname,
            mobileno,
            paylater,
            selectedDate,
            serviceId,
            owner: req.user.id
        })

        const user = await CustomerUser.findById(req.user.id)
        user.bookings.push(bookings._id)
        await user.save()
        await bookings.save()

        client.messages
            .create({
                body: "GlowUp Confirmed! Your booking with" + " " + shopname + " " + "has been confirmed on" + " " + date + " " + "at" + " " + intime + " " + "with a bill of Rs" + " " + price + "/-" + " " + "Use our app to reschedule cancel and manage your booking and make future appointments!",
                from: 'whatsapp:+18559382503',
                to: `whatsapp:+91${user.phone}`
            })
            .then(message => console.log(message.sid))
            .done();

        client.messages
            .create({
                body: "Hey" + " " + shopname + ", " + "You have received a booking confirmation for" + " " + servicename + " " + "at time" + " " + intime + " " + "on date" + " " + date + " " + "Total amount: Rs" + " " + price + " " + "Thanks!",
                from: 'whatsapp:+18559382503',
                to: `whatsapp:+91${mobileno}`
            })
            .then(message => console.log(message.sid))
            .done();


        res.status(200).json({
            success: true,
            message: "Booked Success",
            bookings,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// GET BOOKING ROUTE => 2
exports.getCustomerBookedSlots = async (req, res) => {
    try {
        const {
            id,
            date,
        } = req.body;

        const bookings = await CustomerBooking.find({
            asignee: {
                $in: id
            },
            date,
        })


        console.log(bookings)
        let bookedTime = []

        bookings.forEach((ix) => {
            ix.results.forEach((iy) => {
                bookedTime.push(iy)
            })
        })


        res.status(200).json({
            success: true,
            bookedTime
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// GET BOOKING OF LOGGED IN USER => 3
exports.getLoggedInBookings = async (req, res) => {
    try {
        const bookings = await CustomerBooking.find({
            owner: req.user.id
        }).populate("asignee").sort("-createdAt")

        if (!bookings) {
            return res.status(400).json({
                success: false,
                message: "No Bookings Found"
            })
        }

        res.status(200).json({
            success: true,
            bookings
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// GET BOOKING DETAILS OF LOGGED IN USER => 3
exports.getLoggedInBookingsDetails = async (req, res) => {
    try {
        const bookings = await CustomerBooking.findById(req.params.id);

        if (!bookings) {
            return res.status(400).json({
                success: false,
                message: "No Bookings Found"
            })
        }

        res.status(200).json({
            success: true,
            bookings
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 4 => SHOW LIKED SALOONS 
exports.likedSavedSaloons = async (req, res) => {
    try {

        const user = await CustomerUser.findById(req.user.id).populate('likes')
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please Login First"
            })
        }

        let saloon = [];

        user.likes.forEach((x) => {
            if (saloon.includes(x)) {
                return null
            } else {
                saloon.push(x)
            }
        })
        return res.status(200).json({
            success: true,
            saloon
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 5 => GET SALOON NAME
exports.getSaloonBookings = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).populate('saloon');
        let shopname = user.saloon[0].shopname;

        var currentTimeStamp = moment(new Date()).format('DD/MM/YYYY');

        let employees = [];

        user && user.employees.forEach((item, index) => {
            if (employees.includes(item._id)) {
                return null
            } else {
                employees.push(item._id)
            }
        })

        const booking = await CustomerBooking.find({
            'asignee': {
                $in: employees
            },
            'date': currentTimeStamp,
            'shopname': shopname
        }).sort({
            createdAt: -1
        }).populate("asignee");
        const bookings = await CustomerBooking.find({
            'date': currentTimeStamp,
            'shopname': shopname
        }).sort({
            createdAt: -1
        })

        let unEmployeedBooking = [];
        bookings && bookings.map((i) => {
            if (i.asignee.length === 0) {
                unEmployeedBooking.push(i)
            } else {
                return null
            }
        })
        return res.status(200).json({
            success: true,
            booking,
            unEmployeedBooking
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.TodayBookings = async (req, res) => {
    try {

        var currentTimeStamp = moment(new Date()).format('DD/MM/YYYY');
        const bookings = await BookingModel.find({
            owner: req.user.id,
            'date': currentTimeStamp
        }).sort({
            createdAt: -1
        }).populate('asignee')

        res.status(200).json({
            success: true,
            bookings,
            BookingCount: bookings.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// GET INDIVIDUAL BOOKINGS (SINGLE)
exports.getSingleBookings = async (req, res) => {
    try {
        let bookings = await CustomerBooking.findById(req.params.id).populate("asignee");
        if (!bookings) {
            return res.status(200).json({
                success: false,
                message: "No Bookings Found"
            })
        }

        return res.status(200).json({
            success: true,
            bookings
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// CANCEL CUSTOMER BOOKING
exports.cancelCustomerBookings = async (req, res) => {
    try {
        let booking = await CustomerBooking.updateOne({
            _id: req.params.id
        }, {
            $unset: {
                results: ""
            }
        });

        const statusUpdate = {
            status: req.body.status
        }
        const employee = await CustomerBooking.findByIdAndUpdate(req.params.id, statusUpdate, {
            new: true,
            runValidators: false,
            useFindAndModify: false
        });

        return res.status(200).json({
            success: true,
            message: "Order Cancelled Success",
            employee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// CANCEL PREVIOUS CUSTOMER BOOKING
exports.cancelPreviousCustomerBookings = async (req, res) => {
    try {
        let booking = await CustomerBooking.updateOne({
            _id: req.params.bookingId
        }, {
            $unset: {
                results: ""
            }
        });

        const statusUpdate = {
            status: "Cancelled"
        }
        const cancelled = await CustomerBooking.findByIdAndUpdate(req.params.bookingId, statusUpdate, {
            new: true,
            runValidators: false,
            useFindAndModify: false
        });

        return res.status(200).json({
            success: true,
            message: "Order Cancelled Success",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// GET BOOKING OF LOGGED IN USER => 3
exports.getCustomerBookingsUsingShopname = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).populate('saloon');
        let shopname = user.saloon[0].shopname;
        const bookings = await CustomerBooking.find({
            "shopname": shopname
        }).populate("asignee").sort("-createdAt")

        if (!bookings) {
            return res.status(400).json({
                success: false,
                message: "No Bookings Found"
            })
        }

        res.status(200).json({
            success: true,
            bookings
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}