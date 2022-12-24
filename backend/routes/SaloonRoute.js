const express = require('express');
const { createSaloon, updateSaloonProfile, SpecificSaloon, uploadBannerImages, getSaloon, reviewProducts, getReviews, updateMobileNumber, addSaloonDescription } = require('../controllers/SaloonController');
const { isAuthenticatedUser } = require('../middleware/authToken');
const CustomerAuth = require('../middleware/CustomerAuthToken');
const router = express.Router();

router.route('/createsaloon').post(isAuthenticatedUser, createSaloon);
router.route('/saloon/:id').get(SpecificSaloon);
router.route('/upload/banner').put(isAuthenticatedUser, uploadBannerImages)
router.route('/get/user/saloon').get(isAuthenticatedUser, getSaloon)
router.route('/customer/review/saloon').put(CustomerAuth, reviewProducts)
router.route('/customer/get/review/saloon/:id').get(CustomerAuth, getReviews)
router.route('/update/whatsapp').put(isAuthenticatedUser, updateMobileNumber)
router.route('/update/saloon/description').put(isAuthenticatedUser, addSaloonDescription)

module.exports = router;