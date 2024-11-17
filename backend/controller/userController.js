import User from "../routes/user-manager/userReservation.js"
import jwt from 'jsonwebtoken';
import Reservation from "../models/users/Reservation.js"

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
    const userId = req.userId;
    try {
        const reservation = new Reservation({
            userId,
            type: 'Catering',
            date,
            cateringOptions,
        });
        await reservation.save(); 
        res.status(201).json({ message: 'Catering reservation successfully', reservation});
    }catch (error){
        console.error('Error creating Catering reservation', error);
        res.status(500).json({message: 'Failed to create a catering reservation'});
    }
}

const getUserBookingHistory = async (req, res) => {
    const { userId } = req.params;
    try{
        const reservations = await Reservation.find({userId}).select('type date roomNumber cateringOptions');

        const formattedHistory = reservations.map(reservations => {
            let details = {
                reservationType: reservation.type,
                date: reservation.date
            };
            if (reservation.type == 'Room'){
                details.roomNumber = reservation.roomNumber;
            }else if (reservation.type == 'Function Hall'){
                details.functionHall = "Main Function Hall";
            }else if (reservation.type == 'Catering'){
                details.cateringOptions = reservation.cateringOptions;
            }
            return details;
        });
        res.status(200).json(formattedHistory);
    }catch(error){
        console.error("Error fetching booking history: ", error);
        res.status(500).json({ message: 'Failed to fetch the booking history'});
    }
};

const checkAvailability = async (req, res) => {
    const { reserveType, reserve, date } = req.query;
    
    // Validate required parameters
    if (!reserveType || !reserve || !date) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Validate the date format
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    // Ensure reserve is a valid room number (parse it as integer)
    const roomNumber = parseInt(reserve);
    if (isNaN(roomNumber)) {
        return res.status(400).json({ message: 'Invalid room number' });
    }

    // Build the query
    try {
        let query = { date: parsedDate };

        // Check reservation type and handle accordingly
        if (reserveType === 'Room') {
            query.reserveType = 'Room';
            query['reservationDetails.roomNumber'] = roomNumber;  // Query for specific room
        } else {
            return res.status(400).json({ message: 'Invalid reservation type' });
        }

        // Check if reservation exists for the given room and date
        const reservationExists = await Reservation.findOne(query);

        // Return availability status (true = available, false = occupied)
        res.status(200).json({ available: !reservationExists });
    } catch (error) {
        console.error("Error checking availability", error);
        res.status(500).json({ message: 'Failed to check availability' });
    }
};


const cancelReservation = async (req, res) => {
    const { id } = req.params;

    try{
        const reservation = await Reservation.findByIdandDelete(id);

        if (!reservation){
            return res.status(404).json({message: 'Reservation not found'});
        }
        res.status(200).json({message: 'Reservation canceled successfully!'});
    }catch(error){
        console.error('Error canceling reservation: ', error);
        res.status(500).json({message: 'Failed to cancel reservation'});
    }
}

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


export {postRoomReservation, postCateringReservation, postHallReservation, getUserBookingHistory, cancelReservation, checkAvailability, loginUser}