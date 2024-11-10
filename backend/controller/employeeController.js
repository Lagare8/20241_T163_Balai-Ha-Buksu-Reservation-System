import Reservation from "../models/users/Reservation.js";

const getBookingHistory = async (req, res) => {
    try {
        const bookings = await Reservation.find()  // Fetch all reservations
            .populate('userId', 'username email')  // Populate user info (optional, if needed)
            .exec();

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }

        return res.status(200).json(bookings);  // Send the bookings as response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching bookings' });
    }
};

const deleteReservation = async (req, res) => {

}

const postReservation = async (req, res) => {

}
//Room routes
const getRooms = async (req, res) => {

}

const putRooms = async (req, res) => {

}

const getRoomById = async (req, res) => {

}

export {getBookingHistory, deleteReservation, postReservation, getRooms, getRoomById, putRooms}



