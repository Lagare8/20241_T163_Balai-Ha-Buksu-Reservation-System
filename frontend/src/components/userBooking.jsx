import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUsers, faCalendarAlt, faX, faCheck, faCalendarCheck, faHistory,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
const UserBookings = () => {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [bookings, setBookings] = useState([]);
    const toggleModal = () => setShowModal(!showModal);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [cancelBookingId, setCancelBookingId] = useState(null); // Store the booking to cancel
    const [alertMessage, setAlertMessage] = useState(""); // Store the alert message
    const [alertType, setAlertType] = useState(""); 
    const navigate = useNavigate(); // Initialize useNavigate
    const [search, setSearch] = useState("");

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
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            
            console.log("Token from localStorage:", token);
            console.log("UserId from localStorage:", userId);

            if (!token || !userId) {
                console.error("Missing token or userId");
                return;
            }
    
            const response = await fetch(`http://localhost:5000/api/user/booking-history/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
    
            const data = await response.json();
            console.log("Fetched bookings:", data);
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error.message);
        }
    };
    
    // In your `useEffect`, you can call this function:
    useEffect(() => {
        fetchAllBookings();
    }, []);
    
    useEffect(() => {
        console.log("Fetched bookings:", bookings); 
        // Log the statuses of the bookings to check what's being returned
        console.log("Booking statuses:", bookings.map(booking => booking?.status));
    
        console.log("Bookings state updated:", bookings);
    }, [bookings]);
    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage(""); // Clear the alert after 2 seconds
            }, 2000); // 2 seconds delay
    
            return () => clearTimeout(timer); // Clean up the timeout if the component unmounts or the alert changes
        }
    }, [alertMessage]);

    const renderContent = () => {
        console.log(bookings); 
        switch (activeTab) {
            case 'bookings':
                return (
                    <div style={contentCardStyle}>
                        <h3>Pending Bookings</h3>
                        
                        <DataTable
                            columns={[
                                {
                                    name: 'Type',
                                    selector: row => row.reservationType|| "No Type",
                                    sortable: true,
                                },
                                {
                                    name: 'Date',
                                    selector: row => row.date ? formatDate(row.date) : "No Date",
                                    sortable: true,
                                },
                                {
                                    name: 'Status',
                                    selector: row => row.status || "No Status", // Fallback in case status is missing
                                    sortable: true,
                                },
                                {
                                    name: 'Action',
                                    cell: row => (
                                        <div>
                                            <button
                                                onClick={() => {
                                                    console.log("Row data:", row); // Debug the row object
                                                    if (window.confirm("Are you sure you want to cancel?")) {
                                                        handleCancelBooking(row);
                                                    }
                                                }}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                <FontAwesomeIcon icon={faX} />
                                            </button>
                                        </div>
                                    )
                                }
                            ]}
                            data={bookings.filter(booking => booking.status === 'pending')}
                            noDataComponent="No pending bookings found"
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
                       
                        <DataTable
                            columns={[
                                {
                                    name: 'Type',
                                    selector: row => row.reservationType,
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

    const handleCancelBooking = async (reservation) => {
        // Set the booking ID
        const reservationId = reservation._id || reservation.name; // Fallback to `name` if `_id` is missing
        if (!reservationId) {
            console.error("Reservation ID is missing.");
            return;
        }
    
        console.log("Reservation Object:", reservation);
        console.log("Reservation ID:", reservationId);
    
        const token = localStorage.getItem("token");
    
        if (!token) {
            setAlertMessage("You must be logged in to cancel a reservation.");
            setAlertType("danger");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/user/cancel/reservations/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
    
            const data = await response.json();
            setAlertMessage(data.message); // Show the message returned from the server
            setAlertType("success");
    
            // Update state to remove canceled booking
            setBookings(prevBookings =>
                prevBookings.filter(booking => booking._id !== reservationId && booking.name !== reservationId)
            );
        } catch (error) {
            setAlertMessage(`Error canceling reservation: ${error.message}`);
            setAlertType("danger");
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
                                <Link className="nav-link" to="/userDashboard">Home</Link>
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
                                    View Offers
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/Rooms">Rooms</Link></li>
                                    <li><Link className="dropdown-item" to="/">Function Hall</Link></li>
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

export default UserBookings;