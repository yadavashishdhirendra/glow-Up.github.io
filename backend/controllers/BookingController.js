const Booking = require("../models/BookingModel");
const Services = require("../models/ServicesSchema");
const User = require("../models/UserModel");
const Employee = require('../models/EmployeeSchema')
const CustomerUser = require('../models/CustomeUserModel')
const config = require('../Twilio');
const moment = require("moment");
const client = require('twilio')(config.AccountSID, config.authToken)

// ROUTE 1 => BOOK AN APPOINTMENT
exports.createBooking = async (req, res) => {
    try {
        const { date, category, asignee, service, result, price, intime, outtime, name, phone, servicetype, nail, serviceid } = req.body;
        // console.log(status)
        // let booked = await Booking.findOne({ "intime": intime, "todaydate": todaydate, "asignee": asignee, "category": category })
        // if (booked) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Already Booked"
        //     })
        // }


        const userSalon = await User.findById(req.user.id).populate("saloon")

        let shopname = userSalon.saloon[0].shopname;

        const bookings = await Booking.create({
            date, category, asignee, service, result, price, intime, outtime, name, phone, servicetype, nail, serviceid,
            owner: req.user.id
        })

        const customerUser = await CustomerUser.findOne({ phone: phone })

        const user = await User.findById(req.user.id)
        user.bookings.push(bookings._id)
        customerUser.partnersBooking.push(bookings._id)
        await customerUser.save()
        await user.save()
        await bookings.save()

        client.messages
            .create({
                body: "GlowUp Confirmed!" + " " + "Your booking with" + " " + shopname + " " + "has been confirmed on" + " " + date + " " + "at" + " " + intime + " " + "with a bill of Rs" + " " + price + "/-" + " " + "Download our app to manage your booking and make future Bookings!",
                from: 'whatsapp:+18559382503',
                to: `whatsapp:+91${phone}`
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

// CHECK AVAILABILITY BEFORE BOOKING
exports.employeeStatusUpdate = async (req, res) => {
    try {
        const statusUpdate = {
            status: req.body.status
        }
        const employee = await Employee.findByIdAndUpdate(req.params.id, statusUpdate, {
            new: true,
            runValidators: false,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            employee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 2 => GET ALL BOOKINGS
exports.loggedInUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            owner: req.user.id,
        }).sort({ createdAt: -1 }).populate('asignee')

        // let info = {}
        // bookings.forEach((data) => {
        //     if (info[data['date']] == undefined || info[data['date']] == null) {
        //         info[data['date']] = [data];

        //     } else {
        //         info[data['date']].push(data);
        //     }
        // })

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

// ROUTE 3 => GET ALL EMPLOYEES FOR A PARTICULAR SERVICE
exports.specificServiceEmployee = async (req, res) => {
    try {
        const serviceEmployee = await Services.find({
            owner: req.user.id,
            "servicetype": req.body.servicetype
        }).populate('myemployees')

        let arr = [];
        serviceEmployee.forEach((ix) => {
            ix.myemployees.forEach((x) => {
                if (arr.includes(x)) {
                    return null
                }
                else {
                    arr.push(x)
                }
            })
        })

        res.status(200).json({
            success: true,
            arr,
            serviceEmployee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 4 => GET DURATION BY SERVICE NAME
exports.getServiceDuration = async (req, res) => {
    try {
        const duration = await Services.find({
            owner: req.user.id,
            "servicetype": req.body.servicetype
        })

        res.status(200).json({
            success: true,
            duration
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE SAME AS ABOVE
exports.getServiceName = async (req, res) => {
    try {
        const servicename = await Services.find({
            owner: req.user.id,
            "servicetype": req.body.servicetype,
            "category": req.body.category,
        })

        res.status(200).json({
            success: true,
            servicename
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE SAME AS ABOVE
exports.getAccurateServiceDuration = async (req, res) => {
    try {
        const servicenames = await Services.findOne({
            owner: req.user.id,
            "servicetype": req.body.servicetype,
            "category": req.body.category,
            "servicename": req.body.servicename
        })

        res.status(200).json({
            success: true,
            servicenames
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// BOOKED SLOT ROUTE => 5
exports.getBookedSlots = async (req, res) => {
    try {
        const { id,
            date,
        } = req.body;

        const bookings = await Booking.find({
            asignee:
                { $in: id },
            date,
        })

        let bookedTime = []

        bookings.forEach((ix) => {
            ix.result.forEach((iy) => {
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



// ROUTE 6 => DELETE OR CANCEL BOOKING
exports.deleteSingleBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        const userId = await User.findById(req.user.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            })
        }

        // REMOVING SPECIFIC BOOKING ID FROM USER MODEL
        if (userId.bookings.includes(booking._id)) {
            const removeBooking = userId.bookings.indexOf(booking._id);
            userId.bookings.splice(removeBooking, 1);
        }

        await userId.save()
        await booking.remove();
        res.status(200).json({
            success: true,
            message: "Booking Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 6 => DELETE OR CANCEL BOOKING
exports.ReschedulingdeleteSingleBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookId);
        const userId = await User.findById(req.user.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking Not Found"
            })
        }

        // REMOVING SPECIFIC BOOKING ID FROM USER MODEL
        if (userId.bookings.includes(booking._id)) {
            const removeBooking = userId.bookings.indexOf(booking._id);
            userId.bookings.splice(removeBooking, 1);
        }

        await userId.save()
        await booking.remove();
        res.status(200).json({
            success: true,
            message: "Booking Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 7 => VIEW SINGLE BOOKING DETAILS
exports.getSingleBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('asignee')
        if (!booking) {
            return res.status(200).json({
                success: false,
                message: "No Booking Exists!"
            })
        }

        res.status(200).json({
            success: true,
            booking
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 8 => POST CANCELLED ORDER IN BOOKINGS MODEL WITH STATUS CANCELLED
exports.createCancelledBooking = async (req, res) => {
    try {
        const { date, category, asignee, service, price, intime, outtime, name, phone, servicetype, serviceid, nail } = req.body;
        const bookings = await Booking.create({
            date, category, asignee, service, price, intime, outtime, name, phone, servicetype, serviceid, status: "Cancelled", nail,
            owner: req.user.id
        })


        const user = await User.findById(req.user.id)
        user.bookings.push(bookings._id)
        await user.save()
        await bookings.save()

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

// GET UPCOMING BOOKINGS
exports.getUpcomingBooking = async (req, res) => {
    try {
        // let currentTime = moment().format('hh:mm a')

        let date = moment().format('hh:mm a')

        let bookings = await Booking.find({
            date: moment().format('DD/MM/YYYY'),
            // "intime": {
            //     $gte: moment().format('hh:mm a')
            // },
            owner: req.user.id
        }).populate("asignee")

        let lasttwochar;
        bookings && bookings.forEach((x) => {
            lasttwochar = x.intime
        })

        lasttwochar = lasttwochar.slice(-2)

        let current = date.slice(-2)

        console.log(lasttwochar, current)

        if (lasttwochar === current) {
            console.log(true)
        }
        else {
            console.log(false)
        }

        let upcoming = []
        bookings && bookings.forEach((time) => {
            if (lasttwochar !== current) {
                return null
            }
            else if (time.intime > moment().format('hh:mm a')) {
                upcoming.push(time)
            }
            else {
                return null
            }
        })

        res.status(200).json({
            success: true,
            upcoming
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}