import express from "express";
import { getBookingHistory, deleteReservation, postReservation } from "../../controller/employeeController.js";
const router = express.Router();

// View booking history
router.get("/bookings", getBookingHistory);

// Cancel a reservation
router.delete('/cancel/reservations/:id', deleteReservation)

//Accept a user reservation
router.post('/reserve', postReservation);

export default router;