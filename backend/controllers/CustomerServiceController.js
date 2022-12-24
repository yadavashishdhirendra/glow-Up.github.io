const ServicesSchema = require("../models/ServicesSchema");
const SaloonSchema = require("../models/SaloonSchema");

// ROUTE 1 => GET SERVICE BY SUB CATEGORY NAME
exports.getService = async (req, res) => {
    try {
        let service;
        if (!req.body.servicetype) {
            return res.status(400).json({
                success: false,
                message: "No Data Found With This Category"
            })
        } else {
            service = await ServicesSchema.find({
                "servicetype": req.body.servicetype
            }).populate({
                path: "owner",
                populate: {
                    path: "saloon",
                    model: "Saloon"
                },
            })
        }

        let arr = []

        service.forEach((i) => {
            i.owner.saloon.forEach((x) => {
                if (arr.includes(x)) {
                    return null
                }
                else {
                    arr.push(x)
                }
            })
        })

        // console.log(arr)

        res.status(200).json({
            success: true,
            // service,
            arr
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 2 => GET SINGLE SALOON
exports.getSingleSaloon = async (req, res) => {
    try {
        const saloon = await SaloonSchema.findById(req.params.id).populate({
            path: "owner",
            populate: {
                path: "employees",
                model: "Employee"
            },
        });
        if (!saloon) {
            return res.status(400).json({
                success: false,
                message: "Saloon Not Found"
            })
        }
        res.status(200).json({
            success: true,
            saloon
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 3 => GET SERVICES BY SERVICETYPE(MEN, WOMEN, ETC)
exports.filterServiceCategory = async (req, res) => {
    try {
        const saloon = await SaloonSchema.findById(req.params.id).populate({
            path: "owner",
            populate: {
                path: "services",
                model: "Services"
            },
        })

        let arr = [];

        saloon.owner.services.forEach((i) => {
            if (arr.includes(i)) {
                return null
            }
            else {
                arr.push(i)
            }
        })

        const filter = arr.filter(item => (item.servicetype === req.body.servicetype))

        let length = filter.length;

        if (length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Data Found"
            })
        }

        res.status(200).json({
            success: true,
            filter
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 4 => GET ALL SERVICES BY SALOON ID
exports.getServiceIndividualSaloon = async (req, res) => {
    try {
        const saloon = await SaloonSchema.findById(req.params.id).populate({
            path: "owner",
            populate: {
                path: "services",
                model: "Services"
            },
        })

        let service = [];

        saloon.owner.services.forEach((x) => {
            if (service.includes(x)) {
                return null
            }
            else {
                service.push(x)
            }
        })

        res.status(200).json({
            success: true,
            service
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 5 => GET SERVICES BY SERVICETYPE AND CATEGORY(MEN, WOMEN, ETC)
exports.getServicesSaloon = async (req, res) => {
    try {
        const saloon = await SaloonSchema.findById(req.params.id).populate({
            path: "owner",
            populate: {
                path: "services",
                model: "Services"
            },
        })

        let arr = [];

        saloon.owner.services.forEach((i) => {
            if (arr.includes(i)) {
                return null
            }
            else {
                arr.push(i)
            }
        })

        const { servicetype, category } = req.body;
        if (!servicetype || !category) {
            return res.status(400).json({
                success: false,
                message: "Please Fill all the required fields"
            })
        }

        const filterServices = arr.filter(item => (item.servicetype == servicetype && item.category == category))

        let length = filterServices.length;
        console.log(length)

        if (length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Data Found"
            })
        }

        res.status(200).json({
            success: true,
            filterServices
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 6 => GET EMPLOYEES BY SERVICE ID
exports.getEmployeesByService = async (req, res) => {
    try {
        const employees = await ServicesSchema.findById(req.params.id).populate("myemployees");
        if (!employees) {
            return res.status(400).json({
                success: false,
                message: "No Employees Found"
            })
        }

        res.status(200).json({
            success: true,
            employees
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 7 => SEARCH SALOONS BY CATEGORY
exports.searchSaloons = async (req, res) => {
    try {
        let servicetype = req.body.servicetype;
        let servicename = req.body.servicename
        let searchData = await ServicesSchema.find({
            "$or": [
                { "servicetype": { $regex: ".*" + servicetype + ".*", $options: 'i' } },
                { "servicename": { $regex: ".*" + servicename + ".*", $options: 'i' } }
            ]
        }).populate({
            path: "owner",
            populate: {
                path: "saloon",
                model: "Saloon"
            },
        })

        let DataLength = searchData.length;
        if (DataLength <= 0) {
            return res.status(400).json({
                success: false,
                message: "No Data Found!"
            })
        }

        let saloons = [];
        searchData.forEach((x) => {
            x.owner.saloon.forEach((i) => {
                if (saloons.includes(i)) {
                    return null
                }
                else {
                    saloons.push(i)
                }
            })
        })

        if (saloons.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "No Data Found!"
            })
        }

        return res.status(200).json({
            success: true,
            saloons
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// ROUTE 8 => GET ALL SALOONS
exports.getAllSaloons = async (req, res) => {
    try {
        const saloons = await SaloonSchema.find({});
        if (!saloons) {
            return res.status(400).json({
                success: false,
                message: "Something Went Wrong!"
            })
        }

        return res.status(200).json({
            success: true,
            saloons
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 9 => GET LIKED USER FOR PARTICULAR SALOON 
exports.likedUserSaloon = async (req, res) => {
    try {
        const saloon = await SaloonSchema.findById(req.params.id).populate({
            path: "likes",
            populate: {
                path: "likes",
                model: "CustomerUser"
            },
        })

        if (!saloon) {
            return res.status(400).json({
                success: false,
                message: 'No Saloons Found'
            })
        }

        return res.status(200).json({
            success: true,
            saloon
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// ROUTE 6 => GET EMPLOYEES BY SERVICE ID (PARTNERS APP)
exports.getEmployeesByServiceId = async (req, res) => {
    try {
        const employees = await ServicesSchema.findById(req.params.id).populate("myemployees");
        if (!employees) {
            return res.status(400).json({
                success: false,
                message: "No Employees Found"
            })
        }

        let emp = []

        employees && employees.myemployees.forEach((x) => {
            if (emp.includes(x._id)) {
                return null
            }
            else {
                emp.push(x)
            }
        })

        res.status(200).json({
            success: true,
            employees,
            emp
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 8 => GET ALL SALOONS
exports.getSortedSaloon = async (req, res) => {
    try {
        const saloons = await SaloonSchema.find({}).limit(4);
        if (!saloons) {
            return res.status(400).json({
                success: false,
                message: "Something Went Wrong!"
            })
        }

        let sorted = saloons.sort(function (a, b) {
            return a.shopname.localeCompare(b.shopname)
        })

        return res.status(200).json({
            success: true,
            sorted
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}