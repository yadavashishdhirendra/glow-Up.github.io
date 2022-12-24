const express = require('express');
const { createEmployee, loggedInUserEmployee, updateSingleEmployee, singleEmployees, deleteEmployee, updateSlot } = require('../controllers/EmployeeController');
const { isAuthenticatedUser } = require('../middleware/authToken');
const router = express.Router();

router.route('/createemployee',).post(isAuthenticatedUser, createEmployee);
router.route('/employee/me').get(isAuthenticatedUser, loggedInUserEmployee)
router.route('/employee/update/:id').put(isAuthenticatedUser, updateSingleEmployee)
router.route('/employee/:id').get(isAuthenticatedUser, singleEmployees)
router.route('/employeedelete/:id').delete(isAuthenticatedUser, deleteEmployee)


module.exports = router;