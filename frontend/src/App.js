import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Component imports
import Login from './components/Login';
import UserDashboard from './components/userDasboard';
import UserReserve from './components/ReserveAvailability';
import AdminDashboard from './components/adminDashboard';
import Rooms from './components/Rooms';
import Function from './components/function';
import Catering from './components/foodCatering';
import EmpFunctionHall from './components/employeeFunctionHall';
import EmpDashboard from './components/employeeDashboard';
import EmpRoom from './components/employeeRooms';
import RoomCalendar from './components/RoomCalendar';
import FunctionCalendar from './components/FunctionCalendar';
import AdminBookings from './components/adminBookings';
import EmployeeBookings from './components/employeeBookings';
import EmpFoodcatering from './components/employeeCatering';
import UserBookings from './components/userBooking';
import ProtectedRoute from './components/protectedRoute';
import { AuthProvider } from './context/AuthContext';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <GoogleOAuthProvider clientId="338786715312-pobde68fle4vr3se6lpe12ldvg5fq8s3.apps.googleusercontent.com">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Default Route */}
            <Route index element={<Login />} />
            {/* Unauthorized Page */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* User Routes */}
            <Route path="/userDashboard" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
            <Route path="/userReserve" element={<ProtectedRoute allowedRoles={['user']}><UserReserve /></ProtectedRoute>} />
            <Route path="/userBookings" element={<ProtectedRoute allowedRoles={['user']}><UserBookings /></ProtectedRoute>} />

            {/* Employee Routes */}
            <Route path="/employeeDashboard" element={<ProtectedRoute allowedRoles={['employee']}><EmpDashboard /></ProtectedRoute>} />
            <Route path="/Emprooms" element={<ProtectedRoute allowedRoles={['employee']}><EmpRoom /></ProtectedRoute>} />
            <Route path="/Empfunction-hall" element={<ProtectedRoute allowedRoles={['employee']}><EmpFunctionHall /></ProtectedRoute>} />
            <Route path="/Empfood-catering" element={<ProtectedRoute allowedRoles={['employee']}><EmpFoodcatering /></ProtectedRoute>} />
            <Route path="/employeeBookings" element={<ProtectedRoute allowedRoles={['employee']}><EmployeeBookings /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/adminDashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/adminBookings" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookings /></ProtectedRoute>} />

            {/* General Routes */}
            <Route path="/rooms" element={<ProtectedRoute allowedRoles={['user']}><Rooms /></ProtectedRoute>} />
            <Route path="/function" element={<ProtectedRoute allowedRoles={['user']}><Function /></ProtectedRoute>} />
            <Route path="/catering" element={<ProtectedRoute allowedRoles={['user']}><Catering /></ProtectedRoute>} />
            <Route path="/roomCalendar" element={<ProtectedRoute allowedRoles={['user']}><RoomCalendar /></ProtectedRoute>} />
            <Route path="/functionCalendar" element={<ProtectedRoute allowedRoles={['user']}><FunctionCalendar /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
