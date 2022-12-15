import express from 'express';

import userRoutes from './UserRoutes.js';
import baseRoutes from './BaseRoutes.js';
import accountRoutes from './AccountRoutes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/base', baseRoutes);
router.use('/account', accountRoutes);

export default router;
