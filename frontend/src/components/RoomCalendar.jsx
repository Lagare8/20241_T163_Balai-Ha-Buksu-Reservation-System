import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; // Add axios for API requests

function RoomCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [roomAvailability, setRoomAvailability] = useState({}); // Store availability for one room
    const navigate = useNavigate();
    const { setToken } = useAuth();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken); // Set token in context
        } else {
            navigate('/'); // Redirect to login if no token
        }
    }, [navigate, setToken]);

    // Fetch availability for a specific room on a selected date
    const checkRoomAvailability = (roomNumber, date) => {
        axios.get('/api/check-availability', { params: { reserveType: 'Room', reserve: roomNumber, date } })
            .then(response => {
                setRoomAvailability(prevState => ({
                    ...prevState,
                    [`${roomNumber}-${date}`]: response.data.available,
                }));
            })
            .catch(error => {
                console.error("Error checking room availability:", error);
            });
    };

    const dayCellDidMount = (dateInfo) => {
        const dateStr = dateInfo.dateStr;
        const button = document.createElement('button');
        button.innerHTML = 'AVAILABLE';
        button.style = `
            background-color: #f8b400;
            color: white;
            border: none;
            padding: 4px 6px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 10px;
            margin-top: 4px;
        `;

        const roomNumber = 1; // Assume you want to check availability for room 1 only, or you can change this logic

        // Check availability for room 1 only (remove loop)
        checkRoomAvailability(roomNumber, dateStr);

        // If the room is not available, disable the button
        if (roomAvailability[`${roomNumber}-${dateStr}`] === false) {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
        }

        // Add event listener for room reservation
        button.addEventListener('click', () => {
            if (button.disabled === false) {
                // Make API call to reserve room
                axios.post('/api/reserve/room', { roomNumber, date: dateStr })
                    .then(response => {
                        alert('Room reserved successfully!');
                    })
                    .catch(error => {
                        console.error("Error reserving room:", error);
                        alert('Failed to reserve room');
                    });
            }
        });

        dateInfo.el.appendChild(button);
    };

    return (
        <div style={{ backgroundColor: 'gray', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1b1f3b' }}>
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img src="/assets/Shield_logo_of_Bukidnon_State_University.png" alt="BUKSU Logo" style={{ height: '50px', marginRight: '10px' }} />
                        <img src="/assets/lgo.png" alt="BUKSU Hotel Logo" style={{ height: '80px', width: '100px' }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="form-inline my-2 my-lg-0 ml-auto">
                        <div className="d-flex align-items-center">
                            <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit"><i className="fas fa-search"></i></button>
                        </div>
                    </form>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/userDashboard">Home</Link></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">View Offers</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/roomCalendar">Rooms</Link></li>
                                    <li><Link className="dropdown-item" to="/functionCalendar">Function Hall</Link></li>
                                    <li><Link className="dropdown-item" to="/catering">Food Catering</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div style={{ padding: '20px', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{ start: 'title', center: '', end: 'today prev next' }}
                    height={"100%"} // Set to 100% to fill the container
                    dayCellDidMount={dayCellDidMount} // Use dayCellDidMount to render the button
                    contentHeight="auto" // Adjust content height automatically
                />
            </div>
        </div>
    );
}

export default RoomCalendar;
