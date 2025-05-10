import express from 'express';
import {
  getAllOrders,
  updateOrderStatus,
} from '../../controllers/admin/orderControllers.js';

const router = express.Router();

router.get('/getAll', getAllOrders);
router.put('/update/:orderId', updateOrderStatus);

export default router;
