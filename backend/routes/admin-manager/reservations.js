import express from "express";
import { postEmployee, getEmployeeById, putEmployee, deleteEmployee, getEmployee, getAllReservations, confirmReservation, cancelReservation } from "../../controller/adminController.js"; 

const router = express.Router();

router.get('/res', getAllReservations);

router.put('/confirm/:id', confirmReservation);

router.delete('/cancel/:id', cancelReservation);

export default router;