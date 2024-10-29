import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Catering = () => {
  return (
    <div
      style={{
        backgroundColor: 'gray',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
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
      <div className="container">
        <h1 style={{ marginTop: '25px', textAlign: 'center' }}>Food Catering</h1>
        <div className="row">
          <div className="col-sm text-center">
            <h2>Main Course</h2>
            <div className="row">
              {Array.from({ length: 1 }).map((_, index) => (
                <div className="col-md-6" key={index} style={{ marginTop: '15px' }}>
                  <div className="card">
                    <div className="card-body d-flex">
                      <img src="../assets/functionhall.jpg" alt="Room1" style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }} />
                      <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                        <div style={{ textAlign: "start" }}>
                          <h3 style={{ marginBottom: 'auto' }}>Main Course {index + 1}</h3>
                        </div>
                        <a href="#" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Reserve &gt;</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h2>Side Dish</h2>
            <div className="row">
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="col-md-6" key={index} style={{ marginTop: '15px' }}>
                  <div className="card">
                    <div className="card-body d-flex">
                      <img src="../assets/functionhall.jpg" alt="Room1" style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }} />
                      <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                        <div style={{ textAlign: "start" }}>
                          <h3 style={{ marginBottom: 'auto' }}>Side Dish {index + 1}</h3>
                        </div>
                        <a href="#" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Reserve &gt;</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h2>Dessert</h2>
                <div className="row">
                {Array.from({ length: 1 }).map((_, index) => (
                    <div className="col-md-6" key={index} style={{ marginTop: '15px' }}>
                    <div className="card">
                        <div className="card-body d-flex">
                        <img src="../assets/functionhall.jpg" alt="Room1" style={{ width: '50%', borderRadius: '10px', marginRight: '15px' }} />
                        <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                            <div style={{ textAlign: "start" }}>
                            <h3 style={{ marginBottom: 'auto' }}>Dessert {index + 1}</h3>
                            </div>
                            <a href="#" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Reserve &gt;</a>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catering;
