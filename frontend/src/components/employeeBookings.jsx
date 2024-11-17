import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import { faBell, faCalendarAlt, faX, faCheck, faCalendarCheck, faHistory, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const EmployeeBookings = () => {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [bookings, setBookings] = useState([]); // State to store bookings
    const toggleModal = () => setShowModal(!showModal);
=======
import { faBell, faUsers, faCalendarAlt, faCalendarCheck, faHistory,faUserCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';

function EmpDashboard() {
>>>>>>> 096020cdb448bddc3f54b1119bd05804e86aa4d1
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

<<<<<<< HEAD
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    // Fetch data from database
    const fetchAllBookings = async () => {
        try {
            const response = await fetch('http://localhost:5000/employee/reservation/bookings');  // Adjusted API path
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            setBookings(data);  // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching bookings:', error.message);
        }
    };

    // Fetch bookings when the component mounts
    useEffect(() => {
        fetchAllBookings();
    }, []); // Empty dependency array ensures the fetch is called only once when the component mounts

    useEffect(() => {
        console.log('Updated bookings:', bookings);
    }, [bookings]); // Log the bookings every time they update
=======
    
    const [activeTab, setActiveTab] = useState('confirmed');
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        username:'',
        email: '',
        password: '',
        role: 'employee',
    });

    // fetching employee
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
    //add employee at adminDashboard
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");
        try{
            const response = await fetch("http://localhost:5000/api/admin/employees", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });
            if(response.ok){
                const errorData = await response.json();
                console.error("Error adding employee", errorData);
                return;
            }
            const addedEmployee = await response.json();
            console.log("Added Employee", addedEmployee);
            setEmployees((prevEmployees) => [ ...prevEmployees, addedEmployee])
            setShowModal(false);
        } catch (error){
            console.error("Error adding employee", error);
        }
    };
    useEffect(() => {
        fetchEmployees()
    }, [])
    useEffect(() => {
        console.log(employees);
    }, [employees])
    
    const toggleModal = () => setShowModal(!showModal);
>>>>>>> 096020cdb448bddc3f54b1119bd05804e86aa4d1

    const renderContent = () => {
        switch (activeTab) {
            case 'employees':
                return (
                    <div style={contentCardStyle}>
                        <h3>Employees</h3>
                        <div className="d-flex justify-content-end mb-3">
                        <button
                            onClick={toggleModal}
                            className="btn btn-success"
                        >
                            Add Employee
                        </button>
                        </div>
                        <div className='text-end'>
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}}/>
                        </div>
                        <DataTable
                            columns={[
                                {
                                    name: 'Name',
                                    selector: row => row.username,
                                    sortable: true,
                                },
                                {
                                    name: 'Email',
                                    selector: row => row.email,
                                    sortable: true,
                                },
                                {
                                    name: 'Action',
                                    cell: row => (
                                        <div>
                                            <button
                                                onClick={() => handleViewEmployee(row)}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </div>
                                    ),
                                    button: true,  // Makes the column button-style
                                }
                            ]}
                            data={employees}
                            pagination
                            highlightOnHover
                            responsive
                        />
                    </div>
                );
            case 'bookings':
