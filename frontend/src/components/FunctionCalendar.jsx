import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function FunctionHallCalendar() {
    const [functionHallAvailability, setFunctionHallAvailability] = useState({});
    const [isDataReady, setIsDataReady] = useState(false); // Track if data is ready (token & userId)
    const navigate = useNavigate();
    const { token, setToken, userId, setUserId } = useAuth(); // Get token and userId directly from context
    const calendarRef = useRef(null);
    const [showProfile, setShowProfile] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");  // For alert message
    const [alertType, setAlertType] = useState("");  // For alert type (success, danger, etc.)
    const [isReserving, setIsReserving] = useState(false);
    const [ notifications, setNotifications] = useState([]);
    const [ showNotifications, setShowNotifications] = useState(false);

    // Set the token when the component mounts or if it's updated
useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken) {
        setToken(storedToken);
        console.log("Token set from localStorage:", storedToken);
    } else {
        console.log("No token found, redirecting to login");
        navigate('/');
    }

    if (storedUserId) {
        // Set the userId in context
        setUserId(storedUserId);  // Assuming `setUserId` is provided in your context
        console.log("UserId set from localStorage:", storedUserId);
    }
}, [navigate, setToken, setUserId]);  // Make sure setUserId is passed from context

const toggleProfile = () => {
    setShowProfile(!showProfile);
};

// Fetch function hall availability when token and userId are set
useEffect(() => {
    if (!token || !userId) {
        console.log("Waiting for token and userId...");
        return;  // Prevent fetch from happening until both are available
    }
    console.log("Token and UserId are available, proceed with fetching data...");
    fetchFunctionHallAvailability();
}, [token, userId]); // Re-run when either token or userId changes
 // Re-run when either token or userId changes

    const fetchFunctionHallAvailability = async () => {
        try {
            const date = new Date().toISOString().split('T')[0];  // Get today's date in 'YYYY-MM-DD' format
            console.log("Fetching availability for function hall on date:", date);
            const response = await axios.get('http://localhost:5000/api/user/check-availability', {
                params: {
                    reserveType: "Function Hall",
                    date: date,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Function hall availability response:", response.data);

            if (response.data && response.data.available !== undefined) {
                setFunctionHallAvailability({
                    [`${date}`]: response.data.available,
                });
            } else {
                console.warn("No 'available' field in the response data.");
            }
        } catch (error) {
            console.error("Error fetching availability:", error.message);
        }
    };

    const handleReserveFunctionHall = async (date) => {
        // Ensure token and userId are available
        //const userId = '672ee6664f127625550b8ac9';
        //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmVlNjY2NGYxMjc2MjU1NTBiOGFjOSIsImVtYWlsIjoiYXNkQGJ1a3N1LmVkdS5waCIsInVzZXJUeXBlIjoiVXNlciIsImlhdCI6MTczMTgwODkyMCwiZXhwIjoxNzMxODEyNTIwfQ.AWeLEMTzqC_tXtoLku4pkW1FoknSF7XGT3wpTwJrA4E';
        
        const token = localStorage.getItem('token');  // or use context if that's how you're storing it
        const userId = localStorage.getItem('userId');
        console.log("Retrieved Token:", token);
        console.log("Retrieved UserId:", userId);
        if (!date || !token) {
            console.log('Date: ', date)
            console.log('Token: ', token)
            console.error('Missing required data (date, token, or userId)');
            alert('Missing required data for reservation. Please try again.');
            return;
        }
        if(isReserving){
            return;
        }
        setIsReserving(true);
        try {
            const formattedDate = new Date(date).toISOString().split('T')[0];
            console.log("Reserving function hall for date:", formattedDate);

            const response = await axios.post(
                'http://localhost:5000/api/user/reserve/hall',
                {  date: formattedDate },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Function hall reserved successfully:', response.data);
            setAlertMessage(response.data.message || 'Reservation Successful');
            setAlertType("success");
            setTimeout(() => {
                setAlertMessage(""); // Remove alert after 2 seconds
                setAlertType(""); // Reset alert type
            }, 2000);
        } catch (error) {
            console.error('Error reserving function hall:', error.response?.data || error.message);
            setAlertMessage('Error reserving function hall');
            setAlertType("danger");
            setTimeout(() => {
                setAlertMessage(""); // Remove alert after 2 seconds
                setAlertType(""); // Reset alert type
            }, 2000);
        }finally{
            setIsReserving(false);
        }
    };

    const renderDayCell = (info) => {
        const dateObj = info.date;
        const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        const availability = functionHallAvailability[dateStr];

        const isAvailable = availability !== undefined ? availability : true;

        const button = document.createElement("button");
        button.innerHTML = isAvailable ? "AVAILABLE" : "UNAVAILABLE";
        button.classList.add(isAvailable ? 'available' : 'unavailable');
        button.style.border = "none";
        button.style.padding = "8px 12px";
        button.style.borderRadius = "4px";
        button.style.fontSize = "12px";
        button.style.marginTop = "4px";
        button.style.width = "100%";

        if (isAvailable) {
            button.addEventListener("click", () => handleReserveFunctionHall(dateStr));
        }

        info.el.appendChild(button);
    };

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().render();
        }
    }, [functionHallAvailability]);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(today); // Set the calendar's date to today dynamically
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
                                    <li><Link className="dropdown-item" to="/rooms">Rooms</Link></li>
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
                                                        <li className="nav-item"></li>
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
                    dayCellDidMount={renderDayCell}  // Day cell rendering logic
                    contentHeight="auto"
                />
            </div>
        </div>
    );
}

export default FunctionHallCalendar;
