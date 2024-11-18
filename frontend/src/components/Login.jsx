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
    const navigate = useNavigate();
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChange = () => {
        setIsCaptchaVerified(true);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:student\.)?buksu\.edu\.ph$/;
        return emailRegex.test(email);
    };

    const handleLoginSuccess = async (credentialResponse) => {
        console.log('Google Login successful', credentialResponse);
        const decoded = credentialResponse.credential;

        const userProfile = JSON.parse(atob(decoded.split('.')[1]));
        setEmail(userProfile.email);
        setUsername(userProfile.name);
        setPassword("temporaryPassword123");
        setConfirmPassword("temporaryPassword123");
    };

    const handleLoginError = () => {
        console.log('Google Login Failed');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!isCaptchaVerified) {
            setErrorMessage("Please complete the CAPTCHA verification.");
            setIsSubmitting(false);
            console.log("CAPTCHA not verified, submission halted"); // Trace CAPTCHA check
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid institutional email address ending with @buksu.edu.ph.');
            setIsSubmitting(false);
            console.log("Invalid email format:", email); // Trace invalid email format
            return;
        }

        try {
            console.log('Sending login request...');
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            console.log("Login response:", response); // Trace login response

            const token = response.data.token; 
            localStorage.setItem('token', token);

            const { userType } = response.data;
            if (userType === 'User') {
                console.log('Redirecting to user dashboard');
                navigate('/userDashboard');
            } else if (userType === 'Employee') {
                console.log('Redirecting to employee dashboard');
                navigate('/employeeDashboard');
            } else if (userType === 'Admin') {
                console.log('Redirecting to admin dashboard');
                navigate('/adminDashboard');
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage(error.response?.data?.message || 'Login failed');
        } finally {
            setIsSubmitting(false);
            console.log("Login process completed");
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid institutional email address ending with @buksu.edu.ph.');
            console.log("Invalid email format:", email); // Trace invalid email format
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            console.log("Password mismatch"); // Trace password mismatch
            return;
        }

        if (!username || !email || !password || !userType) {
            setErrorMessage('All fields are required!');
            console.log("Missing required fields"); // Trace missing fields
            return;
        }

        try {
            console.log('Sending signup request...');
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                username,
                email,
                password,
                userType,
            });
            console.log("Signup response:", response); // Trace signup response

            localStorage.setItem('token', response.data.token);

            if (response.data.userType === 'User') {
                console.log('Redirecting to user dashboard');
                navigate('/userDashboard');
            } else if (response.data.userType === 'Employee') {
                console.log('Redirecting to employee dashboard');
                navigate('/employeeDashboard');
            } else if (response.data.userType === 'Admin') {
                console.log('Redirecting to admin dashboard');
                navigate('/adminDashboard');
            }
        } catch (error) {
            console.error("Signup error:", error);
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
                                onChange={(e) => setEmail(e.target.value)}
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
                            <ReCAPTCHA
                                sitekey="6LcwhXkqAAAAAAjVneJCT6pcdpIZ1OlQpQ_scY8g"
                                onChange={onChange}
                                required
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