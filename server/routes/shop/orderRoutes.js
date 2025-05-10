import express from 'express';
import {
  handleCaptureOrder,
  handleCreateOrder,
  getAllUserOrders,
} from '../../controllers/shop/orderControllers.js';

const router = express.Router();

router.post('/create', handleCreateOrder);
router.post('/capture', handleCaptureOrder);
router.get('/get/list/:userId', getAllUserOrders);
// router.get('/get/details/:orderId', getOrderDetails);
export default router;
