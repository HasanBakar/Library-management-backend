import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserResponse, MUser } from '../models/user.js';
import config from '../config/config.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await MUser.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const user = new MUser({ name, email, password, role });
    await user.save();
    const { _id } = user.toObject();
    const userResponse: IUserResponse = { _id, name, email, role };

    res
      .status(201)
      .json({ message: 'User registered successfully', userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    //console.log('Login attempt:', { email, password }); // Log for debugging

    // const user = await MUser.findOne({ email });
    const user = await MUser.findOne({ email }).select('+password');
    if (!user) {
      //console.log('User not found'); // Log for debugging
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      //console.log('Password mismatch'); // Log for debugging
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    const { _id, name, email: userEmail, role } = user.toObject();
    const userResponse: IUserResponse = { _id, name, email: userEmail, role };

    res.status(200).json({ token, user: userResponse });
  } catch (error) {
    // console.error('Login error:', error); // Log for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};
