import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUsers, faCalendarAlt, faX, faCheck, faCalendarCheck, faHistory,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
const EmployeeBookings = () => {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [bookings, setBookings] = useState([]);
    const toggleModal = () => setShowModal(!showModal);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate
    const [alertMessage, setAlertMessage] = useState(""); // Store the alert message
    const [alertType, setAlertType] = useState(""); 
    const [searchQuery, setSearchQuery] = useState('');

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    // fetch from dbs
    const fetchAllBookings = async () => {
        try {
            const response = await fetch('http://localhost:5000/employee/reservation/bookings');  // Adjusted path
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            setBookings(data);  // Assuming you are updating state with fetched data
        } catch (error) {
            console.error('Error fetching bookings:', error.message);
            // Optionally, you could set an error state here to display in the UI
        }
    };
    
    // In your `useEffect`, you can call this function:
    useEffect(() => {
        fetchAllBookings();
    }, []);
    useEffect(() => {
        console.log('Updated bookings:', bookings);
    }, [bookings]);
    useEffect(() => {
            if (alertMessage) {
                const timer = setTimeout(() => {
                    setAlertMessage(""); // Clear the alert after 2 seconds
                }, 2000); // 2 seconds delay
        
                return () => clearTimeout(timer); // Clean up the timeout if the component unmounts or the alert changes
            }
        }, [alertMessage]);
        const handleSearchChange = (event) => {
            setSearchQuery(event.target.value);
        };
        
        const filteredBookings = (status) => {
            return bookings
                .filter((booking) => booking.status === status)
                .filter((booking) => {
                    const search = searchQuery.toLowerCase();
                    return (
                        booking.userId.username.toLowerCase().includes(search) ||
                        booking.reserveType.toLowerCase().includes(search) ||
                        formatDate(booking.date).toLowerCase().includes(search)
                    );
                });
        };
    const renderContent = () => {
        switch (activeTab) {
            case 'bookings':
                return (
                    <div style={contentCardStyle}>
                        <h3>Pending Bookings</h3>
                        <div className='text-end'>
                        <input
                            type='text'
                            placeholder='Search...'
                            value={searchQuery} // Bind input value to state
                            onChange={handleSearchChange} // Handle input changes
                            style={{ borderRadius: '5px', marginBottom: '5px' }}
                        />
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
                            //data={bookings.filter((booking) => booking.status === 'pending')}
                            data={filteredBookings('pending')}
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
                        <input
                            type='text'
                            placeholder='Search...'
                            value={searchQuery} // Bind input value to state
                            onChange={handleSearchChange} // Handle input changes
                            style={{ borderRadius: '5px', marginBottom: '5px' }}
                        />
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
                            //data={bookings.filter(booking => booking.status === 'confirmed')}
                            data={filteredBookings('confirmed')}
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
    const handleConfirmBooking = async (reservation) => {
        try {
            const response = await fetch(`http://localhost:5000/api/employee/reserve/confirm/${reservation._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'confirmed' })
            });
    
            if (response.ok) {
                // Update the local state to reflect the confirmation
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking._id === reservation._id
                            ? { ...booking, status: 'confirmed' }
                            : booking
                    )
                );
                
                const data = await response.json();
                setAlertMessage(data.message);
                setAlertType("success");
            } else {
                console.error("Error confirming booking");
            }
        } catch (error) {
            setAlertMessage(`Error confirming reservation: ${error.message}`);
            setAlertType("danger");
        }
    };

    const handleCancelBooking = async (reservation) => {
        console.log("Canceling reservation", reservation);

        try{
            console.log("Sending request to cancel booking with ID:", reservation._id); 
            const response = await fetch(`http://localhost:5000/api/employee/reserve/cancel/${reservation._id}`, {
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
            setAlertMessage(data.message);
            setAlertType("success");
            }catch(error ){
                setAlertMessage(`Error canceling reservation: ${error.message}`);
                setAlertType("danger");
            }
        }
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
                                <Link className="nav-link" to="/employeeDashboard">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/Emprooms">Rooms</Link></li>
                                    <li><Link className="dropdown-item" to="/Empfunction-hall">Function Hall</Link></li>
                                    <li><Link className="dropdown-item" to="/Empfood-catering">Food Catering</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#" onClick={toggleProfile}>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </a>
                                {showProfile && (
                                    <div className="profile-dropdown">
                                        <ul className="list-group">
                                            <Link className="list-group-item" to="/employeeProfile">Profile Info</Link>
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

export default EmployeeBookings;