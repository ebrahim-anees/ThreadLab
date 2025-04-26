import User from '../../../models/User.js';

export const checkUserExists = async (req, res, next) => {
  const userName = req.body.userName.trim();
  const email = req.body.email.trim();

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        msg:
          existingUser.email === email
            ? 'Email already registered'
            : 'Username is used, try another one',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
