
import Employee from '../models/users/employee.js'; // Adjust path as needed
import Reservation from '../models/users/Reservation.js';

const postEmployee = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newEmployee = new Employee({ username, email, password });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: "Error adding employee", error });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Error fetching employees", error });
    }
};
const putEmployee = async (req, res) => {

}

const getAllReservations = async (req, res) => {
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

const confirmReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            {status: 'confirmed'},
            {new : true}
        );
        if (!updatedReservation){
            return res.status(404).json({message: 'Reservation not found'});
        }

        updatedReservation.history.push({status: 'confirmed'});
        await updatedReservation.save();
        
        return res.status(200).json({message: 'Reservation confirmed', reservation: updatedReservation});
    }catch (error){
        console.error('Error confirming reservation', error);
        return res.status(500).json({message: 'An occured while fetching the reservation'});
    }
}

const cancelReservation = async (req, res) => {
    const {reservationId} = req.params.id;
    try{
        const canceledReservation = await Reservation.findByIdAndDelete(reservationId);

        if (!cancelReservation) {
            return res.status(404).json({message: 'Booking not found or already canceled'});
        }

        canceledReservation.history.push({status: 'canceled'});
        await cancelReservation.save();

        return res.status(200).json({message: 'Booking canceled successfully'});
    }catch (error){
        console.error('Error canceling booking', error);
        return res.status(500).json({message: 'An occured while cancelling the booking'});
    }
}

const deleteEmployee = async (req, res) => {

}

const getEmployeeById = async (req, res) => {

}

const getRooms =async (req,res) => {

}

const putRooms = async (req, res) => {

}

const getRoomById =async (req, res) => {

}

export {postEmployee, getEmployee, putEmployee, deleteEmployee,getEmployeeById, getRoomById, getRooms, putRooms, getAllReservations, confirmReservation, cancelReservation}
