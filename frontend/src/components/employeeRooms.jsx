import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import { Link } from 'react-router-dom';

function EmpRoom() {
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
          {/* Other Navbar content */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-center">
        <h1 className="mt-5">Rooms</h1>
        <div className="row mt-5">
          {/* Room Cards */}
          {rooms.map((room) => (
            <div className="col-md-3 mb-4" key={room.id}>
              <div className="card">
                <img src="../assets/room.png" className="card-img-top" alt={`Room ${room.id} Image`} />
                <div className="card-body">
                  <h5 className="card-title">{room.name}</h5>
                  <p>{room.description}</p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdateClick(room)}
                    >
                      <i className="fas fa-edit"></i> Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Form (show when a room is being edited) */}
      {editingRoom && (
        <div className="container mt-5">
          <h2>Update Room</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
              <label htmlFor="roomName" className="form-label">Room Name</label>
              <input
                type="text"
                id="roomName"
                className="form-control"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomDescription" className="form-label">Description</label>
              <textarea
                id="roomDescription"
                className="form-control"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"                          
              onClick={() => setEditingRoom(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmpRoom;
             