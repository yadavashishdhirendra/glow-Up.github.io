const express = require('express');
const { getService, getSingleSaloon, filterServiceCategory, getServiceIndividualSaloon, getServicesSaloon, getEmployeesByService, searchSaloons, getAllSaloons, likedUserSaloon, getEmployeesByServiceId, getSortedSaloon } = require('../controllers/CustomerServiceController');
const { likeUnlikeSaloon } = require('../controllers/SaloonController');
const { serviceDetails } = require('../controllers/ServiceController');
const CustomerAuth = require('../middleware/CustomerAuthToken');
const router = express.Router();

router.route('/customer/service').post(CustomerAuth, getService);
router.route('/customer/saloon/sort').get(CustomerAuth, getSortedSaloon);
router.route('/customer/saloon/:id').get(CustomerAuth, getSingleSaloon);
router.route('/customer/service/category/:id').post(CustomerAuth, filterServiceCategory);
router.route('/customer/saloon/service/:id').get(CustomerAuth, getServiceIndividualSaloon);
router.route('/customer/saloon/like/:id').get(CustomerAuth, likeUnlikeSaloon);
router.route('/customer/saloon/services/:id').post(CustomerAuth, getServicesSaloon);
router.route('/customer/services/employee/:id').get(getEmployeesByService);
router.route('/customer/booking/servicedetails/:id').get(CustomerAuth, serviceDetails)
router.route('/customer/search/saloon').post(CustomerAuth, searchSaloons);
router.route('/customer/allsaloons').get(CustomerAuth, getAllSaloons)
router.route('/customer/liked/saloon/user/:id').get(CustomerAuth, likedUserSaloon)
router.route('/employee/services/:id').get(getEmployeesByServiceId);

module.exports = router;