import Reservation from '../models/users/Reservation.js';

// Create a reservation
export const createReservation = async (req, res) => {
  const { userId, date, itemType, itemId } = req.body;

  // Input Validation
  if (!userId || !date || !itemType || !itemId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newReservation = new Reservation({
      userId,
      date,
      itemType,
      itemId,
      status: 'Pending',
      history: [{ status: 'Pending', changedAt: new Date() }]  // Track initial status
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

  // Authorization Check: Ensure the user has the correct role (admin or similar)
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'You do not have permission to approve reservations.' });
  }

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    // Update status and add history entry
    reservation.status = 'Approved';
    reservation.history.push({ status: 'Approved', changedAt: new Date() });

    await reservation.save();
    res.status(200).json({ message: 'Reservation approved.' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving reservation.', error });
  }
};

// Reject a reservation
export const rejectReservation = async (req, res) => {
  const { id } = req.params;

  // Authorization Check: Ensure the user has the correct role (admin or similar)
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'You do not have permission to reject reservations.' });
  }

  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    // Update status and add history entry
    reservation.status = 'Rejected';
    reservation.history.push({ status: 'Rejected', changedAt: new Date() });

    await reservation.save();
    res.status(200).json({ message: 'Reservation rejected.' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting reservation.', error });
  }
};
