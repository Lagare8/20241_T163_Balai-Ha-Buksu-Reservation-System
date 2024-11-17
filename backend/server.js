import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import userRoutes from './routes/user-manager/userReservation.js'; // Ensure this is correctly imported
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECT)
    .then(() => console.log('DB connected'))
    .catch((error) => console.log('DB connection error:', error));

// Routes
app.use('/api/auth', authRouter);  // Authentication routes
app.use('/api/user', userRoutes);  // User reservation routes

// Admin routes
import employeesRouter from './routes/admin-manager/employees.js';
app.use('/api/admin/employees', employeesRouter); // Employee management routes
import adminRoomsRouter from './routes/admin-manager/RoomRoutes.js';
app.use('/api/admin/rooms', adminRoomsRouter);  // Admin room management routes
import adminReservationsRouter from './routes/admin-manager/reservations.js';
app.use('/api/admin/reservations', adminReservationsRouter);  // Admin reservation handling routes
import adminConfirmReservationRouter from './routes/admin-manager/reservations.js';
app.use('/api/admin/reservations/confirm', adminConfirmReservationRouter); // Separate confirm route
import adminCancelReservationRouter from './routes/admin-manager/reservations.js';
app.use('/api/admin/reservations/cancel', adminCancelReservationRouter); // Separate cancel route

// Employee routes
import reservationsRouter from './routes/employee-manager/reservation.js';
app.use('/api/employee/reservation', reservationsRouter); // Employee reservation routes

import employeeRoomsRouter from './routes/employee-manager/RoomRoutes.js';
app.use('/api/employee/rooms', employeeRoomsRouter); // Employee room management routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
