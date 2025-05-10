import express from 'express';

import { checkInputs } from './../../middlewares/shop/cart/checkInputs.js';
import { checkCart } from './../../middlewares/shop/cart/checkCart.js';
import {
  addToCart,
  fetchCartItems,
  editCartItem,
  deleteCartItem,
} from './../../controllers/shop/cartControllers.js';
const router = express.Router();

router.post('/add', checkInputs, addToCart);
router.get('/getAll/:userId', checkCart, fetchCartItems);
router.put('/edit', checkInputs, checkCart, editCartItem);
router.delete('/delete/:userId/:productId', checkCart, deleteCartItem);

export default router;
