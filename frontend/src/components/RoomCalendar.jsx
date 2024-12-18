import React, { useState, useEffect, useRef  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Rooms from "./Rooms";

function RoomCalendar() {
    const [roomAvailability, setRoomAvailability] = useState({});
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { token} = useAuth();
    const [isAvailable, setIsAvailable] = useState(true);
    const calendarRef = useRef(null);
    const [ notifications, setNotifications] = useState([]);
    const [ showNotifications, setShowNotifications] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");  // For alert message
    const [alertType, setAlertType] = useState("");  // For alert type (success, danger, etc.)
    const [isReserving, setIsReserving] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    useEffect(() => {
        console.log("Token in RoomsCalendar.jsx:", token);
        // If you need to use the token to fetch data or make requests, do so here
    }, [token]);
    useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken); // Set token in context
        console.log("Token in Dashboard:", storedToken); // Debugging the token
        // setLoading(false); // Token found, stop loading
    } else {
        console.log("No token found, redirecting to login");
        navigate('/'); // Redirect to login if no token
    }
    }, [navigate, setToken]);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            navigate("/");
        }
    }, [navigate, setToken]);   

    const location = useLocation();
    const roomNumber = location.state ? location.state.roomNumber : null;
    const index = location.state ? location.state.roomNumber : null;
    // Fetch availability data for a room based on the room number
    useEffect(() => {
        console.log("Room number:", roomNumber);
        fetchRoomAvailability();
    }, [roomNumber]);

    const fetchRoomAvailability = async () => {
        try {
            const date = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
            console.log("Current Date with Time:", date.toString());  // Local time with date and time
            const response = await axios.get('http://localhost:5000/api/user/check-availability', {
                params: {
                    reserveType: "Room",
                    reserve: roomNumber,
                    date: date,
                }
            });
    
            console.log("Room availability response:", response.data);
            setRoomAvailability(response.data); // Update state with availability data
        } catch (error) {
            console.error('Error fetching availability:', error.message);
        }
    };
    
    const handleReserveRoom = async (roomId, date) => {
        if (isReserving) {
            return;  // Prevent multiple reservations
        }
        setIsReserving(true);
        try {
    
            console.log('Reserving room:', roomId, 'on date:', date);  // Verify the date is correct
    
            // Format date as 'YYYY-MM-DD' for the request
            const formattedDate = new Date(date).toISOString().split('T')[0];
    
            const token = localStorage.getItem("token");
            const response = await axios.post(
                'http://localhost:5000/api/user/reserve/room',
                { roomNumber: roomId, date: formattedDate },  // Pass dynamic room and formatted date
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            console.log('Room reserved successfully:', response.data);
            setAlertMessage(response.data.message || 'Reservation Successful');
            setAlertType("success");
            setTimeout(() => {
                setAlertMessage(""); // Remove alert after 2 seconds
                setAlertType(""); // Reset alert type
            }, 2000); 
            //notificaitons
            setNotifications(prev => [
                ...prev,
                console.log('Updating notifications:', prev),
                `Reservation confirmed for Room ${roomId} on ${formattedDate}.`
            ]);
        } catch (error) {
            console.error('Error reserving room:', error.response?.data || error.message);
            setAlertMessage('Its already booked.');
            setAlertType("danger");
            setTimeout(() => {
                setAlertMessage(""); // Remove alert after 2 seconds
                setAlertType(""); // Reset alert type
            }, 2000);
        } finally {
            setIsReserving(false);  // Re-enable the reservation button
        }
    };

    // Render button inside each day cell
    const renderDayCell = (info) => {
        const dateObj = info.date;  // This is the date object of the clicked cell
        const dateStr = dateObj
            ? `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
            : undefined;  // Convert to 'YYYY-MM-DD' in local time
    
        console.log("Formatted dateStr:", dateStr);  // Check if the date is correct
        console.log('Info Date', info.date);
    
        if (!dateStr) {
            console.error("Date is missing or invalid!");
            return; // If date is invalid, stop further execution
        }
        const isPastDate = dateStr < today;
        const roomNumber = index; // Assuming we're working with room 1 for now (use dynamic logic if needed)
        const availability = roomAvailability[`${roomNumber}-${dateStr}`];
        const isAvailable = availability !== undefined ? availability : true;
    
        const button = document.createElement("button");
        button.innerHTML = isAvailable ? "AVAILABLE" : "UNAVAILABLE";
        button.style.backgroundColor = isAvailable ? "#f8b400" : "#ccc";
        button.style.color = "white";
        button.style.border = "none";
        button.style.padding = "8px 12px";
        button.style.borderRadius = "4px";
        button.style.cursor = isAvailable ? "pointer" : "not-allowed";
        button.style.fontSize = "12px";
        button.style.marginTop = "4px";
        button.style.width = "100%";
    
        // Add event listener for handling room reservation
        button.addEventListener("click", () => {
            console.log("Reserving room:", roomNumber, "on date:", dateStr); // Log to verify the date
            handleReserveRoom(roomNumber, dateStr);  // Pass the correct date (dateStr) for reservation
        });
    
        info.el.appendChild(button);
    };
    
    // Get today's date for initialDate
    const today = new Date().toISOString().split('T')[0];

    
    useEffect(() => {
        if (calendarRef.current) {
             calendarRef.current.getApi().gotoDate(today); // Dynamically set the calendar's date to today
        }
    }, [today]);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token'); // Make sure you have a valid token
            const response = await axios.get('http://localhost:5000/api/user/notifications', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setNotifications(response.data); // Assuming you're using React's state management
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    
    useEffect(() => {
        fetchNotifications();
    }, []);
    
    const toggleNotifications = () => {
        setShowNotifications((prevState) => !prevState);
    }
    
    const clearNotifications = () => {
        setNotifications([]);
        setShowNotifications(false);
    }
    
    return (
        <div
            style={{
                backgroundColor: "gray",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
            }}
        >
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1b1f3b" }}>
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img
                            src="/assets/Shield_logo_of_Bukidnon_State_University.png"
                            alt="BUKSU Logo"
                            style={{ height: "50px", marginRight: "10px" }}
                        />
                        <img
                            src="/assets/lgo.png"
                            alt="BUKSU Hotel Logo"
                            style={{ height: "80px", width: "100px" }}
                        />
                    </a>
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
                                    <li><Link className="dropdown-item" to="/functionCalendar">Function Hall</Link></li>
                                    <li><Link className="dropdown-item" to="/catering">Food Catering</Link></li>
                                </ul>
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
                            <li className="nav-item">
                            <FontAwesomeIcon 
                                icon={faBell} 
                                size="lg" 
                                style={{color:"white", cursor: "pointer", position: "relative"}} 
                                onClick={toggleNotifications}
                            />
                            {notifications.length > 0 && (
                                <span 
                                    style={{
                                        top: "-5px", 
                                        right: "-10px", 
                                        backgroundColor: "red", 
                                        color: "white", 
                                        borderRadius: "50%",
                                        padding: "2px 6px", 
                                        fontSize: "12px",
                                        zIndex: 10
                                    }}
                                >
                                    {notifications.filter(notification => notification?.status === 'unread').length}
                                </span>
                            )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Bootstrap Alert */}
            {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert" style={{ position: "fixed", top: "10%", right: "10%", zIndex: 9999 }}>
                    {alertMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            {/* Notifications Dropdown */}
            {showNotifications && (
                <div
                    style={{
                        position: "absolute",
                        top: "70px",
                        right: "20px",
                        backgroundColor: "white",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        borderRadius: "5px",
                        width: "300px",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            padding: "10px",
                            borderBottom: "1px solid #ddd",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Notifications
                    </div>
                    <div
                        style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                        }}
                    >
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => {
                            if (!notification || !notification.message) {
                                console.error("Invalid notification:", notification);
                                return null; // Skip rendering this item
                            }
                            return (
                                <div
                                    key={index}
                                    style={{
                                        padding: "10px",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    {notification.message} - {notification.status || "Unread"}
                                </div>
                            );
                        })
                    ) : (
                        <div
                            style={{
                                padding: "10px",
                                textAlign: "center",
                                color: "#999",
                            }}
                        >
                            No notifications
                        </div>
                    )}
                    </div>
                    <div
                        style={{
                            padding: "10px",
                            textAlign: "center",
                        }}
                    >
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={clearNotifications}
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            )}

            <div
                style={{
                    padding: "20px",
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Fullcalendar
                    ref={calendarRef} 
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    
                    headerToolbar={{
                        start: "title", 
                        center: "", 
                        end: "today prev next"
                    }}
                    height="100%"
                    dayCellDidMount={renderDayCell}  // Correct callback for day cells
                    contentHeight="auto"
                />
            </div>
        </div>
    );
}

export default RoomCalendar;
