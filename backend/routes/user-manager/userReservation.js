const express = require("express");
const router = express.Router();
import { postUserReservation, getUserBookingHistory, cancelReservation, checkAvailability} from "../../controller/userController";
// Simulated database using an array
let reservations = [];

// 1. Reserve a room
router.postUserReservation('/reserve', postUserReservation 
    );

// View user's booking history
router.getUserBookingHistory('/booking-history/:userId', getUserBookingHistory);

router.checkAvailability("/rooms", checkAvailability)

// Cancel a reservation
router.cancelReservation('/cancel/reservations/:id',  cancelReservation
   );



module.exports = router;
