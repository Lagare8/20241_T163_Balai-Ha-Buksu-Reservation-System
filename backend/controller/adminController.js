import Employee from '../models/users/employee.js'; // Adjust path as needed
import Reservation from '../models/users/Reservation.js';
import nodeMailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import Notification from '../models/users/Notification.js';


const postEmployee = async (req, res) => {
    try {
        const { username, email } = req.body;
        console.log("Request Body:", req.body);

        if (!username || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const generatedPassword = Math.random().toString(36).slice(-8);  // Ensure password is generated
        console.log("generated raw password", generatedPassword)

        const newEmployee = new Employee({
            username,
            email,
            password: generatedPassword,
        });

        await newEmployee.save();

        // Return the new employee and generated password
        res.status(201).json({ 
            message: 'Employee added successfully', 
            employee: newEmployee, 
            generatedPassword 
        });
    } catch (error) {
        console.error("Error adding employee:", error);  // Log the error for debugging
        res.status(400).json({ message: "Error adding employee", error: error.message || error });
    }
};

const sendEmail = async (req, res) => {
    const {email, password} = req.body;

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your account Password',
        text: `Your account has been created. Your password is ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error); // Log the error
            return res.status(500).json({ message: "Failed to send email", error });
        }
        console.log("Email sent: ", info); // Log the info
        res.status(200).send("Email sent");
    });
}   


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
};

const cancelReservation = async (req, res) => {
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
    
}

const getBookingHistory = async (req, res) => {
    const {reservationId} = req.params;

    try{
        const reservation = await Reservation.findById(reservationId);
        if(!reservation){
            return res.status(404).json({message: 'Booking not found'});
        }
        return res.status(200).json(reservation.history);
    }catch(error){
        console.error('Error fetching booking history');
        return res.status(500).json({messsage: 'An error occured while fetching the booking history'});
    }
}

const deleteEmployee = async (req, res) => {

}

const getEmployeeById = async (req, res) => {
    try{
        const {id} = req.params;

        const employee = await Employee.findById(id).select('-password');

        if(!employee){
            return res.status(404).json({message: 'Employee not found'});
        }

        res.status(200).json(employee);

    }catch(error){
        console.error('Error fetching employee by ID: ', error);
        res.status(500).json({message:'Server error'});
    }
}

const getRooms =async (req,res) => {

}

const putRooms = async (req, res) => {

}

const getRoomById =async (req, res) => {

}



export {postEmployee, getEmployee, putEmployee, deleteEmployee,getEmployeeById, getRoomById, getRooms, putRooms, getAllReservations, confirmReservation, cancelReservation, sendEmail}
