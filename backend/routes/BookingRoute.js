const express = require('express');
const { createBooking, loggedInUserBookings, specificServiceEmployee, employeeStatusUpdate, getServiceDuration, getBookedSlots, getSingleBooking, deleteSingleBooking, createCancelledBooking, getServiceName, getAccurateServiceDuration, getUpcomingBooking, ReschedulingdeleteSingleBooking } = require('../controllers/BookingController');
const { isAuthenticatedUser } = require('../middleware/authToken');
const router = express.Router();

router.route('/createbooking').post(isAuthenticatedUser, createBooking);
router.route('/bookings/me').get(isAuthenticatedUser, loggedInUserBookings);
router.route('/service/employees').post(isAuthenticatedUser, specificServiceEmployee);
router.route('/employee/status/:id').put(isAuthenticatedUser, employeeStatusUpdate);
router.route('/service/duration').post(isAuthenticatedUser, getServiceDuration);
router.route('/bookings').post(getBookedSlots);
router.route('/booking-details/:id').get(isAuthenticatedUser, getSingleBooking);
router.route('/cancel').post(isAuthenticatedUser, createCancelledBooking)
router.route('/bookingdelete/:id').delete(isAuthenticatedUser, deleteSingleBooking);
router.route('/bookingdelete/rescheduled/:bookId').delete(isAuthenticatedUser, ReschedulingdeleteSingleBooking);
router.route('/servicename').post(isAuthenticatedUser, getServiceName)
router.route('/service/accurate-duration').post(isAuthenticatedUser, getAccurateServiceDuration)
router.route('/upcoming/bookings').get(isAuthenticatedUser, getUpcomingBooking)

module.exports = router;