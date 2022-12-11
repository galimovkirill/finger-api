import { Router } from 'express';
import controller from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/sign-up', controller.signUp);
router.post('/sign-in', controller.signIn);
router.get('/data', authMiddleware, controller.getUserData);

/**
 * System routes
 */
router.get('/all', controller.getUsers);

export default router;
