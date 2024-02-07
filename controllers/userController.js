const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');

//@desc Register a user
//@route POST /api/v1/clutterswap/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    // const { username, email, password } = req.body;

    const {
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
      city,
      country,
      zipcode
  } = req.body;

  console.log(body);
      
    if (!email || firstName || lastName || address || phoneNumber || city || country || zipcode) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
        
    }
    // //Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hasshed Password: ", hashedPassword);
    const user = await User.create({
        email, firstName, lastName, address, phoneNumber, city, 
        country,zipcode,
    });

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
});


//@desc Login a user
//@route POST /api/v1/clutterswap/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    //compare password with hashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
});

//@desc Current user info
//@route GET api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


const forgotPassword = asyncHandler( async (req, res) => {
    const { email } = req.body;
  
    try {
      // Find the user with the provided email in MongoDB
      const usersCollection = db.collection('users').findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate a unique token
      const token = crypto.randomBytes(20).toString('hex');
  
      // Store the token with the user ID in MongoDB
      await db.collection('resetTokens').insertOne({ userId: user._id, token });
  
      // Send reset email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your.email@gmail.com',
          pass: 'your-email-password',
        },
      });
  
      const mailOptions = {
        from: 'your.email@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:${PORT}/reset-password/${token}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Reset email sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to send reset email' });
    }
  });

  const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Find the user ID associated with the token
      const resetPassword = await db.collection('resetTokens').findOne({ token });
  
      if (!resetToken) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }
  
      // Reset password logic (in MongoDB)
      await db.collection(collectionName).updateOne(
        { _id: resetToken.userId },
        { $set: { password: newPassword } }
      );
  
      // Clear the used token
      await db.collection('resetTokens').deleteOne({ token });
  
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to reset password' });
    }
  });

module.exports = { registerUser, loginUser, currentUser, forgotPassword, resetPassword };