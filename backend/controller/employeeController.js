import Reservation from "../models/users/Reservation.js";
import { Employee } from "../models/users/user.js";
import bcrypt from "bcryptjs"; 
import jwt from 'jsonwebtoken';
import Notification from '../models/users/Notification.js';

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
    const reservationId = req.params.id;
    console.log('Reservation ID:', reservationId); 

    try {
        const canceledReservation = await Reservation.findByIdAndDelete(reservationId);

        if (!canceledReservation) {
            return res.status(404).json({ message: 'Booking not found or already canceled' });
        }
        await canceledReservation.save();
        // Perform additional actions (if needed) after deletion here
        return res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error('Error canceling booking', error);
        return res.status(500).json({ message: 'An error occurred while canceling the booking' });
    }
};


const postReservation = async (req, res) => {

}
const confirmReservation = async (req, res) => {
    try {
        const reservationId = req.params.id;

        // Find the reservation and update its status to confirmed
        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { status: 'confirmed' },
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Push the confirmation status into the history
        updatedReservation.history.push({ status: 'confirmed' });
        await updatedReservation.save();

        // Create a notification for the user
        const notificationMessage = `Your reservation for ${updatedReservation.roomNumber || 'a room'} has been confirmed.`;
        
        const notification = new Notification({
            userId: updatedReservation.userId,  // Assuming reservation has a userId field
            message: notificationMessage,
            type: 'reservation', // Add a type field
            status: 'unread'      // Default status
        });

        // Save the notification to the database
        await notification.save();
        console.log('Notification saved:', notification); 

        // Send response back with the updated reservation and confirmation message
        return res.status(200).json({
            message: 'Reservation confirmed and notification sent to the user',
            reservation: updatedReservation
        });
    } catch (error) {
        console.error('Error confirming reservation or saving notification', error);
        return res.status(500).json({ message: 'An error occurred while confirming the reservation' });
    }
}
//Room routes
const getRooms = async (req, res) => {

}

const putRooms = async (req, res) => {

}

const getRoomById = async (req, res) => {

}

const getEmployeeProfile = async (req, res) => {
    try {
        const userId = req.userId; // Extract the user ID from the request (e.g., via middleware)
        const employee = await Employee.findById(userId).select("-password"); // Exclude the password field

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee profile:", error.message);
        res.status(500).json({ message: "Server error while fetching employee profile" });
    }
};

const updateEmployeeProfile = async (req, res) => {
    try {
        const userId = req.userId; // Extract the user ID from the request
        const updates = req.body; // Get updates from the request body

        // Find and update the employee record
        const updatedEmployee = await Employee.findByIdAndUpdate(userId, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure schema validation
        }).select("-password"); // Exclude the password field

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error("Error updating employee profile:", error.message);
        res.status(500).json({ message: "Server error while updating employee profile" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body; // Extract new password from the request body
        const userId = req.userId; // Extract the user ID from the request

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        const updatedEmployee = await Employee.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true } // Return the updated document
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error.message);
        res.status(500).json({ message: "Server error while updating password" });
    }
};

export {getBookingHistory, deleteReservation, postReservation, getRooms, getRoomById, putRooms, getEmployeeProfile, updateEmployeeProfile, changePassword, confirmReservation}



