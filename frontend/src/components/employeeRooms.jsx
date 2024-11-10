import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

function EmpRoom() {
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState('Available');
    const toggleModal = () => setShowModal(!showModal);
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };


    return (
        <div style={{ backgroundColor: 'gray', minHeight: '100vh' }}>
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
                                <a className="nav-link" href="#" onClick={toggleNotifications}>
                                    <FontAwesomeIcon icon={faBell} />
                                </a>
                                {showNotifications && (
                                    <div className="notification-dropdown">
                                        <ul className="list-group">
                                            <li className="list-group-item">Notification 1</li>
                                            <li className="list-group-item">Notification 2</li>
                                            <li className="list-group-item">Notification 3</li>
                                        </ul>
                                    </div>
                                )}
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
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container text-center">
                <h1 className="mt-5">Rooms</h1>
                <div className="row mt-5">
                    {/* Repeat the structure for each room */}
                    {[...Array(6)].map((_, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card">
                                <img src="../assets/function.jpg" className="card-img-top" alt={`Room ${index + 1}`} />
                                <div className="card-body">
                                    <h5 className="card-title">Room {index + 1}</h5>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-warning" onClick={toggleModal}>
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
            </div>

            {/* Modal for updating status */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content rounded-3 shadow-lg">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Update Room Status</h5>
                                <button
                                    type="button"
                                    className="close text-white"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={toggleModal}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="statusSelect" className="font-weight-bold">Select Status</label>
                                        <select
                                            className="form-control form-control-lg"
                                            id="statusSelect"
                                            value={status}
                                            onChange={handleStatusChange}
                                        >
                                            <option value="Available">Available</option>
                                            <option value="Occupied">Occupied</option>
                                            <option value="Not Ready">Not Ready</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={toggleModal} // Close modal
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={toggleModal} // Save changes and close modal
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmpRoom;
