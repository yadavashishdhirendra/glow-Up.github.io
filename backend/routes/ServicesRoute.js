const express = require('express');
const { createServices, loggedUserServices, serviceDetails, updateService, serviceArray, PushExcelData, getNailsService, getNailsServiceName, getAllDataDuration, ownDetailsss } = require('../controllers/ServiceController');
const { isAuthenticatedUser } = require('../middleware/authToken');
const router = express.Router();

router.route('/create-service').post(isAuthenticatedUser, createServices);
router.route('/service/me').post(isAuthenticatedUser, loggedUserServices)
router.route('/service/:id').get(isAuthenticatedUser, serviceDetails)
router.route('/service/update/:id').put(isAuthenticatedUser, updateService);
router.route('/update-array/:id').put(isAuthenticatedUser, serviceArray);
router.route('/push/ids/:id').put(isAuthenticatedUser, PushExcelData);
router.route('/get/service/subcategory').post(isAuthenticatedUser, getNailsService);
router.route('/get/service/servicename').post(isAuthenticatedUser, getNailsServiceName);
router.route('/get/services/data').post(isAuthenticatedUser, getAllDataDuration);

module.exports = router;