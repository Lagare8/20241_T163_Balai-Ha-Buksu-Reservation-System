import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate, Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function RoomCalendar(){
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    const { setToken} = useAuth();

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
    
    const handleAddEvent = () => {
        // Function to handle adding an event
        alert(`Event added for ${selectedDate}`);
        setSelectedDate(null); 
        navigate('/Rooms')
    };

    const renderCellContent = (dateInfo) => {
        return (
            <div>
                <div>{dateInfo.dayNumberText}</div>
                {selectedDate == dateInfo.dateStr && (
                    <button onClick={(e) => handleAddEvent()}
                    style={{backgroundColor: '#f8b400',
                        color: 'white',
                        border: 'none',
                        padding: '4px 6px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '10px',
                        marginTop: '4px'}}
                    >
                        CHECK
                    </button>
                )}
            </div>
        );
    };
    return (
        <div style={{
            backgroundColor: 'gray',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        }}>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1b1f3b' }}>
                <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                          <img 
                              src="/assets/Shield_logo_of_Bukidnon_State_University.png" 
                              alt="BUKSU Logo" 
                              style={{ height: '50px',marginRight: '10px' }}
                          />
                          <img 
                              src="/assets/lgo.png" 
                              alt="BUKSU Hotel Logo" 
                              style={{ height: '80px', width: '100px' }}
                          />
                      </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
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
                                      <li><Link className="dropdown-item" to="/roomCalendar">Rooms</Link></li>
                                      <li><Link className="dropdown-item" to="/functionCalendar">Function Hall</Link></li>
                                      <li><Link className="dropdown-item" to="/catering">Food Catering</Link></li>
                                  </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FontAwesomeIcon icon={faBell} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ padding: '20px' }}>
                <Fullcalendar 
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={
                        {
                            start: 'title',
                            ceneter: '',
                            end: 'today prev next'
                        }
                    }
                    height={"90vh"}
                    dayCellContent={(dateInfo) => renderCellContent(dateInfo)}
                />
            </div>
            
        </div>
    );
}

export default RoomCalendar;
