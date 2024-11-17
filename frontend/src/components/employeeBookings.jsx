import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUsers, faCalendarAlt, faCalendarCheck, faHistory,faUserCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';

function EmpDashboard() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    
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
                // Existing code for 'bookings' tab
                break;
            case 'confirmed':
                // Existing code for 'confirmed' tab
                break;
            case 'history':
                // Existing code for 'history' tab
                break;
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
            </div>
        </div>
    );
}

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

export default EmpDashboard;
