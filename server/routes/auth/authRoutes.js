import express from 'express';
import {
  register,
  login,
  logout,
  checkAuth,
  checkToken,
} from '../../controllers/auth/authControllers.js';
import { registerValidator } from '../../validators/authValidators.js';
import { handleValidationErrors } from './../../middlewares/auth/register/handleValidationErrors.js';
import { checkUserExists } from './../../middlewares/auth/register/checkUserExists.js';
import { checkPasswordStrength } from './../../middlewares/auth/register/checkPasswordStrength.js';
import { checkUserPresent } from '../../middlewares/auth/login/checkUserPresent.js';
import { checkPasswordMatch } from '../../middlewares/auth/login/checkPasswordMatch.js';
import { checkTokenExists } from '../../middlewares/auth/token/checkTokenExists.js';
const router = express.Router();

router.post(
  '/register',
  registerValidator,
  handleValidationErrors,
  checkUserExists,
  checkPasswordStrength,
  register
);

router.post('/login', checkUserPresent, checkPasswordMatch, login);

router.post('/logout', logout);

router.get('/checkAuth', checkTokenExists, checkAuth);

router.get('/checkToken', checkToken);

export default router;
