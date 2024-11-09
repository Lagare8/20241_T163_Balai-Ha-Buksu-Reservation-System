import User from "../routes/user-manager/userReservation.js"
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, userType: user.constructor.modelName },
        process.env.JWT_SECRET,  // Ensure you have a secret in your environment variables
        { expiresIn: '1h' }      // Token expiration time
    );
};

const postUserReservation = async (req, res) => {

}

const getUserBookingHistory = async (req, res) => {

}

const checkAvailability = async (req, res) => {

}
const cancelReservation = async (req, res) => {

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


export {postUserReservation, getUserBookingHistory, cancelReservation, checkAvailability, loginUser}