const Saloon = require("../models/SaloonSchema");
const User = require("../models/UserModel");
const cloudinary = require('cloudinary');
const CustomerUserModel = require('../models/CustomeUserModel');
const SaloonSchema = require("../models/SaloonSchema");

// ROUTE 1 => REGISTER A USER
exports.createSaloon = async (req, res) => {
    try {
        const { businesshours, from, to, day, shopname, ownername, businessemailid, companytype, address, addresssec, city, state, pincode, map } = req.body;
        const saloon = await Saloon.create({
            businesshours, from, to, day, shopname, ownername, businessemailid, companytype, address, addresssec, city, state, pincode, map,
            owner: req.user.id
        })

        const user = await User.findById(req.user.id)
        user.saloon.push(saloon._id)
        await user.save()
        await saloon.save()

        res.status(200).json({
            success: true,
            message: "Added Success",
            saloon,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 6 => UPDATE SALOON BANNER PICTURE
// exports.updateSaloonProfile = async (req, res) => {
//     try {
//         const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
//             quality: 'auto'
//         })

//         const avatarDatas = {
//             avatar: {
//                 public_id: myCloud.public_id,
//                 url: myCloud.secure_url
//             }
//         }

//         const userId = await Saloon.find({
//             owner: req.user.id
//         });
//         // DELETING PREVIOUS IMAGE FROM CLOUDINARY
//         const imageId = await userId.avatar.public_id;
//         await cloudinary.uploader.destroy(imageId)
//         const updateData = await Saloon.findByIdAndUpdate(userId, avatarDatas)
//         res.status(200).json({
//             success: true,
//             updateData
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }

exports.SpecificSaloon = async (req, res) => {
    try {
        const saloons = await Saloon.findById(req.params.id).populate({
            path: "owner",
            populate: {
                path: "services",
                model: "Services"
            },
        }).populate({
            path: "owner",
            populate: {
                path: "employees",
                model: "Employee"
            }
        })
        console.log(saloons)
        res.status(200).json({
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

// ROUTE 2 => LIKE UNLIKE SALOON
exports.likeUnlikeSaloon = async (req, res) => {
    try {
        const owner = await CustomerUserModel.findById(req.user.id);
        const saloon = await Saloon.findById(req.params.id);
        if (!saloon) {
            return res.status(400).json({
                success: false,
                message: "Saloon Not Found"
            })
        }

        // CHECKING IF LOGGED USER INCLUDES IN THE LIKES ARRAY
        if (saloon.likes.includes(req.user.id) || owner.likes.includes(saloon._id)) {
            // FINDING INDEX OF LOGGED IN USER 
            const index = saloon.likes.indexOf(req.user.id);
            const ownerIndex = owner.likes.indexOf(req.user.id);
            // HERE DELETING THE USER ID FROM LIKES ARRAY
            saloon.likes.splice(index, 1);
            owner.likes.splice(ownerIndex, 1)
            await saloon.save()
            await owner.save()
            return res.status(200).json({
                success: true,
                message: "Unliked"
            })
        }
        else {
            // LIKE QUERY
            saloon.likes.push(req.user.id);
            owner.likes.push(saloon._id);
            await saloon.save();
            await owner.save();
            return res.status(200).json({
                success: true,
                message: "Liked"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 3 => BANNER UPLOAD
exports.uploadBannerImages = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let saloonId = user.saloon;
        let saloon = await Saloon.findById(saloonId);
        console.log(saloon)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        let image = []
        if (typeof req.body.images === 'string') {
            image.push(req.body.images)
        } else {
            image = req.body.images
        }

        if (image !== undefined) {
            // DELETING IMAGES FROM CLOUDINARY
            for (let i = 0; i < saloon.images.length; i++) {
                await cloudinary.v2.uploader.destroy(saloon.images[i].public_id)
            }
        }


        const imagesLinks = [];
        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.uploader.upload(image[i], {
                width: 500,
                height: 500,
                crop: 'fill',
                quality: 'auto',
                folder: 'Glowup',
            })
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
            req.body.images = imagesLinks;
        }

        saloon = await Saloon.findByIdAndUpdate(saloon, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        console.log(saloon)

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

// ADD SALOON DESCRIPTION 
exports.addSaloonDescription = async (req, res) => {
    try {
        let user = await User.findById(req.user.id)
        let saloonId = user.saloon;
        let saloon = await Saloon.findById(saloonId);

        const newSaloon = {
            description: req.body.description
        }

        if (!req.body.description) {
            return res.status(400).json({
                success: false,
                message: "Please Add Description"
            })
        }

        saloon = await Saloon.findByIdAndUpdate(saloon, newSaloon, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            message: "Description Added Success!",
            saloon
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTER 4 => GET SALOON OF LOGGED IN USER
exports.getSaloon = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let saloonId = user.saloon;
        let saloon = await Saloon.findById(saloonId);

        if (!saloon) {
            return res.status(400).json({
                success: false,
                message: "No Saloon Found"
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

exports.reviewProducts = async (req, res) => {
    try {
        const { rating, comment, id } = req.body;

        const review = { user: req.user._id, rating: Number(rating), comment, };

        const saloon = await SaloonSchema.findById(id);

        const isReviewed = saloon.reviews.find(
            (rev) => rev.user.toString() === req.user._id.toString()
        );

        if (isReviewed) {
            saloon.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString())
                    (rev.rating = rating), (rev.comment = comment);
            });
        } else {
            saloon.reviews.push(review);
            saloon.numOfReviews = saloon.reviews.length;
        }

        let avg = 0;

        saloon.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        saloon.ratings = avg / saloon.reviews.length;

        await saloon.save({
            validateBeforeSave: false
        });

        res.status(200).json({
            success: true,
            review,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getReviews = async (req, res) => {
    try {
        const saloon = await SaloonSchema.findById(req.params.id).populate({
            path: "reviews",
            populate: {
                path: "user",
                model: "CustomerUser"
            },
        });

        let reviews = [];

        saloon && saloon.reviews.forEach((i) => {
            if (reviews.includes(i)) {
                return null;
            }
            else {
                reviews.push(i)
            }
        })

        return res.status(200).json({
            success: true,
            reviews
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.updateMobileNumber = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        const { mobileno } = req.body;

        if (!mobileno) {
            return res.status(200).json({
                success: false,
                message: "Please Fill the required field"
            })
        }


        const update = await User.findOneAndUpdate({ "_id": user }, { $set: { mobileno: mobileno } }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Number Updated Successfully!",
            update
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}