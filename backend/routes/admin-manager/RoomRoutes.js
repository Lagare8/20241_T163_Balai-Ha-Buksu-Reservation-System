const router = require("express").Router();
const Room = require("./employees");
import { getRoomById, getRooms, putRooms } from "../../controller/adminController";

//View all rooms
router.getRooms('/', getRooms)



//update Rooms
router.putRooms("/:id", putRooms)


//This route used to view specific Room details 
router.getRoomById("/:id", getRoomById)

module.exports = router;