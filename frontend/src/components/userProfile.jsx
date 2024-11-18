import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Modal
} from "react-bootstrap";
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("view"); // State to track active tab
  const [user, setUser] = useState(null); // State for user profile
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        console.log('Fetched user profile:', data);
        setUser(data);

      } catch (error) {
        console.error("Error fetching user profile", error);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      const updatedData = await response.json();
      setUser(updatedData);
      setActiveTab('view');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Check if user is null before rendering profile data
  if (!user) {
    return <div>User profile not found.</div>;
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if(newPassword !== confirmPassword){
      alert("Password don't match");
      return;
    }

    try{
      const response = await fetch('http://localhost:5000/api/user/changepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({newPassword}),
      });
      
      if(!response.ok){
        throw new Error('Failed to change password');
      }

      alert('Password changed successfully');
      setShowModal(false);
    }catch(err){
      alert(err.message);
    }
  }
  
  return (
    <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1b1f3b' }}>
        <div className="container">
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
            <input type="text"  placeholder="Search...." style={{ borderRadius: '50px', padding: '10px', margin: '5px' }}></input>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
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
        <Container fluid style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingTop: '20px' }}>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Card.Header className="bg-primary text-white">
                <Card.Title as="h4">
                  {activeTab === "view" ? "User Profile" : "Edit Profile"}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {activeTab === "view" ? (
                  // Profile View Tab
                  <div>
                    <Row>
                      <Col md="6">
                        <p><strong>Name:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                      </Col>
                      <Col md="6">
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>City:</strong> {user.city}</p>
                        <p><strong>Country:</strong> {user.country}</p>
                      </Col>
                    </Row>
                    <Button
                      onClick={() => setActiveTab("edit")}
                      className="btn-fill mt-3"
                      variant="primary"
                    >
                      Edit Profile
                    </Button>
                    {/* Add Change Password Button */}
                    <Button
                      onClick={() => setShowModal(true)}
                      className="btn-fill mt-3 ms-2"
                      variant="warning"
                    >
                      Change Password
                    </Button>
                  </div>
                ) : (
                  // Edit Profile Tab
                  <Form onSubmit={handleUpdate}>
                    <Row>
                      <Col md="6">
                        <Form.Group>
                          <label>Email address</label>
                          <Form.Control
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                              setUser((prev) => ({ ...prev, email: e.target.value }))
                            }
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <label>Name</label>
                          <Form.Control
                            type="text"
                            value={user.username}
                            onChange={(e) =>
                              setUser((prev) => ({ ...prev, name: e.target.value }))
                            }
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Address</label>
                          <Form.Control
                            type="text"
                            value={user.address}
                            onChange={(e) =>
                              setUser((prev) => ({ ...prev, address: e.target.value }))
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Form.Group>
                          <label>City</label>
                          <Form.Control
                            type="text"
                            value={user.city}
                            onChange={(e) =>
                              setUser((prev) => ({ ...prev, city: e.target.value }))
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <label>Country</label>
                          <Form.Control
                            type="text"
                            value={user.country}
                            onChange={(e) =>
                              setUser((prev) => ({ ...prev, country: e.target.value }))
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      type="submit"
                      className="btn-fill mt-3"
                      variant="primary"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => setActiveTab("view")}
                      className="btn-fill mt-3 ms-2"
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
          {/* Profile Picture Section */}
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <p>IMG</p>
              </div>
              <Card.Body>
                <div className="author">
                  <p>IMG</p>
                  <h5 className="title">{user.username}</h5>
                  <p className="description">{user.email}</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br />
                  Your chick she so thirsty <br />
                  I'm in that two-seat Lambo"
                </p>
              </Card.Body>
              <hr />
              <div className="button-container mr-auto ml-auto">
                <Button className="btn-simple btn-icon" variant="link">
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button className="btn-simple btn-icon" variant="link">
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button className="btn-simple btn-icon" variant="link">
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Modal for changing password */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChangePassword}>
            <Form.Group>
              <label>New Password</label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
                <label>Confirm New Password</label>
                <Form.Control
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
            </Form.Group>
            <Button type="submit" className='mt-3' variant="primary">
                Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default UserProfile;
