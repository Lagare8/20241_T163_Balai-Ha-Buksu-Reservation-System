import './app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Login';
import UserDashboard from './components/userDasboard.jsx';
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
     <div className="App">
      <Login/>
     </div>,
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/userDashboard" element={<UserDashboard/>}/>
        <Route path="/employeeDashboard" element={<EmpDashboard/>}/>
        <Route path="/employeeFunctionHall" element={<EmpFunctionHall/>}/>
        <Route path="/employeeRoooms" element={<EmpRoom/>}/>
        <Route path="/userReserve" element={<UserReserve/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/function" element ={<Function/>}/>
        <Route path="/catering" element={<Catering/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
