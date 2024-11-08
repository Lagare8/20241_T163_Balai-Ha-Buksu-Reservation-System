import express from "express";
import { getRooms, putRooms, getRoomById } from "../../controller/adminController.js"; 
const router = express.Router();

//View all rooms
router.get('/', getRooms); //method for get 

//update Rooms
router.put("/:id", putRooms)

//This route used to view specific Room details 
router.get("/:id", getRoomById)

export default router; // Use export statement for router