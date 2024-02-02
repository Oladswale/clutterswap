const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please add the product name"],
    },
    productTitle: {
        type: String,
        required: [true, "Please add the product name"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    price: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    deliveryOption: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    location: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    productBrand: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    condition: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    negotiable: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    deliveryDays: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    description: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    imagePath: {
        type: String,
        required: [true, "Please upload at least 1 image"],
    }
},
    {
        timestamps: true,
    }
    
);



module.exports = mongoose.model("Product", productSchema);