const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },
    lastName: {
        type: String,
        required: [true, "Please add the user lastname"],
    },
    address: {
        type: String,
        required: [true, "Please add the address"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    city: {
        type: String,
        required: [true, "Please add your city"],
    },
    country: {
        type: String,
        required: [true, "Please add your country"],
    },
    zipcode: {
        type: String,
        required: [true, "Please add your zipcode"],
    },
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('User', userSchema);