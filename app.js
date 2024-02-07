const express = require("express");
const connectDb = require('./config/dbConnection');
const bodyParser = require('body-parser');
const multer  = require('multer');
const path = require('path');
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware
app.use(errorHandler);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


// Handling user-related routes along with file uploads
app.use(
    '/api/v1/clutterswap/users',
    multer({ storage: storage }).single('imageFile'),
    require('./routes/userRoutes')
);

// Handling product-related routes
app.use('/api/v1/clutterswap', require('./routes/productRoutes'));

// Handling checkout route
app.use('/api/v1/clutterswap', require('./routes/checkoutRoutes.js'));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});