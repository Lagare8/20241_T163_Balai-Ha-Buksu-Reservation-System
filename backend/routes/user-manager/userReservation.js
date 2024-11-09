import express from "express";
import { postUserReservation, getUserBookingHistory, cancelReservation, checkAvailability, loginUser} from "../../controller/userController.js";

const router = express.Router();
// Simulated database using an array
let reservations = [];

// 1. Reserve a room
router.post('/reserve', postUserReservation);

// View user's booking history
router.get('/booking-history/:userId', getUserBookingHistory);

router.get("/rooms", checkAvailability)

// Cancel a reservation
router.delete('/cancel/reservations/:id',  cancelReservation);

// Login route
router.post("/login", loginUser);


export default router;
