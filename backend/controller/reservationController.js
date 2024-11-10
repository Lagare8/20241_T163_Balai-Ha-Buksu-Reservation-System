import Reservation from '../models/Reservation.js';

// Create a reservation
export const createReservation = async (req, res) => {
  const { userId, date, itemType, itemId } = req.body;
  try {
    const newReservation = new Reservation({
      userId,
      date,
      itemType,
      itemId,
      status: 'Pending'
    });
    await newReservation.save();
    res.status(201).json({ message: 'Reservation created and pending approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation.', error });
  }
};

// Approve a reservation
export const approveReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }
    reservation.status = 'Approved';
    await reservation.save();
    res.status(200).json({ message: 'Reservation approved.' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving reservation.', error });
  }
};

// Reject a reservation
export const rejectReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }
    reservation.status = 'Rejected';
    await reservation.save();
    res.status(200).json({ message: 'Reservation rejected.' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting reservation.', error });
  }
};
