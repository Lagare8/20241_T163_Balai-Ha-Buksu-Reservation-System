import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUsers, faCalendarAlt, faCalendarCheck, faHistory,faUserCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';

const AdminDashboard = () => {
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
                    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Employee</h5>
                                    <button type="button" className="close" onClick={toggleModal}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="inputName">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Username"
                                                name="username"
                                                value={newEmployee.username}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="area"
                                                placeholder="Email"
                                                name="email"
                                                value={newEmployee.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="area"
                                                placeholder="Password"
                                                name="password"
                                                value={newEmployee.password}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary">Add Employee</button>
                                        </div>
                                    </form>
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
