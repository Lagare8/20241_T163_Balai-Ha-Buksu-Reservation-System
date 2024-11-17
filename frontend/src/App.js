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
  import ProtectedRoute from './components/protectedRoute.jsx';
  import { AuthProvider } from './context/AuthContext.js';
  import Unauthorized from './components/Unauthorized.jsx';
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
              <Route path="/userDashboard"  element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
              <Route path="/userReserve" element={<ProtectedRoute allowedRoles={['user']}><UserReserve /></ProtectedRoute>} />
              <Route path="/userBookings" element={<ProtectedRoute allowedRoles={['user']}><UserBookings /></ProtectedRoute>}/>

              {/* Employee Routes */}
              <Route path="/employeeDashboard" element={<ProtectedRoute allowedRoles={['employee', 'admin']}><EmpDashboard /></ProtectedRoute>} />
              <Route path="/Emprooms" element={<ProtectedRoute allowedRoles={['employee', 'admin']}><EmpRoom /></ProtectedRoute>} />
              <Route path="/Empfunction-hall" element={<ProtectedRoute allowedRoles={['employee', 'admin']}><EmpFunctionHall /></ProtectedRoute>}/>
              <Route path="/Empfood-catering" element={<ProtectedRoute allowedRoles={['employee', 'admin']}><EmpFoodcatering /></ProtectedRoute>}/>
              <Route path="/employeeBookings" element={<ProtectedRoute allowedRoles={['employee', 'admin']}><EmployeeBookings /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path=" " element={<AdminBookings />} />

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
