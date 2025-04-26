import User from '../../../models/User.js';

export const checkUserPresent = async (req, res, next) => {
  const email = req.body.email.trim();
  try {
    const userPresent = await User.findOne({ email });
    if (email.length === 0) {
      return res.json({
        success: false,
        msg: 'Email is required',
      });
    }

    if (!userPresent) {
      return res.json({
        success: false,
        msg: "User doesn't exist",
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
