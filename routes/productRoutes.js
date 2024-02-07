const express = require("express");
const router = express.Router();
const {getProducts, createProduct, getProduct, updateProduct, deleteProduct, addToCart} = require('../controllers/productController')

// Get products
router.route('/').get(getProducts);

// Create product
router.route('/').post(createProduct);

// Get a single Product
router.route('/:id').get(getProduct);

// Update product
router.route('/:id').put(updateProduct);

// Delete a single product
router.route('/:id').delete(deleteProduct);

// Add product to cart route
router.post('/cart', addToCart);


module.exports = router;