import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomAvailability, setRoomsAvailability] = useState([true, true, true, true, true, true]);
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
  useEffect(() => {
    if (startDate) {
      checkRoomAvailability();
    }
  }, [startDate]);

  const checkRoomAvailability = async () => {
    try {
      const availabilityRequests = Array.from({ length: 6 }).map((_, i) =>
        axios.get('http://localhost:5000/api/user/check-availability', {
          params: {
            reserveType: 'Room',
            reserve: i + 1,  // Correct room number being checked
            date: startDate.toISOString().split('T')[0],
          },
        }).then(response => ({ index: i, available: response.data.available }))
      );
  
      const results = await Promise.all(availabilityRequests);
      const updatedAvailability = [...roomAvailability];
      results.forEach(({ index, available }) => {
        updatedAvailability[index] = available;
      });
      setRoomsAvailability(updatedAvailability);
    } catch (error) {
      console.error('Error checking availability', error);
      alert('An error occurred while checking availability.');
    }
  };
  

  const handleDateSelect = (date) => {
    setStartDate(date);
  };

  const handleReserveClick = (roomIndex) => {
    setSelectedRoom(roomIndex);
    setShowDatePicker(true);
  };

  const handleConfirmReservation = async () => {
    if (!token) {
      alert('User is not authenticated. Please log in.');
      return;
    }
  
    if (startDate && selectedRoom !== null) {
      if (!roomAvailability[selectedRoom]) {
        alert('Selected room is unavailable on this date.');
        return;
      }
  
      try {
        const reservationData = {
          roomNumber: selectedRoom + 1,
          date: startDate.toISOString().split('T')[0],
        };
        
        const response = await axios.post(
          'http://localhost:5000/api/user/reserve/room',
          reservationData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        alert(`Room ${selectedRoom + 1} reserved for ${startDate.toLocaleDateString()}`);
        setShowDatePicker(false);
      } catch (error) {
        if (error.response) {
          console.error('Error reserving the room: ', error.response);
          alert(`Error: ${error.response.data.message || 'An error occurred while making the reservation'}`);
        } else {
          console.error('Error reserving the room: ', error.message);
          alert('An error occurred while making the reservation');
        }
      }
    } else {
      alert('Please select a room and a date');
    }
  };
  


  const handleCancelReservation = () => {
    setShowDatePicker(false);
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
                      <h6 style={{ marginBottom: 'auto' }}>Status: {roomAvailability[index] ? 'Available' : 'Occupied'}</h6>
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
                      <h6 style={{ marginBottom: 'auto' }}>Status: {roomAvailability[index] ? 'Available' : 'Occupied'}</h6>
                    </div>
                    <button
                     
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
