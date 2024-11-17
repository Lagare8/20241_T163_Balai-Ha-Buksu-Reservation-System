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

function RoomCalendar() {
    const [roomAvailability, setRoomAvailability] = useState({});
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { token} = useAuth();
    const [isAvailable, setIsAvailable] = useState(true);
    const calendarRef = useRef(null);

    useEffect(() => {
        //console.log("Token in RoomsCalendar.jsx:", token);
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

    const location = useLocation();
    const roomNumber = location.state ? location.state.roomNumber : null;

    // Fetch availability data for a room based on the room number
    useEffect(() => {
        if (!roomNumber) {
            console.warn("Room number is not defined. Skipping fetchRoomAvailability.");
            return;
        }
    
        console.log("Fetching availability for Room number:", roomNumber);
        fetchRoomAvailability();
    }, [roomNumber]);

    const fetchRoomAvailability = async () => {
        try {
            const date = new Date().toISOString().split('T')[0];
            console.log("Fetching availability for room:", roomNumber, "on date:", date);
            const response = await axios.get('http://localhost:5000/api/user/check-availability', {
                params: {
                    reserveType: "Room",
                    reserve: roomNumber,
                    date: date,
                },
            });
    
            console.log("Room availability response:", response.data);
    
            // Check if the response contains the expected data structure
            if (response.data && response.data.available !== undefined) {
                console.log("Room Availability fetched:", response.data);
                setRoomAvailability((prev) => ({
                    ...prev,
                    [`${roomNumber}-${date}`]: response.data.available,
                }));
            } else {
                console.warn("No 'available' field in the response data.");
            }
        } catch (error) {
            console.error("Error fetching availability:", error.message);
        }
    };
    

    useEffect(() => {
    if (roomNumber) {
        console.log("Fetching availability for Room number:", roomNumber);
        fetchRoomAvailability();
    }
    }, [roomNumber]);  // Trigger when roomNumber changes

    const handleReserveRoom = async (roomId, date) => {
        try {
            if (!date) {
                console.error('Date is missing!');
                return;  // Prevent further execution if date is invalid
            }
    
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
        } catch (error) {
            console.error('Error reserving room:', error.response?.data || error.message);
        }
    };
    
    
    // Render button inside each day cell
    const renderDayCell = (info) => {
        const dateObj = info.date;
        const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        const availability = roomAvailability[`${roomNumber}-${dateStr}`];
        console.log("Checking availability:", availability);
        console.log("Rendering day cell for", `${roomNumber}-${dateStr}`, "availability:", availability);
        
        console.log("Checking availability for:", `${roomNumber}-${dateStr}`, "=>", availability);
    
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
    
        if (isAvailable) {
            button.addEventListener("click", () => handleReserveRoom(roomNumber, dateStr));
        }
    
        info.el.appendChild(button);
    };
    


    useEffect(() => {
    if (roomNumber) { // Only fetch if roomNumber is valid
        console.log("Fetching availability for Room number:", roomNumber);
        fetchRoomAvailability();
    }
}, [roomNumber]); // Dependency is only `roomNumber`

    
    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().render();
        }
    }, [roomAvailability]);
    
    const handleViewChange = async () => {
        const visibleDates = calendarRef.current.getApi().getDates();
        for (const dateObj of visibleDates) {
            const dateStr = dateObj.toISOString().split('T')[0];
            await fetchRoomAvailability(dateStr);
        }
    };
    
    
    // Get today's date for initialDate
    const today = new Date().toISOString().split('T')[0];
    
    
    useEffect(() => {
        if (calendarRef.current) {
             calendarRef.current.getApi().gotoDate(today); // Dynamically set the calendar's date to today
        }
    }, [today]);
    
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
                                <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

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
