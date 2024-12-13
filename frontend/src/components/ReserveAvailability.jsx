import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const UserReserve = () => {
  const navigate = useNavigate();

  const {  setToken} = useAuth();

  useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
      setToken(storedToken); // Set token in context
      console.log("Token in Dashboard:", storedToken); // Debugging the token
      // setLoading(false); // Token found, stop loading
  } else {
      console.log("No token found, redirecting to login");
      navigate('/'); // Redirect to login if no token
  }
  }, [navigate, setToken]);
  return (
    <div style={{backgroundColor: 'gray', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight:'100vh'}}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1b1f3b' }}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="logo.png" alt="Logo" style={{ height: '40px' }} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <input type="text"  placeholder="Search...." style={{ borderRadius: '50px', padding: '10px', margin: '5px' }}></input>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">View Offers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="bi bi-search"></i></a>
              </li>
              <li>
                <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='container mt-4'>
        <div className='card'>
          <div className='card-body text-center'>
            Balai Ha BukSu Offer
          <div class="container">
            <div class="row">
              <div class="col-sm text-center">
                Function Hall
                <div className='card border-0'>
                  <div className='card-body'>
                      <img src="../assets/function.jpg" alt="Function Hall" className="img-fluid" style={{ height:'650px', width: '100%', objectFit: 'cover' }}/>
                  </div>
                </div>
                <a href="/function" style={{textDecoration: 'none', color: 'black'}}>Check Availability</a>
              </div>
                <div class="col-sm text-center">
                  Rooms
                  <div className='card border-0'>
                    <div className='card-body'>
                      <img src="../assets/room.png" alt="Rooms" className='img-fluid' style={{height: '650px', width: '100%', objectFit: 'cover'}} />
                    </div>
                  </div>
                  <a href="/Rooms" style={{textDecoration: 'none', color: 'black'}}>Check Availability</a>
                </div>
                <div class="col-sm text-center">
                  Catering Services
                  <div className='card border-0'>
                    <div className='card-body'>
                      <img src="../assets/cater.png" alt="Cater" className='img-fluid' style={{height: '650px', width:'100%', objectFit:'cover'}} />
                    </div>
                  </div>
                    <a href="/catering" style={{textDecoration: 'none', color: 'black'}}>Check Availability</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserReserve;