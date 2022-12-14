import { Router } from 'express';
import controller from '../controllers/BaseController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, controller.getBase);

export default router;
