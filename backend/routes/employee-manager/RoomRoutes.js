const router = require("express").Router();
const Room = require("../../models/employee-manager/roomModel");
import {getRooms, getRoomById, putRooms} from "../../controller/employeeController";

//View all rooms
router.getRooms('/', getRooms)



//update Rooms
router.putRooms("/:id", putRooms)


//This route used to view specific Room details 
router.getRoomById("/:id", getRoomById)


module.exports = router;
