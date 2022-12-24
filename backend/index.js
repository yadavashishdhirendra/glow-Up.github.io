const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const XLSX = require('xlsx');
const cors = require('cors');
const dotenv = require("dotenv")

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/.env"
    })
}


const http = require("http").createServer(app);

// MONGODB CLOUD CONNECTION
mongoose.connect(process.env.DATABASE).then((data) => {
    console.log(`MONGODB CONNECTED WITH SERVER: ${data.connection.host}`)
}).catch(err => {
    console.log(err);
})

// MIDDLEWARES
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: "200mb", extended: true }))
app.use(fileUpload());
app.use(cors())
app.use(bodyParser.urlencoded({
    limit: '200mb',
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan('dev'))

// IMPORTING ROUTES
const user = require('./routes/UserRoute');
const saloon = require('./routes/SaloonRoute')
const employee = require('./routes/EmployeeRoute');
const service = require('./routes/ServicesRoute');
const booking = require('./routes/BookingRoute');
const customerUser = require('./routes/CustomerUserRoutes')
const customerServices = require('./routes/CustomerServiceRoutes');
const customerPayment = require('./routes/CustomerPaymentRoutes')
const ServicesSchema = require('./models/ServicesSchema');
const { isAuthenticatedUser } = require('./middleware/authToken');
const DummyModel = require('./models/DummyModel');
const userWebRoute = require('./routes/UserWebRoute');
const path = require('path');

// USING ROUTES
app.use('/api/v1', user)
app.use('/api/v1', saloon)
app.use('/api/v1', employee)
app.use('/api/v1', service)
app.use('/api/v1', booking)
app.use('/api/v1', customerUser)
app.use('/api/v1', customerServices)
app.use('/api/v1', customerPayment)

app.use('/api/v2', userWebRoute)

// SERVER LISTENING
http.listen(PORT, (req, res) => {
    console.log(`Glow Up App is Listening at Port- ${PORT}`)
})

// CLOUDINARY CONFIGURATION
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// GET REQUEST ON SERVER TESTING
app.get('/', (req, res) => {
    res.send("Hello world API'S working fine!")
})


// MULTER SETTINGS
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
})

/* API FOR POSTING THE SERVICE */
app.post('/upload', isAuthenticatedUser, upload.single('file'), async (req, res) => {
    try {
        let path = req.file.path;
        var workbook = XLSX.readFile(path);
        var sheet_name_list = workbook.SheetNames;
        let jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
        );
        if (jsonData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "xml sheet has no data",
            });
        }
        let savedData = await ServicesSchema.create(jsonData);
        return res.status(201).json({
            success: true,
            message: savedData,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});


/* API FOR UPDATING THE EMPLOYEES */
app.post('/employee/post', isAuthenticatedUser, upload.single('file'), async (req, res) => {
    try {
        let path = req.file.path;
        var workbook = XLSX.readFile(path);
        var sheet_name_list = workbook.SheetNames;
        let jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
        );
        if (jsonData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "xml sheet has no data",
            });
        }

        // console.log(jsonData)

        let ids = [];
        let action = {
            ids
        }
        jsonData.forEach((i) => {
            if (ids.includes(i)) {
                return null;
            }
            else {
                ids.push(i.myemployees)
            }
        })

        console.log(ids)

        let updateServices = await DummyModel.create(action)
        res.status(200).json({
            success: true,
            updateServices
        })
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});


// app.get('/sheet', function (req, res) {
//     res.sendFile(__dirname + "/index.html");
// });

app.use(express.static(path.join(__dirname, "../glowup/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../glowup/build/index.html"))
})