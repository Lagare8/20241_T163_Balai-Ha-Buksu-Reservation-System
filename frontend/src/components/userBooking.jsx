import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUsers, faCalendarAlt, faCalendarCheck, faHistory,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const UserBookings = () => {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const toggleModal = () => setShowModal(!showModal);
    const navigate = useNavigate();

    const handleAddEvent = () => {
        navigate('/userReserve')
    }
    const renderContent = () => {
        switch (activeTab) {
            case 'bookings':
                return (
                    <div style={contentCardStyle}>
                        <h2>Bookings</h2>
                        <div style={contentCardStyle}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-primary" onClick={handleAddEvent}>Reserve</button>
                            </div>
                            <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Reservation</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button type="button" className='btn btn-danger'>Cancel</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                );
            case 'bookingss':
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
                                        <button type='button' className='btn btn-success' style={{margin:'5px'}}>Confirm</button>
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
            <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyle}>
                    <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                    <img src="../assets/Shield_logo_of_Bukidnon_State_University.png" alt="Logo" style={{ height: '80px', width: '80px'}} />
                    </a>
                    <a className="navbar-brand" href="#">
                    <img src="../assets/lgo.png" alt="Logo" style={{ height: '100px', width: '100px'}} />
                    </a>
                        <div className="navbar-brand">Admin</div>
                        <input type="text" placeholder="Search..." className="form-control rounded-pill mx-3" style={{ maxWidth: '200px' }} />
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item me-3">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item me-3">
                                <a className="nav-link" href="#">View Offers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a>
                            </li>
                            <li className="nav-item">
                                    <a className="nav-link text-white" href="#"><FontAwesomeIcon icon={faUserCircle} /></a>
                            </li>
                        </ul>
                    </div>
                </nav>

            <div style={mainCardStyle}>
                <div style={menuStyle}>
                    <button onClick={() => setActiveTab('bookings')} style={{ ...buttonStyle, backgroundColor: '#1abc9c' }}>Bookings</button>
                    <button onClick={() => setActiveTab('bookingss')} style={{ ...buttonStyle, backgroundColor: '#f1c40f' }}>Bookingss</button>
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
                                            <label for="inputName">Firstname</label>
                                            <input type="text" className='form-control' id="name" placeholder='Name'/>
                                        </div>
                                        <div className='form-group col'>
                                            <label for="area">Area</label>
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
const navbarStyle = {
    backgroundColor: '#1b1f3b',
    color: '#fff',
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

export default UserBookings;