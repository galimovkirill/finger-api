import { Router } from 'express';
import controller from '../controllers/AccountController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/create', authMiddleware, controller.createAccount);

export default router;
