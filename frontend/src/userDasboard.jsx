import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';



const UserDashboard = () => {

  return (
    <div>
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
          <a href="#" className="btn btn-lg" style={{ backgroundColor: '#007bff', color: 'black' }} >
            Book Now< FontAwesomeIcon icon={faCalendarDays} style={{marginLeft: '20px'}} />
          </a>
        </div>
      </div>
    </div>

  );
};

export default UserDashboard;