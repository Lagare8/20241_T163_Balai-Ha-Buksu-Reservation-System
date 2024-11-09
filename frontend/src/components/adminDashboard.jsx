import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUsers, faCalendarAlt, faCalendarCheck, faHistory,faUserCircle } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try{
            const response = await fetch("http://localhost:5000/api/admin/employees");
            if(!response.ok){
                console.error("No internet connection");
            }
            const data = await response.json()
            console.log("Fetched employees data:", data);
            setEmployees(data);
        }catch(error){
            console.error("Error fetching employees", error);
        }
    }
    useEffect(() => {
        fetchEmployees()
    }, [])
    useEffect(() => {
        console.log(employees);
    }, [employees])
    
    const toggleModal = () => setShowModal(!showModal);

    const renderContent = () => {
        switch (activeTab) {
            case 'employees':
                return (
                    <div style={contentCardStyle}>
                        <h2>Employees</h2>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                            <button type="button" className="btn btn-primary" onClick={toggleModal}>Add Employee</button>
                        </div>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(employees) ? employees.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{employee.username}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.role}</td>
                                    </tr>
                                )) : <tr><td colSpan="3">No employees found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                );
            case 'bookings':
                return (
                    <div style={contentCardStyle}>
                        <h2>Pending Bookings</h2>
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
                                    <td>
                                        <button type='button' className='btn btn-success' style={{ margin: '5px' }}>Confirm</button>
                                        <button type="button" className='btn btn-danger'>Cancel</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case 'confirmed':
                return (
                    <div style={contentCardStyle}>
                        <h2>Booking has been confirmed! Send details to the customer</h2>
                        <button type="button" className="btn btn-primary mt-3">Send to Email</button>
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

            {/* Main Content */}
            <div style={mainContainerStyle}>
                <div style={buttonContainerStyle}>
                    <button onClick={() => setActiveTab('employees')} style={{ ...tabButtonStyle, backgroundColor: '#3498db' }}>
                        Employees <FontAwesomeIcon icon={faUsers} />
                    </button>
                    <button onClick={() => setActiveTab('bookings')} style={{ ...tabButtonStyle, backgroundColor: '#f1c40f' }}>
                        Bookings <FontAwesomeIcon icon={faCalendarAlt} />
                    </button>
                    <button onClick={() => setActiveTab('confirmed')} style={{ ...tabButtonStyle, backgroundColor: '#16a085' }}>
                        Confirmed Booking <FontAwesomeIcon icon={faCalendarCheck} />
                    </button>
                    <button onClick={() => setActiveTab('history')} style={{ ...tabButtonStyle, backgroundColor: '#e74c3c' }}>
                        History <FontAwesomeIcon icon={faHistory} />
                    </button>
                </div>

                <div style={contentContainerStyle}>
                    {renderContent()}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Employee</h5>
                                    <button type="button" className="close" onClick={toggleModal}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className='form-group'>
                                            <label htmlFor="inputName">Firstname</label>
                                            <input type="text" className='form-control' id="name" placeholder='Name' />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="area">Area</label>
                                            <input type='text' className='form-control' id="area" placeholder='Area' />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styles
const navbarStyle = {
    backgroundColor: '#1b1f3b',
    color: '#fff',
};

const mainContainerStyle = {
    backgroundColor: '#2d2f3b',
    padding: '20px',
    minHeight: '100vh',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
};

const tabButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    flex: 1,
    margin: '0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
};

const contentContainerStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    minHeight: '300px',
};

const contentCardStyle = {
    backgroundColor: '#ececec',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const profileIconStyle = {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
};

export default AdminDashboard;
