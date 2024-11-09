import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../index.css'
import { Link } from 'react-router-dom';


function EmpFoodcatering() {
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
                                <Link className="nav-link" to="/employeeDashboard">Home</Link>
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
                                    <li><Link className="dropdown-item" to="/Emprooms">Rooms</Link></li>
                                    <li><Link className="dropdown-item" to="/Empfunction-hall">Function Hall</Link></li>
                                    <li><Link className="dropdown-item" to="/Empfood-catering">Food Catering</Link></li>
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
      <div className="container">
        <h1 style={{ marginTop: '25px', textAlign: 'center' }}>Food Catering</h1>
        <div className="row">
          <div className="col-sm text-center">
            <h2>Main Course</h2>
            <div className="row">
              {Array.from({ length: 1 }).map((_, index) => (
                <div className="col-md-6" key={index} style={{ marginTop: '15px' }}>
                  <div className="card">
                    <div className="card-body d-flex">
                      <img src="../assets/functionhall.jpg" alt="Room1" style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }} />
                      <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                        <div style={{ textAlign: "start" }}>
                          <h3 style={{ marginBottom: 'auto' }}>Main Course {index + 1}</h3>
                        </div>
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
              ))}
            </div>
            <h2>Side Dish</h2>
            <div className="row">
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="col-md-6" key={index} style={{ marginTop: '15px' }}>
                  <div className="card">
                    <div className="card-body d-flex">
                      <img src="../assets/functionhall.jpg" alt="Room1" style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }} />
                      <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                        <div style={{ textAlign: "start" }}>
                          <h3 style={{ marginBottom: 'auto' }}>Side Dish {index + 1}</h3>
                        </div>
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
              ))}
            </div>
            <h2>Dessert</h2>
                <div className="row">
                {Array.from({ length: 1 }).map((_, index) => (
                    <div className="col-md-6" key={index} style={{ marginTop: '15px' }}>
                    <div className="card">
                        <div className="card-body d-flex">
                        <img src="../assets/functionhall.jpg" alt="Room1" style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }} />
                        <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                            <div style={{ textAlign: "start" }}>
                            <h3 style={{ marginBottom: 'auto' }}>Dessert {index + 1}</h3>
                            </div>
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
                ))}
                </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default EmpFoodcatering;
