import React, {useState } from 'react';
import '../index.css';

function Login() {
    const [userType, setUserType] = useState('User'); // Define userType state

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg d-flex">
                <div className="p-4 bg-light rounded-left" style={{ maxWidth: '500px' }}>
                    <img src="/assets/Shield_logo_of_Bukidnon_State_University.png" alt="BUKSU Logo" className="mb-3" style={{ maxHeight: '150px', marginLeft: "110px", marginTop: "40px" }} />
                    <h2 className="text-center mb-3">Welcome to BUKSU Hotel</h2>
                    {/* User Type Dropdown */}
                    <select 
                        className="form-select mb-3" 
                        value={userType} 
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="User">User</option>
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <input type="text" placeholder="User name or Email" className="form-control mb-3" />
                    <input type="password" placeholder="Password" className="form-control mb-3" />
                    <button className="btn btn-primary mb-3" style={{marginLeft: "140px"}}>Log In</button>
                    <p className="text-center mb-3" style={{marginRight: "20px"}}>Open with</p>
                    <button className="btn btn-light btn-block d-flex align-items-center justify-content-center" style={{marginLeft: "130px"}}>
                        <i className="fab fa-google ml-5"></i> Google
                    </button>
                </div>
                <div className="p-4 d-flex align-items-center justify-content-center" style={{ maxWidth: '500px' }}>
                    <div className="text-center">
                        <img src="/assets/lgo.png" alt="BUKSU Hotel Logo" className="mb-3" style={{}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
