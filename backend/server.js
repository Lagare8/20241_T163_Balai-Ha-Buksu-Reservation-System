import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
<<<<<<< HEAD
import reservationRoutes from './routes/reservationRoutes.js';
import userRoutes from './routes/user-manager/userReservation.js'
=======

>>>>>>> 29cbbe6d3581f6f4289fb5b013c9ed89cb8fdbb6
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
app.use('/api/user', userRoutes);

// Admin routes
import employeesRouter from './routes/admin-manager/employees.js';
app.use('/api/admin/employees', employeesRouter);
app.use('/api/admin/employees', employeesRouter);
import adminRoomsRouter from './routes/admin-manager/RoomRoutes.js';
app.use('/admin/rooms', adminRoomsRouter);

// Employee routes
import reservationsRouter from './routes/employee-manager/reservation.js';
app.use('/employee/reservations', reservationsRouter);

import employeeRoomsRouter from './routes/employee-manager/RoomRoutes.js';
app.use('/employee/rooms', employeeRoomsRouter);

// User routes
import userRouter from './routes/user-manager/userReservation.js';
app.use('/user', userRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
