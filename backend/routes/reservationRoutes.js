import express from 'express';
import {createReservation, approveReservation, rejectReservation} from '../controller/reservationController.js';

const router = express.Router();

// Route to create a reservation
router.post('/reserve', createReservation);

// Route to approve a reservation
router.patch('/approve/:id', approveReservation);

// Route to reject a reservation
router.patch('/reject/:id', rejectReservation);

export default router;
