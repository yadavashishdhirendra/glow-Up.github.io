const express = require('express');
const { createCustomerBooking, getCustomerBookedSlots, getLoggedInBookings, getLoggedInBookingsDetails, likedSavedSaloons, getSaloonBookings, TodayBookings, getSingleBookings, cancelCustomerBookings, cancelPreviousCustomerBookings, getCustomerBookingsUsingShopname } = require('../controllers/CustomerBookingController');
const { checkout, paymentVerification, apiKey, refundPayment } = require('../controllers/CustomerPaymentController');
const { isAuthenticatedUser } = require('../middleware/authToken');
const CustomerAuth = require('../middleware/CustomerAuthToken');
const router = express.Router();

router.route('/customer/checkout').post(CustomerAuth, checkout);
router.route('/customer/payment/verifcation').post(paymentVerification)
router.route('/getkey').get(CustomerAuth, apiKey);
router.route('/customer/booking').post(CustomerAuth, createCustomerBooking)
router.route('/customer/get/booking').post(getCustomerBookedSlots)
router.route('/customer/get/user/booking').get(CustomerAuth, getLoggedInBookings)
router.route('/customer/get/user/booking/details/:id').get(CustomerAuth, getLoggedInBookingsDetails)
router.route('/customer/saved/saloon').get(CustomerAuth, likedSavedSaloons)
router.route('/filter/bookings').get(isAuthenticatedUser, getSaloonBookings)
router.route('/filter/partner/bookings').get(isAuthenticatedUser, TodayBookings)
router.route('/refund/booking/payment').post(isAuthenticatedUser, refundPayment)
router.route('/booking/details/:id').get(isAuthenticatedUser, getSingleBookings)
router.route('/cancel/customer/bookings/:id').post(isAuthenticatedUser, cancelCustomerBookings)
router.route('/cancel/previous/bookings/:bookingId').post(isAuthenticatedUser, cancelPreviousCustomerBookings)
router.route('/customer/user/shopname/bookings').get(isAuthenticatedUser, getCustomerBookingsUsingShopname)

module.exports = router;