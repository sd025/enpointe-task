// routes/accountRoutes.js
import { Router } from 'express';
import accountController from '../controllers/accountController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authMiddleware.verifyToken);

// Restrict access to bankers
router.use((req, res, next) => {
  if (req.user.role !== 'banker')
    return res.status(403).json({ error: 'Forbidden: Bankers only' });
  next();
});

router.get('/', accountController.getAllAccounts);
router.get('/:userId/transactions', accountController.getUserTransactions);

export default router;
