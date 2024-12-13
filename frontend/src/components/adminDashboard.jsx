import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUsers, faCalendarAlt, faX, faCheck, faCalendarCheck, faHistory,faUserCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";

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
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate
    const [bookings, setBookings] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [viewModal, setViewModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState(""); // Store the alert message
    const [alertType, setAlertType] = useState(""); 
    
    const generatedDate = new Date();
    const formattedDate = generatedDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    const generatePDFReport = (data, type) => {
        const doc = new jsPDF();
    
        // Add Title
        doc.setFontSize(18);
        doc.text(`${type} Report`, 14, 22);
    
        // Add Date of Generation
        const generatedDate = new Date();
        const formattedDate = generatedDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
        doc.setFontSize(10);
        doc.text(`Generated on: ${formattedDate}`, 14, 30);
    
        // Prepare table headers and data
        const tableColumn = ["Name", "Type", "Date", "Status"];
        const tableRows = data.map((item) => [
            item.userId.username,
            item.reserveType,
            formatDate(item.date),
            item.status.toUpperCase(),
        ]);
    
        // Add Table to PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
        });
    
        // Save PDF
        doc.save(`${type.replace(" ", "_").toLowerCase()}_report.pdf`);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };
    useEffect(() => {
                if (alertMessage) {
                    const timer = setTimeout(() => {
                        setAlertMessage(""); // Clear the alert after 2 seconds
                    }, 2000); // 2 seconds delay
            
                    return () => clearTimeout(timer); // Clean up the timeout if the component unmounts or the alert changes
                }
            }, [alertMessage]);
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
        setIsSubmitting(true);
        try {
            // Send the request to create a new employee
            const response = await fetch("http://localhost:5000/api/admin/employees", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee), // Send username and email only
            });
    
            if (response.ok) {
                // Get the backend response
                const data = await response.json();
                console.log("Backend response:", data);
    
                // Send the email with the generated password
                await fetch('http://localhost:5000/api/admin/employees/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: newEmployee.email,
                        password: data.generatedPassword, // Use the password from the backend
                    }),
                });
    
                // Update the employees list with the new employee data
                setEmployees((prevEmployees) => [...prevEmployees, { ...newEmployee, password: data.generatedPassword }]);
                alert("Employee added and email sent");
                toggleModal();
            } else {
                alert("Failed to add employee");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
        }finally{
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchEmployees()
    }, [])
    useEffect(() => {
        console.log(employees);
    }, [employees])
    
    //Fetching from dbs
    const fetchAllBookings = async () => {
        try{
            const response = await fetch('http://localhost:5000/admin/reserve/res');
            if(!response.ok){
                throw new Error (`Http error! Status: ${response.status}`);
            }
            const data = await response.json();
            setBookings(data);
        }catch (error){
            console.error('Error fetching bookings: ', error.messsage);
        }
    }
    useEffect(() => {
        fetchAllBookings();
    }, []);
    console.log(bookings);
    useEffect(() => {
        console.log('Updated bookings: ', bookings);
    }, [bookings]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

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
                                    cell: (row) => (
                                        <div>
                                            <button
                                                onClick={() => handleViewEmployee(row)}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </div>
                                    ),
                                    button: true, // Makes the column button-style
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
                return (
                    <div style={contentCardStyle}>
                        <h3>Pending Bookings</h3>
                        <div className='text-end'>
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}}/>
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
                case "confirmed":
                    return (
                        <div style={contentCardStyle}>
                            <h3>Confirmed Bookings</h3>
                            <button
                                className="btn btn-danger mb-3"
                                onClick={() =>
                                    generatePDFReport(
                                        bookings.filter((booking) => booking.status === "confirmed"),
                                        "Confirmed Bookings"
                                    )
                                }
                            >
                                Generate Report
                            </button>
                            <div className="text-end">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    style={{ borderRadius: "5px", marginBottom: "5px" }}
                                />
                            </div>
                            <DataTable
                                columns={[
                                    {
                                        name: "Name",
                                        selector: (row) => (row.userId && row.userId.username ? row.userId.username : 'No User Assigned'),
                                        sortable: true,
                                    },
                                    {
                                        name: "Type",
                                        selector: (row) => row.reserveType,
                                        sortable: true,
                                    },
                                    {
                                        name: "Date",
                                        selector: (row) => formatDate(row.date),
                                        sortable: true,
                                    },
                                    {
                                        name: "Status",
                                        cell: () => <div>CONFIRMED</div>,
                                        button: true,
                                    },
                                ]}
                                data={bookings.filter((booking) => booking.status === "confirmed")}
                                pagination
                                highlightOnHover
                                responsive
                            />
                        </div>
                    );
                break;
            case 'history':
                return (
                    <div style={contentCardStyle}>
                        <h3>Booking History</h3>
                        <div className='text-end'>
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}}/>
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
                break;
            default:
                return null;
        }
    };
    
    const handleViewEmployee = async (employee) => {
        console.log("View button clicked for:", employee);
        try {
            const response = await fetch(`http://localhost:5000/api/admin/employees/${employee._id}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched Employee Data:", data);
                setSelectedEmployee(data); // Update state with the fetched employee data
                setViewModal(true); // Open the modal
            } else {
                console.error('Error fetching employee details');
            }
        } catch (error) {
            console.error('Error fetching employee details', error);
        }
    };

    const handleConfirmBooking = async (reservation) => {
        try{
            const response = await fetch(`http://localhost:5000/admin/reserve/confirm/${reservation._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status: 'confirmed'})
            });
            if (response.ok) {
                
                setBookings((prevBookings) => 
                    prevBookings.map((booking) =>
                        booking._id === reservation._id ? { ...booking, status: 'confirmed' } : booking
                    )
                );
                const data = await response.json();
                setAlertMessage("Confirmed Successfully");
                setAlertType("success")
                console.log('Booking confirmed successfully!');
            } else {
                console.error('Error confirming bookings');
                setAlertMessage('Error confirming booking');
                setAlertType('danger'); 
            }
        }catch(error){
            setAlertMessage(`Error confirming reservation: ${error.message}`);
            setAlertType("danger");
        }
    }

    const handleCancelBooking = async (reservation) => {
        console.log("Canceling reservation", reservation);
        try{
            console.log("Sending request to cancel booking with ID:", reservation._id); 
            const response = await fetch(`http://localhost:5000/admin/reserve/cancel/${reservation._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok){
                setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== reservation._id));
                console.log("Booking Cancelled Successfully");
                } else {
                    console.error("Error cancelling booking: ", response.statusText);
                }
                const data = await response.json();
                setAlertMessage("Cancelled Succesfully")
                setAlertType("danger");
            }catch(error ){
                setAlertMessage(`Error canceling reservation: ${error.message}`);
                setAlertType("danger");
            }
        }
    
    
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
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/adminDashboard">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#" onClick={toggleProfile}>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </a>
                                {showProfile && (
                                    <div className="profile-dropdown">
                                        <ul className="list-group">
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
                {/* Bootstrap Alert Message */}
                {alertMessage && (
                    <div className={`alert alert-${alertType} mt-3`} role="alert">
                        {alertMessage}
                    </div>
                )}     
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
                                            <label htmlFor="inputName">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Full Name"
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
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? (
                                                <span>Adding...</span>
                                            ) : (
                                                'Add Employee'
                                            )}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {viewModal && selectedEmployee && (
                    <div className={`modal ${viewModal ? 'fade show' : ''}`} style={{ display: viewModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Employee Details</h5>
                                    <button type="button" className="btn-close" onClick={() => setViewModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Full Name:</strong> {selectedEmployee.username}</p>
                                    <p><strong>Email:</strong> {selectedEmployee.email}</p>
                                    <p><strong>Address:</strong> {selectedEmployee.address}</p>
                                    <p><strong>City:</strong> {selectedEmployee.city}</p>
                                    <p><strong>Country:</strong> {selectedEmployee.country}</p>
                                    <p><strong>Cellphone:</strong> {selectedEmployee.cellphone}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setViewModal(false)}>
                                        Close
                                    </button>
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