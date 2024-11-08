import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';  // Import the login route

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('DB connected'))
    .catch((error) => console.log(error));

//---------------------------------------Create Routes-------------------------------------------//
app.use('/api/auth', authRouter);  //login route

// Admin routes
import employeesRouter from './routes/admin-manager/employees.js'; 
app.use('/admin/employees', employeesRouter);
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