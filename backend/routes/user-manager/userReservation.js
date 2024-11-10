import express from "express";
import { postRoomReservation, postCateringReservation, postHallReservation, getUserBookingHistory, cancelReservation, checkAvailability, loginUser} from "../../controller/userController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
const router = express.Router();
// Simulated database using an array
let reservations = [];

// 1. Reserve a room
router.post('/reserve/room', authMiddleware, postRoomReservation);
router.post('/reserve/hall', authMiddleware, postHallReservation);
router.post('/reserve/catering', authMiddleware, postCateringReservation);
// View user's booking history
router.get('/booking-history/:userId', getUserBookingHistory);

router.get("/check-availability", checkAvailability)

// Cancel a reservation
router.delete('/cancel/reservations/:id',  cancelReservation);

// Login route
router.post("/login", loginUser);


export default router;
