import express from 'express';
import { checkLock, lockAction, unlockAction } from '../../controller/lockController.js';

const router = express.Router();

// Route to check the lock status
router.get('/is-adding', checkLock);

// Route to lock the action (before adding employee)
router.post('/lock', lockAction);

// Route to unlock the action (after adding employee)
router.post('/unlock', unlockAction);

export default router;
