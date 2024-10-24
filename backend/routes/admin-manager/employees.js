const router = require("express").Router();
import { postEmployee, getEmployeeById, putEmployee, deleteEmployee, getEmployeById, getEmployee } from "../../controller/adminController"

//add new employees to  system

router.postEmployee('/', postEmployee)


router.getEmployeeById('/', getEmployeeById)


//update employee details
router.putEmployee("/:id", putEmployee)

//delete employee details
router.deleteEmployee('/:id', deleteEmployee)


module.exports = router;