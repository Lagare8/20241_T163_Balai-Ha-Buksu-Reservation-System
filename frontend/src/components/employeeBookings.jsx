import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendarAlt, faX, faCheck, faCalendarCheck, faHistory, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const EmployeeBookings = () => {
    const [activeTab, setActiveTab] = useState('confirmed');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [bookings, setBookings] = useState([]); // State to store bookings
    const toggleModal = () => setShowModal(!showModal);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

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

    // Fetch data from database
    const fetchAllBookings = async () => {
        try {
            const response = await fetch('http://localhost:5000/employee/reservation/bookings');  // Adjusted API path
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            setBookings(data);  // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching bookings:', error.message);
        }
    };

    // Fetch bookings when the component mounts
    useEffect(() => {
        fetchAllBookings();
    }, []); // Empty dependency array ensures the fetch is called only once when the component mounts

    useEffect(() => {
        console.log('Updated bookings:', bookings);
    }, [bookings]); // Log the bookings every time they update

    const renderContent = () => {
        switch (activeTab) {
            case 'bookings':
                return (
                    <div style={contentCardStyle}>
                        <h3>Pending Bookings</h3>
                        <div className='text-end'>
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}} />
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
                            data={bookings.filter((booking) => booking.status === 'pending')}
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
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}} />
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
                            data={bookings.filter(booking => booking.status === 'confirmed')}
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
                        <div className='text-end'>
                            <input type='text' placeholder='Search...' style={{borderRadius: '5px', marginBottom: '5px'}} />
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
            default:
                return null;
        }
    };

    const handleConfirmBooking = async (reservation) => {
        try {
            const response = await fetch(`http://localhost:5000/employee/reserve/confirm/${reservation._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'confirmed' })
            });
            if (!response.ok) {
                setBookings((prevBookings) => {
                    const updatedBookings = prevBookings.map((booking) =>
                        booking._id === reservation._id ? { ...booking, status: 'confirmed' } : booking
                    );
                    return updatedBookings;
                });
                console.log('Booking confirmed successfully!');
            } else {
                console.error("Error confirming bookings");
            }
        } catch (error) {
            console.error("Error confirming bookings", error);
        }
    };

    const handleCancelBooking = async (reservation) => {
        console.log("Canceling reservation", reservation);
        try {
            console.log("Sending request to cancel booking with ID:", reservation._id);
            const response = await fetch(`http://localhost:5000/employee/reserve/cancel/${reservation._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                setBookings((prevBookings) => prevBookings.filter(booking => booking._id !== reservation._id));
                console.log("Booking Cancelled Successfully");
            } else {
                console.error("Error cancelling booking: ", response.statusText);
            }
        } catch (error) {
            console.error("Error Canceling bookings", error);
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

                    <form className="form-inline my-2 my-lg-0 ml-auto">
                        <div className="d-flex align-items-center">
                            <input
                                className="form-control mr-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
                                <FontAwesomeIcon icon={faBell} />
                            </button>
                            <button className="btn btn-outline-light my-2 my-sm-0 ms-2" onClick={toggleProfile}>
                                <FontAwesomeIcon icon={faUserCircle} />
                            </button>
                        </div>
                    </form>
                </div>
            </nav>
            <div className="container mt-4">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bookings')}
                        >
                            Pending Bookings
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'confirmed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('confirmed')}
                        >
                            Confirmed Bookings
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            Booking History
                        </button>
                    </li>
                </ul>
                {renderContent()}
            </div>
        </div>
    );
};

const contentCardStyle = {
    background: '#fff',
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

export default EmployeeBookings;
