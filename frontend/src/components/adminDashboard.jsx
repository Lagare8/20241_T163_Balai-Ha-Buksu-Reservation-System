import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1b1f3b' }}>
        <div className="container">
          <a className="navbar-brand" href="#">
          <img src="../assets/Shield_logo_of_Bukidnon_State_University.png" alt="logo" style={{ width: '50px', height: '50px', marginLeft: '-80px'}} />
          <img src="../assets/lgo.png" alt="logo" style={{ width: '100px', height: '100px' }} />
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
          <input
            type="text"
            placeholder="Search..."
            className="form-control rounded-pill mx-3"
            style={{ maxWidth: '200px' }}
          />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" style={{marginLeft: '-730px'}}>Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft: '-650px'}}>
                  Update Offers
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Rooms</a></li>
                  <li><a className="dropdown-item" href="#">Function Hall</a></li>
                  <li><a className="dropdown-item" href="#">Food Gathering</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><FontAwesomeIcon icon={faUserCircle} /></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content position-relative">
        {/* Centered Text and Button */}
        <div className="content-overlay" style={{
          position: 'absolute',
          top: '50%',
          left: '40%',
          transform: 'translate(-50px, 200px)',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Welcome to Balai ha BukSU</h2>
          <p style={{ fontSize: '1.2rem' }}>Where Comfort Meets Culture</p>
          <button className="btn btn-primary" style={{
            backgroundColor: '#007bff',
            borderRadius: '30px',
            fontWeight: 'bold',
            padding: '10px 50px',
            fontSize: '1rem',
            margin:'20px',
            marginLeft:'200px'
          }}>
            View Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
