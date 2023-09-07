
const express = require('express');
const authRouter = express.Router();

// const User = require('../models').User;
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

     // Check if the user already exists by email
     const existingUser = await User.findOne({ where: { email } });

     if (existingUser) {
       return res.status(400).json({ error: 'User with this email already exists' });
     }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await User.create({
      user_name,
      email,
      hash_password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login a user and generate a JWT token
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.hash_password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Token expires in 7 day
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser };


authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = {authRouter};