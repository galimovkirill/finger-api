import { Router } from 'express';
import controller from '../controllers/UserController.js';

const router = Router();

router.post('/create', controller.createUser);
router.get('/all', controller.getUsers);

export default router;
