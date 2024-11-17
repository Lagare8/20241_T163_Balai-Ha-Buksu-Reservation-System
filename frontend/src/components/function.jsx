import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Function = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isTokenAvailable, setIsTokenAvailable] = useState(false);

  // Ensure token is fetched from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("Retrieved token from localStorage:", storedToken); // Debugging token retrieval
    if (storedToken) {
      // Set token in context and log for debugging
      setToken(storedToken);
      console.log("Token set in context:", storedToken);
    } else {
      console.log("No token found, redirecting to login");
      navigate('/'); // Redirect to login if no token
    }
  }, [navigate, setToken]);

  useEffect(() => {
    // Wait for token to be updated in context
    if (token) {
      setIsTokenAvailable(true); // Token is now available
    }
  }, [token]);

  useEffect(() => {
    // Once token is available or loading is complete, stop loading
    if (isTokenAvailable) {
      setLoading(false);
    }
  }, [isTokenAvailable]);

  // If loading or token is not available, show loading message
  if (loading || !isTokenAvailable) {
    return <div>Loading...</div>;
  }

  const handleReserveClick = () => {
    navigate('/functionCalendar'); // Navigate to functionCalendar route
  };

  return (
    <div style={{ backgroundColor: 'gray', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
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
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="form-inline my-2 my-lg-0 ml-auto">
            <div className="d-flex align-items-center">
              <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/userDashboard">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  View Offers
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/rooms">Rooms</Link></li>
                  <li><Link className="dropdown-item" to="/function">Function Hall</Link></li>
                  <li><Link className="dropdown-item" to="/catering">Food Catering</Link></li>
                </ul>
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
        <h1 style={{ marginTop: '25px', textAlign: 'center' }}>Function Hall</h1>
        <div className="row">
          <div className="col-sm text-center">
            {Array.from({ length: 1 }).map((_, index) => (
              <div className="card" style={{ marginTop: '15px' }} key={index}>
                <div className="card-body d-flex">
                  <img src="../assets/functionhall.jpg" alt="Room1" style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }} />
                  <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'start' }}>
                      <h3 style={{ marginBottom: 'auto' }}>Function Hall {index + 1}</h3>
                    </div>
                    <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }} onClick={handleReserveClick}>
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

export default Function;