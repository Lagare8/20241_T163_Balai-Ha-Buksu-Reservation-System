import express from "express";
import { postEmployee, getEmployeeById, putEmployee, deleteEmployee, getEmployee } from "../../controller/adminController.js"; 
const router = express.Router();

// Add new employees to system

router.post('/', postEmployee); //  method for post

router.get('/', getEmployee); //  method for get

router.get('/:id', getEmployeeById); // Use ID parameter in path

// Update employee details
router.put("/:id", putEmployee); //  method for put

// Delete employee details
router.delete('/:id', deleteEmployee); //  method for delete

export default router; // Use export statement for router