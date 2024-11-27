import express from "express";
import { getBookingHistory, deleteReservation, postReservation, getEmployeeProfile, updateEmployeeProfile, changePassword } from "../../controller/employeeController.js";
const router = express.Router();
import authMiddleware from "../../middleware/authMiddleware.js";


// View booking history
router.get("/bookings", getBookingHistory);

// Cancel a reservation
router.delete('/cancel/reservations/:id', deleteReservation)

//Accept a user reservation
router.post('/reserve', postReservation);

router.get('/employeeProfile', authMiddleware, getEmployeeProfile);

router.put('/employeeChangePassword', authMiddleware, changePassword );

router.put('/employeeProfile', authMiddleware, updateEmployeeProfile);

export default router;