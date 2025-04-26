import express from 'express';

import {
  handleImgUpload,
  addNewProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} from './../../controllers/admin/productsControllers.js';
import { upload } from './../../configs/claudinary.js';
import { checkProductForm } from '../../middlewares/admin/product/checkProductForm.js';

const router = express.Router();

router.post('/uploadImg', upload.single('imgFile'), handleImgUpload);
router.post('/add', checkProductForm, addNewProduct);
router.get('/getAll', fetchAllProducts);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
