import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
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
            alert(response.data.message || 'Reservation Successful');
        } catch (error) {
            console.error('Error reserving function hall:', error.response?.data || error.message);
            alert('Error reserving function hall');
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
                                    <li><Link className="dropdown-item" to="/rooms">Rooms</Link></li>
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
                    dayCellDidMount={renderDayCell}  // Day cell rendering logic
                    contentHeight="auto"
                />
            </div>
        </div>
    );
}

export default FunctionHallCalendar;
