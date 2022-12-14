import express from 'express';

import userRoutes from './UserRoutes.js';
import baseRoutes from './BaseRoutes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/base', baseRoutes);

export default router;
