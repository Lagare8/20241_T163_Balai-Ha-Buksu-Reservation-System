import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Function = () => {
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
                                    <li><Link className="dropdown-item" to="/function">Function Hall</Link></li>
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
      <div className="container">
        <h1 style={{ marginTop: '25px', textAlign: 'center' }}>Function Hall</h1>
        <div className="row">
          <div className="col-sm text-center">
            {Array.from({ length: 1 }).map((_, index) => (
              <div className="card" style={{ marginTop: '15px' }} key={index}>
                <div className="card-body d-flex">
                  <img src="../assets/functionhall.jpg"alt="Room1"style={{width: '50%',borderRadius: '10px',marginRight: '15px',}}/>
                  <div className="d-flex flex-column justify-content-between" style={{ width: '100%' }}>
                    <div style={{textAlign:"start"}}>
                      <h3 style={{ marginBottom: 'auto' }}>Function Hall {index + 1}</h3>
                      <h6 style={{ marginBottom: 'auto' }}>Status: Occupied</h6>
                    </div>
                    <a href="#" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Reserve &gt;</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-sm text-center">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Function;
