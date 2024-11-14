import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import reservationRoutes from './routes/reservationRoutes.js';
import userRoutes from './routes/user-manager/userReservation.js'; // Ensure this is correctly imported
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('DB connected'))
.catch((error) => console.log('DB connection error:', error));

// Routes
app.use('/api/auth', authRouter);
// Use the user routes
app.use('/api/user', userRoutes);  // Correct route for user

// Admin routes
import employeesRouter from './routes/admin-manager/employees.js';
app.use('/api/admin/employees', employeesRouter);
import adminRoomsRouter from './routes/admin-manager/RoomRoutes.js';
app.use('/admin/rooms', adminRoomsRouter);
import adminReservationsRouter from './routes/admin-manager/reservations.js';
app.use('/admin/reserve', adminReservationsRouter);
import adminConfirmReservationRouter from './routes/admin-manager/reservations.js';
app.use('/admin/reserve', adminConfirmReservationRouter);
import adminCancelReservationRouter from './routes/admin-manager/reservations.js';
app.use('/admin/reserve', adminCancelReservationRouter);
import adminSendEmail from './routes/admin-manager/employees.js';
app.use('/api/admin/employees', adminSendEmail);

// Employee routes
import reservationsRouter from './routes/employee-manager/reservation.js';
app.use('/employee/reservation', reservationsRouter);

import employeeRoomsRouter from './routes/employee-manager/RoomRoutes.js';
app.use('/employee/rooms', employeeRoomsRouter);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
