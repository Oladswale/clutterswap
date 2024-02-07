const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe secret key
const Product = require('../models/productModel');

// Checkout route
router.post('/checkout', async (req, res) => {
    try {
        const { cart } = req.session; // Retrieve cart items from the user's session

        if (!cart || cart.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // Retrieve product details from the database based on the product IDs in the cart
        const products = await Product.find({ _id: { $in: cart } });

        // Calculate total amount
        let totalAmount = 0;
        for (const product of products) {
            totalAmount += parseFloat(product.price);
        }
        totalAmount *= 100; // Stripe requires amount in cents

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
            description: 'Payment for products',
            confirm: true
        });

        // Clear the user's cart after successful payment
        req.session.cart = [];

        res.json({ success: true, message: 'Payment successful', paymentIntent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment failed' });
    }
});

module.exports = router;
