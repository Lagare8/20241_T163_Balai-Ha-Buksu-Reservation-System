import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';



const UserReserve = () => {

  return (
    <div style={{backgroundColor: 'gray', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight:'100vh'}}>
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
                            style={{ height: '100px', width: '120px' }}
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
          <input type="text"  placeholder="Search...." style={{ borderRadius: '50px', padding: '10px', margin: '5px' }}></input>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">View Offers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="bi bi-search"></i></a>
              </li>
              <li>
                <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='container mt-4'>
        <div className='card'>
          <div className='card-body text-center'>
            Balai Ha BukSu Offer
          <div class="container">
            <div class="row">
              <div class="col-sm text-center">
                Function Hall
                <div className='card border-0'>
                  <div className='card-body'>
                      <img src="../assets/function.jpg" alt="Function Hall" className="img-fluid" style={{ height:'650px', width: '100%', objectFit: 'cover' }}/>
                  </div>
                </div>
                <a href="#" style={{textDecoration: 'none', color: 'black'}}>Check Availability</a>
              </div>
                <div class="col-sm text-center">
                  Rooms
                  <div className='card border-0'>
                    <div className='card-body'>
                      <img src="../assets/room.png" alt="Rooms" className='img-fluid' style={{height: '650px', width: '100%', objectFit: 'cover'}} />
                    </div>
                  </div>
                  <a href="#" style={{textDecoration: 'none', color: 'black'}}>Check Availability</a>
                </div>
                <div class="col-sm text-center">
                  Catering Services
                  <div className='card border-0'>
                    <div className='card-body'>
                      <img src="../assets/cater.png" alt="Cater" className='img-fluid' style={{height: '650px', width:'100%', objectFit:'cover'}} />
                    </div>
                  </div>
                    <a href="#" style={{textDecoration: 'none', color: 'black'}}>Check Availability</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserReserve;