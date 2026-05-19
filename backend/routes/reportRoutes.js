import express from 'express';
const router = express.Router();
import {
  createReport,
  getReports,
  resolveReport,
  deleteReport,
} from '../controllers/reportController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createReport).get(protect, admin, getReports);
router.route('/:id').delete(protect, admin, deleteReport);
router.route('/:id/resolve').put(protect, admin, resolveReport);

export default router;
