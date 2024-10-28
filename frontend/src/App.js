
import './app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Login';
import UserDashboard from '../src/userDasboard.jsx';
import UserReserve from '../src/ReserveAvailability.jsx';


function App() {
  return (
    // <div className="App">
    //  <Login/>
    // </div>,
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="/userDashboard" element={<UserDashboard/>}/>
        <Route path="/userReserve" element={<UserReserve/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
