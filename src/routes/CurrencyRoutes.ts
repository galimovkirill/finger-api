import { Router } from 'express';
import controller from '../controllers/CurrencyController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authMiddleware, controller.createCurrency);
router.get('/all', controller.getCurrencies);

export default router;
