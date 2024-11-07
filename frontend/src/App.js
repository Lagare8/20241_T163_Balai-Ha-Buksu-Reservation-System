import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider} from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
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


function App() {
  
  return (
    <GoogleOAuthProvider clientId="338786715312-pobde68fle4vr3se6lpe12ldvg5fq8s3.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/employeeDashboard" element={<EmpDashboard />} />
          <Route path="/employeeFunctionHall" element={<EmpFunctionHall />} />
          <Route path="/employeeRooms" element={<EmpRoom />} />
          <Route path="/userReserve" element={<UserReserve />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/function" element={<Function />} />
          <Route path="/catering" element={<Catering />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
    
  );
}

export default App;
