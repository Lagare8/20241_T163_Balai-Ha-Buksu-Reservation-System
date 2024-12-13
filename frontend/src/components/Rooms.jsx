import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { token} = useAuth();
  const navigate = useNavigate();
  const { setToken} = useAuth();
  const [ notifications, setNotifications] = useState([]);
  const [ showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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

  const toggleProfile = () => {
    setShowProfile(!showProfile);
};

  const handleReserveClick = (roomIndex) => {
    console.log("Reserve button clicked for Room", roomIndex + 1); // Debugging
    setSelectedRoom(roomIndex);
    navigate('/roomCalendar', { state: { roomNumber: roomIndex + 1 } });
  };
  const fetchNotifications = async () => {
    try {
        const token = localStorage.getItem('token'); // Make sure you have a valid token
        const response = await axios.get('http://localhost:5000/api/user/notifications', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setNotifications(response.data); // Assuming you're using React's state management
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
};

useEffect(() => {
    fetchNotifications();
}, []);

const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
}

const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
}
  return (
    <div
                style={{
                    backgroundColor: "gray",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                }}
            >
                <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1b1f3b" }}>
                    <div className="container">
                        <a className="navbar-brand d-flex align-items-center" href="#">
                            <img
                                src="/assets/Shield_logo_of_Bukidnon_State_University.png"
                                alt="BUKSU Logo"
                                style={{ height: "50px", marginRight: "10px" }}
                            />
                            <img
                                src="/assets/lgo.png"
                                alt="BUKSU Hotel Logo"
                                style={{ height: "80px", width: "100px" }}
                            />
                        </a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/userDashboard">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle text-white"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        View Offers
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/Rooms">Rooms</Link></li>
                                        <li><Link className="dropdown-item" to="/functionCalendar">Function Hall</Link></li>
                                        <li><Link className="dropdown-item" to="/catering">Food Catering</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                        <a className="nav-link text-white" href="#" onClick={toggleProfile}>
                                        <FontAwesomeIcon icon={faUserCircle} />
                                        </a>
                                        {showProfile && (
                                        <div className="profile-dropdown">
                                        <ul className="list-group">
                                        <li className="list-group-item">Profile Info</li>
                                        <li className="list-group-item">Settings</li>
                                        <li>
                                        <Link className="list-group-item" to="/">Logout</Link>
                                        </li>
                                        </ul>
                                        </div>
                                      )}
                                    </li>
                                <li className="nav-item">
                                <FontAwesomeIcon 
                                    icon={faBell} 
                                    size="lg" 
                                    style={{color:"white", cursor: "pointer", position: "relative"}} 
                                    onClick={toggleNotifications}
                                />
                                {notifications.length > 0 && (
                                    <span 
                                        style={{
                                            top: "-5px", 
                                            right: "-10px", 
                                            backgroundColor: "red", 
                                            color: "white", 
                                            borderRadius: "50%",
                                            padding: "2px 6px", 
                                            fontSize: "12px",
                                            zIndex: 10
                                        }}
                                    >
                                        {notifications.filter(notification => notification?.status === 'unread').length}
                                    </span>
                                )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {showNotifications && (
                <div
                    style={{
                        position: "absolute",
                        top: "70px",
                        right: "20px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        borderRadius: "5px",
                        width: "300px",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            padding: "10px",
                            borderBottom: "1px solid #ddd",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Notifications
                    </div>
                    <div
                        style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                        }}
                    >
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => {
                            if (!notification || !notification.message) {
                                console.error("Invalid notification:", notification);
                                return null; // Skip rendering this item
                            }
                            return (
                                <div
                                    key={index}
                                    style={{
                                        padding: "10px",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    {notification.message} - {notification.status || "Unread"}
                                </div>
                            );
                        })
                    ) : (
                        <div
                            style={{
                                padding: "10px",
                                textAlign: "center",
                                color: "#999",
                            }}
                        >
                            No notifications
                        </div>
                    )}
                    </div>
                    <div
                        style={{
                            padding: "10px",
                            textAlign: "center",
                        }}
                    >
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={clearNotifications}
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            )}
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
