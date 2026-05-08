import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/create-user', async (req, res) => {
  try {
    const { name, email, image } = req.body;

    //email already exists check
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    //create user
    const newUser = await User.create({
      name,
      email,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
