const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
//@desc Get all products
//@route GET /api/v1/clutterswap
//@access public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
});

//@desc Create new product
//@route Post /api/v1/clutterswap
//@access public
const createProduct = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const {
        category,
        productTitle,
        phoneNumber,
        price,
        deliveryOption,
        location,
        productBrand,
        condition,
        negotiable,
        deliveryDays,
        description,
    } = req.body;

    // Retrieve uploaded file path
    const imagePaths = req.files.map(file => file.path);

    if (!category || !productTitle || !phoneNumber || !price
        || !deliveryOption || !location || !productBrand || !condition ||
    !negotiable || !deliveryDays || !description || !imagePath) {
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    const product = await Product.create({
        category,
        productTitle,
        phoneNumber,
        price,
        deliveryOption,
        location,
        productBrand,
        condition,
        negotiable,
        deliveryDays,
        description,
        imagePath,
    })
     // Save the product to the database
     await product.save();
    res.status(201).json(product)
});

//@desc Get product
//@route GET /api/v1/clutterswap
//@access public
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product)
});

//@desc update product
//@route PUT /api/v1/clutterswap
//@access public
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updatedProduct)
});

//@desc delete product
//@route DEL /api/v1/clutterswap
//@access public
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    await Product.deleteOne();
    res.status(200).json(product)
});

//@desc Add product to cart
//@route POST /api/v1/clutterswap/cart
//@access public
const addToCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    // Retrieve product details from the database
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Store the product ID in the user's session or in a database table dedicated to carts
    // For simplicity, let's assume we're storing it in the user's session
    req.session.cart = req.session.cart || [];
    req.session.cart.push(productId);

    res.status(200).json({ success: true, message: 'Product added to cart successfully' });
});



module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    addToCart
}