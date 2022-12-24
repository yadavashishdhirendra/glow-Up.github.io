const Razorpay = require('razorpay');
const crypto = require('crypto');

// RAZORPAY CONFIGURATION
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };

        const order = await instance.orders.create(options)
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.paymentVerification = async (req, res) => {
    try {
        console.log(req.body)

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            //DATABSE COMES HERE
            return res.status(200).json({
                success: true,
                message: razorpay_payment_id
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something went wrong! Please Try again Later.",
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.apiKey = async (req, res) => {
    try {
        res.status(200).json({
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// REFUND PAYMENT RAZORPAY 
exports.refundPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;
        instance.payments.refund(paymentId, {
            "amount": Number(req.body.price * 100)
        }).then((data) => res.status(200).json({
            success: true,
            data: data
        })).catch((err) => res.send(err))

        // return res.status(200).json({
        //     success: true,
        //     message: "Refund Successfully!",
        //     refund
        // })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}