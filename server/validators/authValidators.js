import { body } from 'express-validator';

export const registerValidator = [
  body('userName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username is required'),

  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address'),

  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];
