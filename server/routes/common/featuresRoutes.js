import express from 'express';
const router = express.Router();
import {
  addNewFeature,
  getAllFeatures,
  deleteFeature,
} from '../../controllers/common/featuresControllers.js';

router.post('/add', addNewFeature);
router.get('/getAll', getAllFeatures);
router.delete('/delete/:imgId', deleteFeature);

export default router;
