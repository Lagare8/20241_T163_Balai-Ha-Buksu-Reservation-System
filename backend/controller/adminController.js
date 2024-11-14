
import Employee from '../models/users/employee.js'; // Adjust path as needed
import Reservation from '../models/users/Reservation.js';
import nodeMailer from 'nodemailer';
import bcrypt from 'bcryptjs';

const postEmployee = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new Employee({
            username,
            email,
            password: hashedPassword
        });
        await newEmployee.save();
        res.status(201).json({message: 'Employee added successfully', employee: newEmployee});
    } catch (error) {
        res.status(400).json({ message: "Error adding employee", error });
    }
};

const sendEmail = async (req, res) => {
    const {email, password} = req.body;

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hotel1673@gmail.com',
            pass: 'xnmm ymtb wgss unip',
        }
    });
    const mailOptions = {
        from: 'hotel1673@gmail.com',
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
const reservationId = req.params.id;
console.log('Reservation ID:', reservationId); 
    try{
        const canceledReservation = await Reservation.findByIdAndDelete(reservationId);

        if (!canceledReservation) {
            return res.status(404).json({message: 'Booking not found or already canceled'});
        }
        // Ensure the history array exists before pushing
        if (!canceledReservation.history) {
            canceledReservation.history = [];
        }
        canceledReservation.status = 'canceled';
        canceledReservation.history.push({status: 'canceled'});

        await canceledReservation.save();

        return res.status(200).json({message: 'Booking canceled successfully'});
    }catch (error){
        console.error('Error canceling booking', error);
        return res.status(500).json({message: 'An occured while cancelling the booking'});
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

}

const getRooms =async (req,res) => {

}

const putRooms = async (req, res) => {

}

const getRoomById =async (req, res) => {

}

export {postEmployee, getEmployee, putEmployee, deleteEmployee,getEmployeeById, getRoomById, getRooms, putRooms, getAllReservations, confirmReservation, cancelReservation, sendEmail}