<<<<<<< HEAD
                return (
                    <div style={contentCardStyle}>
                        <h3>Pending Bookings</h3>
                        <div className='text-end'>
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}} />
                        </div>
                        <DataTable
                            columns={[
                                {
                                    name: 'Name',
                                    selector: row => row.userId.username,
                                    sortable: true,
                                },
                                {
                                    name: 'Type',
                                    selector: row => row.reserveType,
                                    sortable: true,
                                },
                                {
                                    name: 'Date',
                                    selector: row => formatDate(row.date),
                                    sortable: true,
                                },
                                {
                                    name: 'Action',
                                    cell: row => (
                                        <div>
                                            <button
                                                onClick={() => {
                                                    if(window.confirm("Are you sure want to confirm this booking?")){
                                                        handleConfirmBooking(row);
                                                    }
                                                }}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                <FontAwesomeIcon icon={faCheck} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if(window.confirm("Are you sure want to cancel this booking?")){
                                                        handleCancelBooking(row);
                                                    }
                                                }}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                <FontAwesomeIcon icon={faX} />
                                            </button>
                                        </div>
                                    ),
                                    button: true,  // Makes the column button-style
                                }
                            ]}
                            data={bookings.filter((booking) => booking.status === 'pending')}
                            pagination
                            highlightOnHover
                            responsive
                        />
                    </div>
                );
            case 'confirmed':
                return (
                    <div style={contentCardStyle}>
                        <h3>Confirmed Bookings</h3>
                        <div className='text-end'>
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}} />
                        </div>
                        <DataTable
                            columns={[
                                {
                                    name: 'Name',
                                    selector: row => row.userId.username,
                                    sortable: true,
                                },
                                {
                                    name: 'Type',
                                    selector: row => row.reserveType,
                                    sortable: true,
                                },
                                {
                                    name: 'Date',
                                    selector: row => formatDate(row.date),
                                    sortable: true,
                                },
                                {
                                    name: 'Status',
                                    cell: row => (
                                        <div>
                                            CONFIRMED
                                        </div>
                                    ),
                                    button: true,  // Makes the column button-style
                                }
                            ]}
                            data={bookings.filter(booking => booking.status === 'confirmed')}
                            pagination
                            highlightOnHover
                            responsive
                        />
                    </div>
                );
            case 'history':
                return (
                    <div style={contentCardStyle}>
                        <h3>Booking History</h3>
                        <div className='text-end'>
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}} />
                        </div>
                        <DataTable
                            columns={[
                                {
                                    name: 'Name',
                                    selector: row => row.userId.username,
                                    sortable: true,
                                },
                                {
                                    name: 'Type',
                                    selector: row => row.reserveType,
                                    sortable: true,
                                },
                                {
                                    name: 'Date',
                                    selector: row => formatDate(row.date),
                                    sortable: true,
                                },
                                {
                                    name: 'Status',
                                    cell: (row) => (
                                        <div>
                                            {row.status === 'confirmed' ? 'CONFIRMED' : 'CANCELED'}
                                        </div>
                                    ),
                                    button: true,
                                }
                            ]}
                            data={bookings.filter(booking => booking.status === 'confirmed' || booking.status === 'canceled')}
                            pagination
                            highlightOnHover
                            responsive
                        />
                    </div>
                );
=======
                // Existing code for 'bookings' tab
                break;
            case 'confirmed':
                // Existing code for 'confirmed' tab
                break;
            case 'history':
                // Existing code for 'history' tab
                break;
>>>>>>> 096020cdb448bddc3f54b1119bd05804e86aa4d1
            default:
                return null;
        }
    };
    
    // Edit employee handler
    const handleViewEmployee = (employee) => {
        // Set the employee details in the modal or a dedicated area for viewing
        
    };
    
    // Delete employee handler
    const handleDeleteEmployee = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/employees/${employeeId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== employeeId));
            } else {
                console.error('Error deleting employee');
            }
        } catch (error) {
            console.error('Error deleting employee', error);
        }
    };
    

    const handleConfirmBooking = async (reservation) => {
        try {
            const response = await fetch(`http://localhost:5000/employee/reserve/confirm/${reservation._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'confirmed' })
            });
            if (!response.ok) {
                setBookings((prevBookings) => {
                    const updatedBookings = prevBookings.map((booking) =>
                        booking._id === reservation._id ? { ...booking, status: 'confirmed' } : booking
                    );
                    return updatedBookings;
                });
                console.log('Booking confirmed successfully!');
            } else {
                console.error("Error confirming bookings");
            }
        } catch (error) {
            console.error("Error confirming bookings", error);
        }
    };

    const handleCancelBooking = async (reservation) => {
        console.log("Canceling reservation", reservation);
        try {
            console.log("Sending request to cancel booking with ID:", reservation._id);
            const response = await fetch(`http://localhost:5000/employee/reserve/cancel/${reservation._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== reservation._id));
                console.log("Booking Cancelled Successfully");
            } else {
                console.error("Error cancelling booking: ", response.statusText);
            }
        } catch (error) {
            console.error("Error Canceling bookings", error);
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
                            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
                                <FontAwesomeIcon icon={faBell} />
                            </button>
                            <button className="btn btn-outline-light my-2 my-sm-0 ms-2" onClick={toggleProfile}>
                                <FontAwesomeIcon icon={faUserCircle} />
                            </button>
                        </div>
                    </form>
                </div>
            </nav>
<<<<<<< HEAD
            <div className="container mt-4">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bookings')}
                        >
                            Pending Bookings
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'confirmed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('confirmed')}
                        >
                            Confirmed Bookings
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            Booking History
                        </button>
                    </li>
                </ul>
                {renderContent()}
=======

            {/* Main Content */}
            <div style={mainContainerStyle}>
                <div style={buttonContainerStyle}>
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
>>>>>>> 096020cdb448bddc3f54b1119bd05804e86aa4d1
            </div>
        </div>
    );
}

// Styles
const navbarStyle = {
    backgroundColor: '#1b1f3b',
    color: '#fff',
};

<<<<<<< HEAD
const contentCardStyle = {
    background: '#fff',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

export default EmployeeBookings;
=======
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

export default EmpDashboard;
>>>>>>> 096020cdb448bddc3f54b1119bd05804e86aa4d1
