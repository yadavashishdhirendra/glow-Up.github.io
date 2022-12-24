const express = require('express');
const { registerUser, loginUser, ownDetails, logoutUser, updateUserProfile, updatePassword, getSaloonName } = require('../controllers/UserController');
const { isAuthenticatedUser } = require('../middleware/authToken');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticatedUser, ownDetails);
router.route('/logout').get(isAuthenticatedUser, logoutUser)
router.route('/update-profile').put(isAuthenticatedUser, updateUserProfile);
router.route('/update/password').put(isAuthenticatedUser, updatePassword);
router.route('/saloon/name/user').get(isAuthenticatedUser, getSaloonName)

module.exports = router;