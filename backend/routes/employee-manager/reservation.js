const express = require("express");
const router = express.Router();
const Reservation = require("../employee-manager/RoomRoutes"); 

// View booking history
router.get('/booking-history', async (req, res) => {
  
    res.json(reservations);
});

// Cancel a reservation
router.delete('/cancel/reservations/:id', (req, res) => {
    const { id } = req.params;
    const reservationIndex = reservations.findIndex(r => r.id === parseInt(id));

    if (reservationIndex !== -1) {
        const canceledReservation = reservations.splice(reservationIndex, 1);
        res.send(`Reservation ID ${id} has been canceled`);
    } else {
        res.status(404).send('Reservation not found');
    }
});


router.post('/reserve', (req, res) => {
   
});

module.exports = router;