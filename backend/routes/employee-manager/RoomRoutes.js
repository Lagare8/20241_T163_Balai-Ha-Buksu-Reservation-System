import express from "express";
import {getRooms, getRoomById, putRooms} from "../../controller/employeeController.js";
const router = express.Router();
//View all rooms
router.get('/', getRooms)

//update Rooms
router.put("/:id", putRooms)


//This route used to view specific Room details 
router.get("/:id", getRoomById)


export default router;
