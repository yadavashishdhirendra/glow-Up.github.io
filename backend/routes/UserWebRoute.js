const express = require('express');
const { registerWebUser, allBookingsWeb, loginWebUser, logoutUser, getWebUser } = require('../controllers/WebUserController');
const WebAuth = require('../middleware/authUserToken');
const router = express.Router();

router.route('/register/user/bookings').post(registerWebUser);
router.route('/allweb/user/bookings').get(WebAuth, allBookingsWeb);
router.route('/login/user/bookings').post(loginWebUser);
router.route('/logout/user/bookings').get(WebAuth, logoutUser);
router.route('/web/user').get(WebAuth, getWebUser);

module.exports = router;