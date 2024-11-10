import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
    const [userType, setUserType] = useState('User');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false); // State to check if CAPTCHA is verified
    const navigate = useNavigate();

    const onChange = () => {
        setIsCaptchaVerified(true); // Set CAPTCHA as verified when completed
    };

    // Validate email domain (@buksu.edu.ph) with optional subdomain (e.g., student.buksu.edu.ph)
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:student\.)?buksu\.edu\.ph$/;
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

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        // Ensure reCAPTCHA is verified
        if (!isCaptchaVerified) {
            setErrorMessage('Please complete the reCAPTCHA to continue.');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid institutional email address ending with @buksu.edu.ph.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);

            // Navigate to the appropriate dashboard based on the user role
            const { userType } = response.data;
            if (userType === 'User') {
                navigate('/userDashboard');
            } else if (userType === 'Employee') {
                navigate('/employeeDashboard');
            } else if (userType === 'Admin') {
                navigate('/adminDashboard');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed');
        }
    };

    // Handle signup form submission
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid institutional email address ending with @buksu.edu.ph.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        // Check if all fields are filled
        if (!username || !email || !password || !userType) {
            setErrorMessage('All fields are required!');
            return;
        }

        try {
            // Send the signup data with userType included in the request body
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                username,
                email,
                password,
                userType,  // Include userType here
            });

            // Set the token in localStorage after successful signup
            localStorage.setItem('token', response.data.token);

            // Navigate to the appropriate dashboard based on userType
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
                                type="email"
                                placeholder="Email"
                                className="form-control mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Ensure email value is correctly bound
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* reCAPTCHA */}
                            <ReCAPTCHA
                                sitekey="6LcwhXkqAAAAAAjVneJCT6pcdpIZ1OlQpQ_scY8g"
                                onChange={onChange} // When CAPTCHA is solved, call the onChange method
                                required
                            />
                            <button
                                className="btn btn-primary mb-3"
                                type="submit"
                                disabled={!isCaptchaVerified} // Disable the submit button until CAPTCHA is verified
                            >
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
