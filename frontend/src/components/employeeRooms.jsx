import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';

function EmpRoom() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
  };

  const toggleProfile = () => {
      setShowProfile(!showProfile);
  };
  // Sample room data
  const initialRooms = [
    { id: 1, name: 'Room 1', description: 'Comfortable single room' },
    { id: 2, name: 'Room 2', description: 'Luxury double room' },
    { id: 3, name: 'Room 3', description: 'Affordable room for budget travelers' },
    { id: 4, name: 'Room 4', description: 'Premium suite with balcony' },
    { id: 5, name: 'Room 5', description: 'Spacious family room' },
    { id: 6, name: 'Room 6', description: 'Standard room with all amenities' },
  ];

  const [rooms, setRooms] = useState(initialRooms);
  const [editingRoom, setEditingRoom] = useState(null); // Store the room being edited
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  // Function to handle the Update button click
  const handleUpdateClick = (room) => {
    setEditingRoom(room); // Set the room to be edited
    setUpdatedName(room.name);
    setUpdatedDescription(room.description);
  };

  // Function to handle form submission and update the room
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const updatedRooms = rooms.map((room) =>
      room.id === editingRoom.id
        ? { ...room, name: updatedName, description: updatedDescription }
        : room
    );
    setRooms(updatedRooms);
    setEditingRoom(null); // Reset editing state after updating
  };

  return (
    <div style={{ backgroundColor: 'gray', minHeight: '100vh' }}>
      {/* Navbar */}
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
                            <button className="btn btn-outline-light" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/employeeDashboard">Home</Link>
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
                                    Update Offers
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/Emprooms">Rooms</Link></li>
                                    <li><Link className="dropdown-item" to="/Empfunction-hall">Function Hall</Link></li>
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
            <div className="container text-center">
                <h1 className="mt-5">Rooms</h1>
                <div className="row mt-5">
                    {/* Card 1 */}
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <img src="../assets/function.jpg" className="card-img-top" alt="Function Hall Image" />
                            <div className="card-body">
                                <h5 className="card-title">Room 1</h5>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning">
                                        <i className="fas fa-edit"></i> Update
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <img src="../assets/room.png" className="card-img-top" alt="Room Image" />
                            <div className="card-body">
                                <h5 className="card-title">Room 2</h5>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning">
                                        <i className="fas fa-edit"></i> Update
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <img src="../assets/room.png" className="card-img-top" alt="Room Image" />
                            <div className="card-body">
                                <h5 className="card-title">Room 3</h5>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning">
                                        <i className="fas fa-edit"></i> Update
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <img src="../assets/function.jpg" className="card-img-top" alt="Function Hall Image" />
                            <div className="card-body">
                                <h5 className="card-title">Room 4</h5>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning">
                                        <i className="fas fa-edit"></i> Update
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 5 */}
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <img src="../assets/function.jpg" className="card-img-top" alt="Function Hall Image" />
                            <div className="card-body">
                                <h5 className="card-title">Room 5</h5>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning">
                                        <i className="fas fa-edit"></i> Update
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 6 */}
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <img src="../assets/function.jpg" className="card-img-top" alt="Function Hall Image" />
                            <div className="card-body">
                                <h5 className="card-title">Room 6</h5>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning">
                                        <i className="fas fa-edit"></i> Update
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpRoom;
