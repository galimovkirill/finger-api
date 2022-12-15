import { Router } from 'express';
import controller from '../controllers/AccountController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authMiddleware, controller.createAccount);
router.get('/all', authMiddleware, controller.getAccounts);

export default router;
