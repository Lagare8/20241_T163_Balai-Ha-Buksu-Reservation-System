import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../index.css'

function EmpFunctionHall() {
    return (
        <div style={{backgroundColor: 'gray', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight:'100vh'}}>
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
            <div className="container text-center">
            <h1 className="mt-5">Function Hall</h1>
            <div className="card mx-auto mt-5" style={{ width: '18rem' }}>
        <img src="../assets/function.jpg" className="card-img-top" alt="Function Hall Image" />
        <div className="card-body">
            <h5 className="card-title">Function Hall</h5>
            <div className="d-flex justify-content-between">
                <button className="btn btn-warning">
                    <i className="fas fa-edit"></i> Update
                </button>
                <button className="btn btn-danger">
                    <i className="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    </div>
        </div>
        </div>
    );
}

export default EmpFunctionHall;
