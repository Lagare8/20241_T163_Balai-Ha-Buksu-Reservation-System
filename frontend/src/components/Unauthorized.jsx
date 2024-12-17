import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <button 
                style={{ textAlign: 'center', fontSize: '25px' }} 
                onClick={() => navigate('/')} // Correct navigation
            >
                Back to Home
            </button>
        </div>
    );
};

export default Unauthorized;
