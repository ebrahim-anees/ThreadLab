import express from 'express';
import { searchProducts } from '../../controllers/shop/searchControllers.js';

const router = express.Router();

router.get('/:searchTerm', searchProducts);

export default router;
