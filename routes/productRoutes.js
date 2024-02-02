const express = require("express");
const router = express.Router();
const {getProducts, createProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/productController')

router.route('/').get(getProducts);

router.route('/').post(createProduct);

router.route('/:id').get(getProduct);

router.route('/:id').put(updateProduct);

router.route('/:id').delete(deleteProduct);


module.exports = router;