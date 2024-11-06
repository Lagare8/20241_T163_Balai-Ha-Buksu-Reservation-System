import React from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function EmpDashboard() {
    return (
        <div>
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
                                     <a className="nav-link"  href="#">Home</a>
                              </li>
                            {/* Dropdown Menu */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-white"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"   
                                >
                                    Update Offers
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Rooms</a></li>
                                    <li><a className="dropdown-item" href="#">Function Hall</a></li>
                                    <li><a className="dropdown-item" href="#">Food Catering</a></li>
                                </ul>
                            </li>
                            <li>
                                     <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#"><FontAwesomeIcon icon={faUserCircle} /></a>
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
                    height: '100vh',
                    textAlign: 'center',
                    backgroundImage: 'url("../../public/assets/background.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    color: 'white',
                }}
            >
                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '50px',
                    borderRadius: '10px'
                }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Welcome to Balai ha BukSU</h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Where Comfort Meets Culture</p>
                    <a href="#" className="btn btn-lg" style={{ backgroundColor: '#007bff', color: 'white' }}>
                        View Bookings <FontAwesomeIcon icon={faCalendarDays} style={{ marginLeft: '10px' }} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default EmpDashboard;
