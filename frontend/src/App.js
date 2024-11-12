import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Component imports
import Login from '../src/components/Login.jsx';
import UserDashboard from '../src/components/userDasboard.jsx';
import UserReserve from './components/ReserveAvailability.jsx';
import AdminDashboard from './components/adminDashboard.jsx';
import Rooms from './components/Rooms.jsx';
import Function from './components/function.jsx';
import Catering from './components/foodCatering.jsx';
import EmpFunctionHall from './components/employeeFunctionHall.jsx';
import EmpDashboard from './components/employeeDashboard.jsx';
import EmpRoom from './components/employeeRooms.jsx';
import RoomCalendar from './components/RoomCalendar.jsx';
import FunctionCalendar from './components/FunctionCalendar.jsx';
import AdminBookings from './components/adminBookings.jsx';
import EmployeeBookings from './components/employeeBookings.jsx';
import EmpFoodcatering from './components/employeeCatering.jsx';
import UserBookings from './components/userBooking.jsx';

//Import AuthContext
import { AuthProvider } from './context/AuthContext.js';

function App() {
  return (
    <GoogleOAuthProvider clientId="338786715312-pobde68fle4vr3se6lpe12ldvg5fq8s3.apps.googleusercontent.com">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Default Route */}
            <Route index element={<Login />} />

            {/* User Routes */}
            <Route path="/userDashboard" element={<UserDashboard />} />
            <Route path="/userReserve" element={<UserReserve />} />
            <Route path="/userBookings" element={<UserBookings/>}/>

            {/* Employee Routes */}
            <Route path="/employeeDashboard" element={<EmpDashboard />} />
            <Route path="/Emprooms" element={<EmpRoom />} />
            <Route path="/Empfunction-hall" element={<EmpFunctionHall />} />
            <Route path="/Empfood-catering" element={<EmpFoodcatering />} />
            <Route path="/employeeBookings" element={<EmployeeBookings />} />

            {/* Admin Routes */}
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/adminBookings" element={<AdminBookings />} />

            {/* General Routes */}
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/function" element={<Function />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/roomCalendar" element={<RoomCalendar />} />
            <Route path="/functionCalendar" element={<FunctionCalendar />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
