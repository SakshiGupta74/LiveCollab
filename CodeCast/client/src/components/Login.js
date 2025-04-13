import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils.js';
import { ToastContainer } from 'react-toastify';
import { Link } from  'react-router-dom';
import logo from '../gallery/logo.png'

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
      };
    
      const handleLogin = async (e) => {
        e.preventDefault();
        
        const { email, password } = loginInfo;
        if (!email || !password) {
          return handleError("email and password are required");
        }
        try {
          const url = `https://livecollab-eqcd.onrender.com/auth/login`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
          });
          const result = await response.json();
          const { success, message, jwtToken, name, error } = result;
          if (success) {
            handleSuccess(message);
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("loggedInUser", name);
            setTimeout(() => {
              navigate("/Home");
            }, 1000);
          } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
          } else if (!success) {
            handleError(message);
          }
          console.log(result);
        } catch (err) {
          handleError(err);
        }
      };
  return (
   <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <img src={logo} alt="Logo" className="logo" />
        
        <h2>Login</h2>


        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
               onChange={handleChange}
               type='email'
               name='email'
               placeholder='Enter your email...'
               value={loginInfo.email}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
               onChange={handleChange}
               type='password'
               name='password'
               placeholder='Enter your password...'
               value={loginInfo.password}
            />
          </div>

          <button type="submit" className="btn">Login</button>
        </form>

        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
      <ToastContainer />
    </div>
 


  );
};

export default Login;
