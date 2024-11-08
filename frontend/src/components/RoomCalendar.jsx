import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
function RoomCalendar(){
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

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
                    <a className="navbar-brand" href="#">
                        <img src="logo.png" alt="Logo" style={{ height: '40px' }} />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <input
                        type="text"
                        placeholder="Search...."
                        style={{ borderRadius: '50px', padding: '10px', margin: '5px' }}
                    />
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    View Offers
                                </a>
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
