const Employee = require("../models/EmployeeSchema");
const User = require("../models/UserModel");
const cloudinary = require('cloudinary')

// ROUTE 1 => CREATE NEW EMPLOYEE
exports.createEmployee = async (req, res) => {
    try {
        const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            width: 500,
            height: 500,
            crop: 'fill',
            quality: 'auto',
            folder: 'Glowup',
        })

        const { firstname, lastname, intime, outtime,result } = req.body;
        if (!firstname || !lastname || !intime || !outtime) {
            return res.status(400).json({
                success: false,
                message: "Please Fill all the required fields"
            })
        }
        const employee = await Employee.create({
            firstname, lastname, intime, outtime, result,
            owner: req.user.id, avatar: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }
        })
        const user = await User.findById(req.user.id)
        user.employees.push(employee._id)
        await user.save();
        await employee.save()
        res.status(200).json({
            success: true,
            message: "Added Success",
            employee,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 2 => GET LOGGED IN USER EMPLOYEES
exports.loggedInUserEmployee = async (req, res) => {
    try {
        const employee = await Employee.find({
            owner: req.user.id
        }).sort({ createdAt: -1 })

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

// ROUTE 3 => UPDATE SINGLE Employee DETAILS
exports.updateSingleEmployee = async (req, res) => {
    try {
        const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            width: 500,
            height: 500,
            crop: 'fill',
            quality: 'auto',
            folder: 'Glowup',
        })

        const employee = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            intime: req.body.intime,
            outtime: req.body.outtime,
            avatar: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }
        }
        const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, employee)
        res.status(200).json({
            success: true,
            updateEmployee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ROUTE 4 => GET SINGLE EMPLOYEES DETAILS
exports.singleEmployees = async (req, res) => {
    try {
        const getEmployees = await Employee.findById(req.params.id);
        if (!getEmployees) {
            return res.status(500).json({
                success: false,
                message: "Employee Not Found"
            })
        }

        res.status(200).json({
            success: true,
            getEmployees
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// ROUTE 5 => DELETE SINGLE EMPLOYEE
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        const userId = await User.findById(req.user.id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Doesn't exists"
            })
        }
        // REMOVING EMPLOYEE FROM USER MODEL ARRAY
        if (userId.employees.includes(employee._id)) {
            const removeEmp = userId.employees.indexOf(employee._id)
            userId.employees.splice(removeEmp, 1)
            await userId.save()
        }
        await employee.remove()
        res.status(200).json({
            success: true,
            message: "Employee Deleted Success",
            employee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

