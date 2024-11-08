import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

function Login() {
    const [userType, setUserType] = useState('User');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    // Validate email domain (@buksu.edu.ph) with optional subdomain (e.g., student.buksu.edu.ph)
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?buksu\.edu\.ph$/;
        return emailRegex.test(email);
    };

    // Handle Google login success and populate form
    const handleLoginSuccess = async (credentialResponse) => {
        console.log('Google Login successful', credentialResponse);
        const decoded = credentialResponse.credential;

        // Parse the JWT response from Google
        const userProfile = JSON.parse(atob(decoded.split('.')[1])); // Decode the Google JWT token
        setEmail(userProfile.email);
        setUsername(userProfile.name); // You can set the username to the user's Google name, or leave it for the user to change

        // Optionally, set a default password or let the user choose one
        setPassword("temporaryPassword123"); // This is just a placeholder, change according to your logic.
        setConfirmPassword("temporaryPassword123"); // Same as above
    };

    const handleLoginError = () => {
        console.log('Google Login Failed');
    };

    // Handle login form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid institutional email address ending with @buksu.edu.ph.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);

            // Navigate to the appropriate dashboard based on the user type
            if (response.data.userType === 'User') {
                navigate('/userDashboard');
            } else if (response.data.userType === 'Employee') {
                navigate('/employeeDashboard');
            } else if (response.data.userType === 'Admin') {
                navigate('/adminDashboard');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed');
        }
    };

    // Handle signup form submission
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid institutional email address ending with @buksu.edu.ph.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        if (!username || !email || !password || !userType) {
            setErrorMessage('All fields are required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                username,
                email,
                password,
                userType,
            });

            localStorage.setItem('token', response.data.token);

            // Navigate to the appropriate dashboard based on the user type
            if (response.data.userType === 'User') {
                navigate('/userDashboard');
            } else if (response.data.userType === 'Employee') {
                navigate('/employeeDashboard');
            } else if (response.data.userType === 'Admin') {
                navigate('/adminDashboard');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg d-flex">
                <div className="p-4 bg-light rounded-left" style={{ maxWidth: '500px' }}>
                    <img
                        src="/assets/Shield_logo_of_Bukidnon_State_University.png"
                        alt="BUKSU Logo"
                        className="mb-3"
                        style={{ maxHeight: '150px', marginLeft: '110px', marginTop: '40px' }}
                    />
                    <h2 className="text-center mb-3">Welcome to BUKSU Hotel</h2>

                    <select
                        className="form-select mb-3"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="User">User</option>
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                    </select>

                    {/* Toggle between Login and Signup Form */}
                    {isSignup ? (
                        <form onSubmit={handleSignupSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                className="form-control mb-3"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-control mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="form-control mb-3"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button className="btn btn-primary mb-3" type="submit">
                                Sign Up
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleLoginSubmit}>
                            <input
                                type="text"
                                placeholder="Username or Email"
                                className="form-control mb-3"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="btn btn-primary mb-3" type="submit">
                                Log In
                            </button>
                        </form>
                    )}

                    {errorMessage && (
                        <div className="alert alert-danger mt-3">
                            {errorMessage}
                        </div>
                    )}

                    <p className="text-center mb-3">Or sign in with</p>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginError}
                    />

                    <div className="text-center mt-3">
                        <button
                            className="btn btn-link"
                            onClick={() => setIsSignup(!isSignup)}
                        >
                            {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>

                <div className="p-4 d-flex align-items-center justify-content-center" style={{ maxWidth: '500px' }}>
                    <div className="text-center">
                        <img src="/assets/lgo.png" alt="BUKSU Hotel Logo" className="mb-3" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
