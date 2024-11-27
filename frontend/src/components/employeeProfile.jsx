import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
    Modal
} from "react-bootstrap";

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employee/employeeProfile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
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
      const response = await fetch('http://localhost:5000/api/employee/employeeProfile', {
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

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/employee/employeeChangePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      alert('Password changed successfully');
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!user) {
    return <div>User profile not found.</div>;
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
          <input
            type="text"
            placeholder="Search...."
            style={{ borderRadius: '50px', padding: '10px', margin: '5px' }}
          ></input>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li>
                <a className="nav-link" href="#"><FontAwesomeIcon icon={faBell} /></a>
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
                        <p><strong>Cellphone Number:</strong> {user.cellphone}</p>
                      </Col>
                    </Row>
                    <Button
                      onClick={() => setActiveTab("edit")}
                      className="btn-fill mt-3"
                      variant="primary"
                    >
                      Edit Profile
                    </Button>
                    <Button
                      onClick={() => setShowModal(true)}
                      className="btn-fill mt-3 ms-2"
                      variant="warning"
                    >
                      Change Password
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={handleUpdate}>
                    <Row>
                      <Col md="6">
                        <Form.Group>
                          <label>Email address</label>
                          <Form.Control
                            type="email"
                            value={user.email}
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
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
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
                            onChange={(e) => setUser({ ...user, city: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <label>Country</label>
                          <Form.Control
                            type="text"
                            value={user.country}
                            onChange={(e) => setUser({ ...user, country: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <label>Cellphone Number</label>
                          <Form.Control
                            type="text"
                            value={user.cellphone}
                            onChange={(e) => setUser({ ...user, cellphone: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit" className="btn-fill mt-3" variant="primary">
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
        </Row>
      </Container>

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
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-3" variant="primary">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeProfile;
