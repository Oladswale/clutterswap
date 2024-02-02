const express = require("express");
const connectDb = require('./config/dbConnection');
const multer  = require('multer');
const path = require('path');
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

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


app.use('/api/v1/clutterswap', require('./routes/productRoutes'));
app.use('/api/v1/clutterswap/users', require('./routes/userRoutes'));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});