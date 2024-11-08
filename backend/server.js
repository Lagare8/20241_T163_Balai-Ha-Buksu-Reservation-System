import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

//---------------------------------------Server setup-------------------------------------------*/
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

//---------------------------------------Connect to MongoDB-------------------------------------------//
const URL = process.env.MONGO_CONNECT;

mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'))
    .catch(err => console.error('DB connection error:', err));

//---------------------------------------Create Routes-------------------------------------------//
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