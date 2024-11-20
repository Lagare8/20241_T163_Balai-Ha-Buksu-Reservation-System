import React, { useState, useEffect, useRef  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FoodCatering() {
    const [cateringAvailability, setCateringAvailability] = useState({});
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { token} = useAuth();
    const [isAvailable, setIsAvailable] = useState(true);
    const calendarRef = useRef(null);
    const [ notifications, setNotifications] = useState([]);
    const [ showNotifications, setShowNotifications] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [menu, setMenu] = useState('option1');

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

    // Fetch availability data for a room based on the room number
    useEffect(() => {
        fetchCateringAvailability();
    }, []);

    const fetchCateringAvailability = async () => {
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
            setCateringAvailability(response.data); // Update state with availability data
        } catch (error) {
            console.error('Error fetching availability:', error.message);
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
    
        const availability = cateringAvailability[`${dateStr}`]; // Check if the room is available
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
          if (isAvailable) {
            // Pass the selected date to the modal
            setShow(true);
            setSelectedDate(dateStr);
        }
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
    const handleQuantityChange = (e) => setQuantity(e.target.value);
    const handleMenuChange = (e) => setMenu(e.target.value);

    // Handle form submission for catering reservation
    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedDate = calendarRef.current.getApi().getDate();  // Get the selected date from the calendar

        const reservationData = {
            date: selectedDate,
            quantity,
            menu
        };

        try {
            const response = await axios.post('http://localhost:5000/api/user/reserve/catering', reservationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Reservation Response:", response.data);
            alert('Catering reservation successfully created');
            setShow(false); // Close modal after submission
        } catch (error) {
            console.error('Error making reservation:', error);
            alert('Failed to create catering reservation');
        }
    };
    
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
            
               {/* Modal for food catering form */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reserve Catering</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="menu" className="form-label">Menu Option</label>
                            <select
                                className="form-select"
                                id="menu"
                                value={menu}
                                onChange={handleMenuChange}
                                required
                            >
                                <option value="option1">Menu 1</option>
                                <option value="option2">Menu 2</option>
                                <option value="option3">Menu 3</option>
                            </select>
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

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

export default FoodCatering;
