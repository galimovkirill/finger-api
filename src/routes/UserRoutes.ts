import { Router } from 'express';
import controller from '../controllers/UserController.js';

const router = Router();

router.post('/sign-up', controller.signUp);
router.post('/sign-in', controller.signIn);

/**
 * System routes
 */
router.get('/all', controller.getUsers);

export default router;
