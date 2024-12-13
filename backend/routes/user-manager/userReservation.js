import express from "express";
import { postRoomReservation, postCateringReservation, postHallReservation, getUserBookingHistory, cancelReservation, checkAvailability, loginUser, getNotifications, getUserProfile, updateUserProfile, changePassword, uploadProfilePicture, upload} from "../../controller/userController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
const router = express.Router();

// 1. Reserve a room
router.post('/reserve/room', authMiddleware, postRoomReservation);
router.post('/reserve/hall', authMiddleware, postHallReservation);
router.post('/reserve/catering', authMiddleware, postCateringReservation);
// View user's booking history
router.get('/booking-history/:userId', authMiddleware, getUserBookingHistory);

router.get("/check-availability", checkAvailability)

router.get('/notifications', authMiddleware, getNotifications);

router.get('/profile', authMiddleware, getUserProfile);

router.put('/profile', authMiddleware, updateUserProfile);

router.put('/changepassword', authMiddleware, changePassword);

router.post('/upload-profile-picture', authMiddleware, upload.single('file'),  uploadProfilePicture);

// Cancel a reservation
router.delete('/cancel/reservations/:id',  cancelReservation);


// Login route
router.post("/login", loginUser);


export default router;