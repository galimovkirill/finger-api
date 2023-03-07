import { Router } from 'express';
import controller from '../controllers/RecordController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.get('/:accountId', authMiddleware, controller.getRecordsByAccountId);
router.post('/create', authMiddleware, controller.createRecord);
router.delete('/delete', authMiddleware, controller.deleteRecord);

export default router;
