import express from 'express';
import { checkLock, lockAction, unlockAction } from '../../controller/lockController.js';

const router = express.Router();

router.get('/is-adding', checkLock);
router.post('/lock', lockAction);
router.post('/unlock', unlockAction);

export default router;
