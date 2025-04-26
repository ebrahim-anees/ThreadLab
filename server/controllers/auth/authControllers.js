import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../../models/User.js';

const register = async (req, res) => {
  try {
    const userName = req.body.userName.trim();
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      msg: 'Successful register',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};

const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m',
      }
    );
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        msg: 'Successful login',
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
          userName: user.userName,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token').json({
      success: true,
      msg: 'Successful logout',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

const checkAuth = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    msg: 'User is Authenticated',
    user,
  });
};

const checkToken = async (req, res) => {
  const token = req.cookies.token; // Extracted by cookie-parser
  if (!token) {
    return res.status().json({
      success: false,
      msg: 'No token found',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status().json({ success: false, msg: 'No token found' });
    }
    res.json({ success: true, user: decoded });
  });
};

export { register, login, logout, checkAuth, checkToken };
