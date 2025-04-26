import zxcvbn from 'zxcvbn';

export const checkPasswordStrength = (req, res, next) => {
  const password = req.body.password.trim();
  const { score, feedback } = zxcvbn(password);

  try {
    if (score < 3) {
      return res.status(400).json({
        success: false,
        msg:
          feedback.suggestions.join(' ') ||
          'Password is too weak. Try something stronger.',
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
