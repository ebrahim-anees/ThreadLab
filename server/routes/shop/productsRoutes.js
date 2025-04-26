import express from 'express';

import {
  fetchAllProductsWithFilteration,
  getProductDetails,
} from '../../controllers/shop/productsControllers.js';
import { parseFilterProducts } from '../../middlewares/shop/product/parseFilterProducts.js';
import { parseSortProducts } from '../../middlewares/shop/product/parseSortProducts.js';

const router = express.Router();

router.get(
  '/getAllWithFilteration',
  parseFilterProducts,
  parseSortProducts,
  fetchAllProductsWithFilteration
);
router.get('/get/:id', getProductDetails);

export default router;
