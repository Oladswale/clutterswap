const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User",
    // },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please create a password"],
    },
    firstName: {
        type: String,
        required: [true, "Please add the user name"],
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