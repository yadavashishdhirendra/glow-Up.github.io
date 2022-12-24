const express = require('express');
const { registerUser, verifyUser, loginUser, verifyUserLogin, getLoggedInUser, logoutUser, registerBookingUser, sendBulkSMS, registerUserDemoAccount, loginUserDemoAccount, deleteUser } = require('../controllers/CustomerUserController');
const CustomerAuth = require('../middleware/CustomerAuthToken');
const router = express.Router();

router.route('/customer/register').post(registerUser);
router.route('/verify/otp').post(verifyUser);
router.route('/customer/login').post(loginUser);
router.route('/login/verify/otp').post(verifyUserLogin);
router.route('/customer/user/me').get(CustomerAuth, getLoggedInUser)
router.route('/customer/user/logout').get(CustomerAuth, logoutUser);
router.route('/partner/user/register').post(registerBookingUser);
router.route('/send/bulk/sms').post(sendBulkSMS);
// router.route('/customer/register/demo').post(registerUserDemoAccount);
router.route('/customer/login/demo').post(loginUserDemoAccount);
router.route('/customer/delete/user').delete(CustomerAuth,deleteUser);


module.exports = router;