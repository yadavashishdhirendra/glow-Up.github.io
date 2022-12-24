const User = require("../models/UserModel");
const cloudinary = require('cloudinary')

// ROUTE 1 => REGISTER A USER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        user = await User.create({
            name, email, password, avatar: {
                public_id: "Initial_img",
                url: "https://yadavashishdhirendra.github.io/MLG-Newsletter-1.github.io/profile-boy.png"
            }
        })

        // GENERATING TOKEN HERE
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Register Success",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 2 => LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't exist"
            })
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email id or password"
            })
        }
        // GENERATING TOKEN HERE
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Login Success",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

// ROUTE 3 => GET USER OWN DETAILS
exports.ownDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



// ROUTE 5 => LOGOUT USER
exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 6 => UPDATE USER PROFILE PICTURE
exports.updateUserProfile = async (req, res) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            quality: 'auto',
            folder: 'Glowup',
        })

        const avatarDatas = {
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }

        const userId = await User.findById(req.user.id);
        // DELETING PREVIOUS IMAGE FROM CLOUDINARY
        const imageId = await userId.avatar.public_id;
        await cloudinary.uploader.destroy(imageId)
        const updateData = await User.findByIdAndUpdate(userId, avatarDatas)
        res.status(200).json({
            success: true,
            updateData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 7 => UPDATE USER PASSWORD
exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("+password");
        const { oldpassword, newpassword } = req.body;
        if (!oldpassword || !newpassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide old & new password"
            })
        }

        const isPasswordMatched = await user.matchPassword(oldpassword);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Old Password is Incorrect"
            })
        }

        user.password = newpassword;
        await user.save()
        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getSaloonName = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("saloon");

        let saloon = []
        user && user.saloon.forEach((i) => {
            if (saloon.includes(i)){
                return null
            }
            else{
                saloon.push(i)
            }
        })

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