// routes/authRoutes.js
import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login/customer', authController.customerLogin);
router.post('/login/banker', authController.bankerLogin);

export default router;
