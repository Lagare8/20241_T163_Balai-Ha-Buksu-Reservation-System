const express = require("express");
import { getBookingHistory, deleteReservation, postReservation } from "../../controller/employeeController";

const router = express.Router();

// View booking history
router.getBookingHistory("/", getBookingHistory);

// Cancel a reservation
router.deleteReservation('/cancel/reservations/:id', deleteReservation)

//Accept a user reservation
router.postReservation('/reserve', postReservation);

module.exports = router;