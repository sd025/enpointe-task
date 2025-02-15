// routes/transactionRoutes.js
import { Router } from 'express';
import transactionController from '../controllers/transactionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware.verifyToken);

router.use((req, res, next) => {
  if (req.user.role !== 'customer')
    return res.status(403).json({ error: 'Forbidden: Customers only' });
  next();
});

router.get('/', transactionController.getTransactions);
router.post('/deposit', transactionController.deposit);
router.post('/withdraw', transactionController.withdraw);

export default router;
