import express from 'express';
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from '../../controllers/shop/addressControllers.js';
const router = express.Router();

router.post('/add', addAddress);
router.get('/getAll/:userId', fetchAllAddress);
router.put('/edit/:userId/:addressId', editAddress);
router.delete('/delete/:userId/:addressId', deleteAddress);

export default router;
