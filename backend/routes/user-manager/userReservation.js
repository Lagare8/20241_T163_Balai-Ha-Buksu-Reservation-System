import express from "express";
const router = express.Router();
import { postUserReservation, getUserBookingHistory, cancelReservation, checkAvailability} from "../../controller/userController.js";
// Simulated database using an array
let reservations = [];

// 1. Reserve a room
router.post('/reserve', postUserReservation 
    );

// View user's booking history
router.get('/booking-history/:userId', getUserBookingHistory);

router.get("/rooms", checkAvailability)

// Cancel a reservation
router.delete('/cancel/reservations/:id',  cancelReservation);



export default router;
