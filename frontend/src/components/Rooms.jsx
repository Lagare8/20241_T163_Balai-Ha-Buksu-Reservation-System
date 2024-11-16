import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { token} = useAuth();
  const navigate = useNavigate();
  const { setToken} = useAuth();

  useEffect(() => {
    console.log("Token in Rooms.jsx:", token);
    // If you need to use the token to fetch data or make requests, do so here
  }, [token]);
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

  const handleReserveClick = (roomIndex) => {
    console.log("Reserve button clicked for Room", roomIndex + 1); // Debugging
    setSelectedRoom(roomIndex);
    navigate('/roomCalendar', { state: { roomNumber: roomIndex + 1 } });
  };

  return (
    <div
      style={{
        backgroundColor: 'gray',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#283555', height: '70px' }}>
        <div className="container d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src="/assets/Shield_logo_of_Bukidnon_State_University.png"
              alt="BUKSU Logo"
              style={{ height: '50px', marginRight: '10px' }}
            />
            <img
              src="/assets/lgo.png"
              alt="BUKSU Hotel Logo"
              style={{ height: '80px', width: '120px' }}
            />
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
          <form className="form-inline my-2 my-lg-0 ml-auto">
            <div className="d-flex align-items-center">
              <input
                className="form-control mr-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  View Offers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FontAwesomeIcon icon={faBell} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <h1 style={{ marginTop: '25px', textAlign: 'center' }}>Rooms</h1>
        <div className="row">
          <div className="col-sm text-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="card" style={{ marginTop: '15px' }} key={index}>
                <div className="card-body d-flex">
                  <img
                    src="../assets/room1.jpg"
                    alt="Room1"
                    style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }}
                  />
                  <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'start' }}>
                      <h3 style={{ marginBottom: 'auto' }}>Room {index + 1}</h3>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ alignSelf: 'flex-end' }}
                      onClick={() => handleReserveClick(index)}
                    >
                      Reserve &gt;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-sm text-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="card" style={{ marginTop: '15px' }} key={index + 3}>
                <div className="card-body d-flex">
                  <img
                    src="../assets/room1.jpg"
                    alt="Room1"
                    style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }}
                  />
                  <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'start' }}>
                      <h3 style={{ marginBottom: 'auto' }}>Room {index + 4}</h3>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ alignSelf: 'flex-end' }}
                      onClick={() => handleReserveClick(index + 3)} // Adjust index appropriately for rooms 4 to 6
                    >
                      Reserve &gt;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
