import express from "express";
import { postEmployee, getEmployeeById, putEmployee, deleteEmployee, getEmployee, getAllReservations } from "../../controller/adminController.js"; 

const router = express.Router();

router.get('/res', getAllReservations);

export default router;