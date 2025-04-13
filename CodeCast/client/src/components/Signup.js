import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { Link } from 'react-router-dom';
import logo from '../gallery/logo.png'


const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    console.log('signup info->',signupInfo);
    
    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `https://livecollab-eqcd.onrender.com/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
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
    }

  return (
   
 
    <div className="signup-container">
      <div className="signup-box">
        {/* Logo */}
        <img src={logo} alt="Logo" className="logo" />
        
        <h2>Create an Account</h2>

    

        <form >
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
               onChange={handleChange}
               type='text'
               name='name'
               autoFocus
               placeholder='Enter your name...'
               value={signupInfo.name}
            />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
             onChange={handleChange}
             type='email'
             name='email'
             placeholder='Enter your email...'
             value={signupInfo.email}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={signupInfo.password}
            />
          </div>

          <button type="submit" className="btn" onClick={handleSignup}>Sign Up</button>
        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <ToastContainer/>
    </div>
  
);
};

export default Signup;
