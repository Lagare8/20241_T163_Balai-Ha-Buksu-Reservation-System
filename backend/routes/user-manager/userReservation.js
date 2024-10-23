const express = require("express");
const router = express.Router();

// Simulated database using an array
let reservations = [];

// 1. Reserve a room
router.post('/reserve', (req, res) => {
    const { userId, roomNumber, checkInDate, checkOutDate } = req.body;

    // Create a new reservation object
    const newReservation = {
        id: reservations.length, // Use length as ID for simplicity
        userId: parseInt(userId), // Ensure userId is a number
        roomNumber,
        checkInDate,
        checkOutDate,
        status: 'Reserved'
    };

    reservations.push(newReservation);
    res.status(201).send({ message: "Reservation successful", data: newReservation });
});

// View user's booking history
router.get('/booking-history/:userId', (req, res) => {
    const { userId } = req.params;
    const userReservations = reservations.filter(r => r.userId === parseInt(userId));

    if (userReservations.length) {
        res.status(200).send({ data: userReservations });
    } else {
        res.status(404).send({ message: 'No reservations found for this user.' });
    }
});

// Cancel a reservation
router.delete('/cancel/reservations/:id', (req, res) => {
    const { id } = req.params;
    const reservationIndex = reservations.findIndex(r => r.id === parseInt(id));

    if (reservationIndex !== -1) {
        const canceledReservation = reservations.splice(reservationIndex, 1); // Remove reservation
        res.status(200).send({ message: `Reservation ID ${id} has been canceled`, data: canceledReservation });
    } else {
        res.status(404).send({ message: 'Reservation not found' });
    }
});

// Test route (optional)
router.get('/test', (req, res) => {
    res.json("Reservation function working");
});

module.exports = router;
