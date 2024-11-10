import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeBookings = () => {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const toggleModal = () => setShowModal(!showModal);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };  // <-- Fixed the missing closing bracket

    const renderContent = () => {
        switch (activeTab) {
            case 'bookings':
                return (
                    <div style={contentCardStyle}>
                        <h2>Pending Bookings</h2>
                        <div style={contentCardStyle}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Booking</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Maria Dela Cruz</td>
                                        <td>Room 1</td>
                                        <td>October 20, 2025</td>
                                        <td style={statusCellStyle}>
                                            <button type='button' className='btn btn-success' style={{ margin: '5px' }}>Confirm</button>
                                            <button type="button" className='btn btn-danger'>Cancel</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'confirmed':
                return (
                    <div style={contentCardStyle}>
                        <h2>Confirmed Bookings</h2>
                        <div style={contentCardStyle}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Booking</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Maria Dela Cruz</td>
                                        <td>Room 1</td>
                                        <td>October 20, 2025</td>
                                        <td style={statusCellStyle}>
                                            <span style={confirmedStatusStyle}>Confirmed</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'history':
                return (
                    <div style={contentCardStyle}>
                        <h2>History</h2>
                        <p>History of bookings and actions goes here.</p>
                    </div>
                );
            default:
                return null;
        }
    };

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

            <div style={mainCardStyle}>
                <div style={menuStyle}>
                    <button onClick={() => setActiveTab('bookings')} style={{ ...buttonStyle, backgroundColor: '#f1c40f' }}>Bookings</button>
                    <button onClick={() => setActiveTab('confirmed')} style={{ ...buttonStyle, backgroundColor: '#16a085' }}>Confirmed Booking</button>
                    <button onClick={() => setActiveTab('history')} style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}>History</button>
                </div>

                <section style={contentContainerStyle}>
                    {renderContent()}
                </section>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Employee</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={toggleModal} // Close modal when clicked
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Modal body content */}
                                <form>
                                    <div className='form-row'>
                                        <div className='form-group co'>
                                            <label htmlFor="inputName">Firstname</label>
                                            <input type="text" className='form-control' id="name" placeholder='Name'/>
                                        </div>
                                        <div className='form-group col'>
                                            <label htmlFor="area">Area</label>
                                            <input type='text' className='form-control' id="area" placeholder='Area'/>
                                        </div>
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
                                <button type="button" className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mainCardStyle = {
    width: '100vw',  // Ensures the card spans the full width of the viewport
    height: '100vh',  // Ensures the card spans the full height of the viewport
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    overflowX: 'hidden',  // Prevents horizontal overflow if any content is too wide
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Ensures the content is spread within the full height
};

const menuStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
};

const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    flex: 1,
    margin: '0 5px',
};

const contentContainerStyle = {
    paddingTop: '20px',
    flex: 1,  // Ensures content takes available space
    overflowY: 'auto',  // Prevents content from overflowing vertically
};

const contentCardStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const statusCellStyle = {
    display: 'flex',
    alignItems: 'center',
};

const confirmedStatusStyle = {
    color: '#16a085',
    marginRight: '10px',
};

const cancelButtonStyle = {
    padding: '5px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default EmployeeBookings;
