import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';


  const UserDashboard = () => {
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
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1b1f3b' }}>
          <div className="container">
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
            <input type="text"  placeholder="Search...." style={{ borderRadius: '50px', padding: '10px', margin: '5px' }}></input>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Home</a>
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
                                      <li><Link className="dropdown-item" to="/roomCalendar">Rooms</Link></li>
                                      <li><Link className="dropdown-item" to="/functionCalendar">Function Hall</Link></li>
                                      <li><Link className="dropdown-item" to="/catering">Food Catering</Link></li>
                                  </ul>
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
          <div
          className="main-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '300px',
            textAlign: 'center',
            padding: '100px 20px',
            filter: 'brightnes'
          }}
          >
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'black' }}>TESTWelcome to Balai ha BukSU</h1>
            <p style={{ fontSize: '1.5rem', color: 'black', marginBottom: '0' }}>Where Comfort Meets Culture</p>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%', marginTop: '10px', marginRight: '1050px' }}>
            <a><Link className="btn btn-lg" to="/userBookings" style={{ backgroundColor: '#007bff', color: 'black' }}>Book Now< FontAwesomeIcon icon={faCalendarDays} style={{marginLeft: '20px'}} /></Link></a>
          </div>
        </div>
      </div>

    );
  };

  export default UserDashboard;