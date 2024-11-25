// import User from "../routes/user-manager/userReservation.js"
import jwt from 'jsonwebtoken';
import Reservation from "../models/users/Reservation.js";
import Notification from "../models/users/Notification.js";
import {User, Employee, Admin} from "../models/users/user.js";
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, userType: user.constructor.modelName },
        process.env.JWT_SECRET,  // Ensure you have a secret in your environment variables
        { expiresIn: '1h' }      // Token expiration time
    );
};

const postRoomReservation = async (req, res) => {
    const { roomNumber, date } = req.body;
    const userId = req.userId;  // Extract user ID from token
    
    if (!roomNumber || !date) {
        return res.status(400).json({ message: 'Room number and date are required.' });
    }

    // Ensure the date is valid
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
        return res.status(400).json({ message: 'Invalid date format.' });
    }

    try {
        const reservation = new Reservation({
            userId,
            reserveType: 'Room',
            reservationDetails: { roomNumber },
            date,
        });
        await reservation.save();
        res.status(201).json({ message: 'Room reserved successfully!', reservation });
    } catch (error) {
        console.error('Error creating room reservation:', error);
        res.status(500).json({ message: 'Failed to create room reservation' });
    }
};

const postHallReservation = async (req, res) => {
    const { date } = req.body; // Only need the date for Function Hall
    const userId = req.userId; // Extract userId from the token middleware
    
    // Validate inputs
    if (!date) {
        return res.status(400).json({ message: 'Date is required for Function Hall reservations.' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
        return res.status(400).json({ message: 'Invalid date format.' });
    }

    try {
        // Check if Function Hall is already reserved for the given date
        const existingReservation = await Reservation.findOne({
            reserveType: 'Function Hall',
            date: parsedDate
        });

        if (existingReservation) {
            return res.status(409).json({ message: 'Function Hall is already reserved for this date.' });
        }

        // Create the new reservation
        const reservation = new Reservation({
            userId,
            reserveType: 'Function Hall',
            date: parsedDate,
        });

        await reservation.save();
        res.status(201).json({ message: 'Function Hall reserved successfully!', reservation });
    } catch (error) {
        console.error('Error creating Function Hall reservation:', error);
        res.status(500).json({ message: 'Failed to create Function Hall reservation. Please try again later.' });
    }
};


const postCateringReservation = async (req, res) => {
    const { date, cateringOptions } = req.body;
    const userId = req.userId; // Get user from JWT or session
    try {
      // Create the reservation object
    const reservation = new Reservation({
        userId,
        reserveType: 'Catering',
        reservationDetails: {
          cateringOptions, // Array of menu items with quantity
        },
        date,
    });

      await reservation.save();  // Save the reservation to the database

    res.status(201).json({ message: 'Catering reservation successfully created', reservation });
    } catch (error) {
    console.error('Error creating catering reservation:', error);
    res.status(500).json({ message: 'Failed to create a catering reservation' });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.userId }); // Get notifications for the authenticated user
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

const getUserBookingHistory = async (req, res) => {
    const userId = req.userId;  // Assuming JWT is used to authenticate the user
    try {
        // Fetch bookings for a user (not employee)
        const reservations = await Reservation.find({ userId: userId })
            .select('reserveType status date reservationDetails');  // Ensure this selects all necessary fields
        
        // Log the fetched reservations for debugging
        console.log(reservations);

        // Format the booking history
        const formattedHistory = reservations.map(reservation => {
            let details = {
                name: reservation._id,  // Or you could map this to the user's name if needed
                reservationType: reservation.reserveType,  // Using reserveType instead of type
                date: reservation.date,
                status: reservation.status,
            };

            // Add specific details based on the reservation type
            if (reservation.reserveType === 'Room') {
                details.roomNumber = reservation.reservationDetails.roomNumber;
            } else if (reservation.reserveType === 'Function Hall') {
                details.functionHall = "Main Function Hall";
            } else if (reservation.reserveType === 'Catering') {
                details.cateringOptions = reservation.reservationDetails.cateringOptions;
            }
            return details;
        });
        
        res.status(200).json(formattedHistory);
    } catch (error) {
        console.error("Error fetching booking history: ", error);
        res.status(500).json({ message: 'Failed to fetch the booking history' });
    }
};

const checkAvailability = async (req, res) => {
    const { reserveType, reserve, date } = req.query;
    
    if (!reserveType || !reserve || !date) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    const roomNumber = parseInt(reserve);
    if (isNaN(roomNumber)) {
        return res.status(400).json({ message: 'Invalid room number' });
    }

    try {
        let query = { date: parsedDate };

        if (reserveType === 'Room') {
            query.reserveType = 'Room';
            query['reservationDetails.roomNumber'] = roomNumber;  // Query for specific room
        } else {
            return res.status(400).json({ message: 'Invalid reservation type' });
        }

        const reservationExists = await Reservation.findOne(query);

        res.status(200).json({ available: !reservationExists });
    } catch (error) {
        console.error("Error checking availability", error);
        res.status(500).json({ message: 'Failed to check availability' });
    }
};


const cancelReservation = async (req, res) => {
    const reservationId = req.params.id; // Get the reservation ID from the URL parameter

    try {

        const reservation = await Reservation.findByIdAndDelete(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.status(200).json({ message: 'Reservation canceled successfully!' });
    } catch (error) {
        console.error('Error canceling reservation: ', error);
        res.status(500).json({ message: 'Failed to cancel reservation' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Received email:', email);  // Debugging: Log the email
    console.log('Received password:', password);  // Debugging: Log the password

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required!' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log('Normalized email:', normalizedEmail);  // Log the normalized email

    let user;
    try {
        user = await User.findOne({ email: normalizedEmail });
    } catch (error) {
        return res.status(500).json({ message: 'Error while searching for user!' });
    }

    if (!user) {
        return res.status(400).json({ message: 'User not found!' });
    }

    // Check if passwords match
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials!' });
    }

    res.status(200).json({
        message: 'Login successful!',
        userType: user.constructor.modelName,
        token: generateToken(user),
    });
};

const getUserProfile = async (req,res) => {

    try {
        console.log('Request User:', req.userId); // Debug log

        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        console.log('User data from DB:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserProfile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId; // Ensure this is correct and `req.user` is populated
        const updates = req.body;

        // Fix the method name to 'findByIdAndUpdate'
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        }).select('-password'); // Exclude password from response

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); // Send updated user data as response
    } catch (error) {
        console.error(error); // Log the error to the server console
        res.status(500).json({ message: 'Server error' }); // Send a 500 error if there's an issue
    }
};

const changePassword = async (req, res) => {
    try{
        const { newPassword } = req.body;
        const userId = req.userId;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findByIdAndUpdate(userId, {password: hashedPassword}, {new: true});

        if(!updatedUser){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'Password updated successfully'});
    }catch(error){
        res.status(500).json({message: 'Error updating password'});
    }
}

export {postRoomReservation, postCateringReservation, postHallReservation, getUserBookingHistory, cancelReservation, checkAvailability, loginUser, getNotifications, getUserProfile, updateUserProfile, changePassword}