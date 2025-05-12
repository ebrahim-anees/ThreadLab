import express from 'express';
import {
  addProductReview,
  getAllProductReviews,
} from '../../controllers/shop/productReviewControllers.js';

const router = express.Router();

router.post('/add', addProductReview);
router.get('/getAll/:productId', getAllProductReviews);

export default router;
