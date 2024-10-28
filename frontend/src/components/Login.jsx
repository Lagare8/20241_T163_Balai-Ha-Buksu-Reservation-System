  import React, { useEffect, useState } from 'react'
  import './login.css'


  function Login() {
      const url=process.env.APIURL;
      const [data,setdata]=useState('');
      const func=async()=>{
          const res=await fetch(`${url}/Home/Intro`,{
              method:"GET",
              headers: {'Content-Type':'application/json'}
          });
          const dat=await res.json();
          console.log(dat);
          setdata(dat);
      }
      useEffect(()=>{
        func();
      },[])
      return (
        
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg d-flex">
                <div className="p-4 bg-light rounded-left" style={{ maxWidth: '500px' }}>
                <img src="/assets/Shield_logo_of_Bukidnon_State_University.png" alt="BUKSU Logo" className="mb-3" style={{maxHeight: '100px'}} />

                    <h2 className="text-center mb-3">Welcome to BUKSU Hotel</h2>
                    <input type="text" placeholder="User name or Email" className="form-control mb-3" />
                    <input type="password" placeholder="Password" className="form-control mb-3" />
                    <button className="btn btn-primary btn-block mb-3">Log In</button>
                    <p className="text-center mb-3">Open with</p>
                    <button className="btn btn-light btn-block d-flex align-items-center justify-content-center">
                        <i className="fab fa-google mr-"></i> Google
                    </button>
                </div>
                <div className="p-4 d-flex align-items-center justify-content-center" style={{ maxWidth: '400px' }}>
                    <div className="text-center">
                        <img src="/assets/lgo.png" alt="BUKSU Hotel Logo" className="mb-3" />
                        <h2>BUKSU HOTEL</h2>
                        <p>Laboratory</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  export default Login