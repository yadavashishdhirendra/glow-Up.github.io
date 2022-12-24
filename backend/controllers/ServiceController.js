const DummyModel = require("../models/DummyModel");
const Services = require("../models/ServicesSchema");
const User = require("../models/UserModel");


// ROUTE 1 => CREATE NEW SERVICES
exports.createServices = async (req, res) => {
    try {
        const { servicetype, category, servicename, hour, price, about, myemployees } = req.body;
        if (!servicetype || !category || !servicename || !price || !myemployees) {
            return res.status(400).json({
                success: false,
                message: "Please Fill all the required fields"
            })
        }

        // let service = await Services.findOne({ servicename: servicename, owner: req.user.id })
        // if (service) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Service Name Already Exists"
        //     })
        // }

        const services = await Services.create({
            servicetype, category, servicename, hour, price, about, myemployees,
            owner: req.user.id
        })

        const user = await User.findById(req.user.id)
        user.services.push(services._id)
        await user.save()
        await services.save()
        res.status(200).json({
            success: true,
            message: "Service Added Success",
            services
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 2 => GET LOGGED IN SERVICES WITH FILTERATION
exports.loggedUserServices = async (req, res) => {
    try {
        let services;
        if (!req.body.servicetype) {
            services = await Services.find({
                owner: req.user.id
            }).sort({ createdAt: -1 })
        }
        else {
            services = await Services.find({
                owner: req.user.id,
                "servicetype": req.body.servicetype
            }).sort({ createdAt: -1 })
        }

        res.status(200).json({
            success: true,
            services
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// ROUTE 3 => GET SINGLE SERVICE DETAILS
exports.serviceDetails = async (req, res) => {
    try {
        const getService = await Services.findById(req.params.id);
        if (!getService) {
            return res.status(500).json({
                success: false,
                message: "Service Not Found"
            })
        }

        res.status(200).json({
            success: true,
            getService
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 4 => UPDATE SINGLE SERVICE DETAILS
exports.updateService = async (req, res) => {
    try {
        const service = {
            servicetype: req.body.servicetype,
            category: req.body.category,
            servicename: req.body.servicename,
            hour: req.body.hour,
            price: req.body.price,
            about: req.body.about,
            myemployees: req.body.myemployees
        }

        const updateService = await Services.findByIdAndUpdate(req.params.id, service);
        res.status(200).json({
            success: true,
            updateService
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// ROUTE 5 => DASHBOARD IMPLEMENTAION API (PUSH ID IN A PARTICULAR USER)
exports.serviceArray = async (req, res) => {
    try {
        let service = await Services.find({ owner: req.user.id });
        console.log(service)
        let services = [];
        let action = {
            services
        }
        service.forEach((ix) => {
            services.push(ix._id)
        })
        console.log(services)
        const updateServices = await User.findByIdAndUpdate(req.params.id, action, {
            new: true,
            upsert: true
        })
        res.status(200).json({
            success: true,
            updateServices,
            services: service.length
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: error.message
        });
    }
}

exports.PushExcelData = async (req, res) => {
    try {
        let service = await DummyModel.findById(req.body.id);
        if (!service) {
            return res.status(400).json({
                success: false,
                message: "ID is Required"
            })
        }
        let myemployees = [];
        let jackson = {
            myemployees
        }
        service.ids.forEach((ix) => {
            myemployees.push(ix._id)
        })
        console.log("x", myemployees)
        const push = await Services.findByIdAndUpdate(req.params.id, jackson, {
            new: true,
        })
        res.status(200).json({
            success: true,
            push
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: error.message
        });
    }
}

// ROUTE 10 => NAILS API GET SERVICE
exports.getNailsService = async (req, res) => {
    try {
        const servicesubcategory = await Services.find({
            "servicetype": req.body.servicetype,
            "category": req.body.category,
            owner: req.user.id
        })

        if (!servicesubcategory) {
            return res.status(400).json({
                success: false,
                message: "Service Not Found"
            })
        }

        res.status(200).json({
            success: true,
            servicesubcategory
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// ROUTE 11 => NAILS API GET SERVICE
exports.getNailsServiceName = async (req, res) => {
    try {
        const servicename = await Services.find({
            "servicetype": req.body.servicetype,
            "category": req.body.category,
            "subcategory": req.body.subcategory,
            owner: req.user.id
        })

        if (!servicename) {
            return res.status(400).json({
                success: false,
                message: "Service Not Found"
            })
        }

        res.status(200).json({
            success: true,
            servicename
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// ROUTE 12 => NAILS SERVICE DURATION API GET SERVICE
exports.getAllDataDuration = async (req, res) => {
    try {
        const serviceData = await Services.findOne({
            "servicetype": req.body.servicetype,
            "category": req.body.category,
            "subcategory": req.body.subcategory,
            "servicename": req.body.servicename,
            owner: req.user.id
        })

        if (!serviceData) {
            return res.status(400).json({
                success: false,
                message: "Service Not Found"
            })
        }

        res.status(200).json({
            success: true,
            serviceData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
