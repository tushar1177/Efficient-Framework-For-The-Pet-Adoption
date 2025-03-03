import React, { useState } from 'react';
import pug from "/public/blackpug.png";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const navigate = useNavigate();

  const handleUser = async () => {
    // Input validation
    if (!email || !password) {
      toast.error('Email and Password are required!');
      return;
    }

    const user = {
      email,
      password,
    };

    setIsLoading(true); // Show loading indicator

    try {
      const res = await axios.post('http://localhost:8080/user/login', user, { withCredentials: true });

      if (res.status === 200) {
        toast.success('Successfully logged in');
        
        // Store the token securely, either in localStorage or Cookies
        localStorage.setItem('token', res.data.token); // Using localStorage for simplicity
        navigate('/');

        // Optionally reload the page after login
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error('Login failed: ' + res.data.message);
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        toast.error('Login failed: ' + error.response.data.message || 'Something went wrong');
      } else {
        toast.error('An error occurred. Please check console.');
      }
      console.error(error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='bg-white h-[550px] w-[1000px] flex rounded-xl'>
        {/* Left side (login form) */}
        <div className='h-full w-1/2 rounded-l-xl p-10 pt-[70px] font-Mont'>
          <h1 className='text-[50px] text-center pb-10'>
            LOGIN
          </h1>

          {/* Email input */}
          <input 
            type="email"
            placeholder='Email'
            className='w-[400px] mx-[10px] px-[20px] h-[40px] border-2 rounded-sm mb-[20px]'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          {/* Password input */}
          <input 
            type="password"
            placeholder='Password'
            className='w-[400px] mx-[10px] px-[20px] h-[40px] border-2 rounded-sm mb-[20px]'
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          {/* Forgot password link */}
          <NavLink to={"/forgot-password"}>
            <p className="text-right pr-[10px]">
              Forgot Password?
            </p>
          </NavLink>

          {/* Login button */}
          <button 
            className='text-center bg-yellow-500 w-[350px] h-[50px] mx-[35px] my-6 text-[20px] rounded-full font-medium'
            onClick={handleUser}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>

          {/* Sign up link */}
          <p>
            Don't have an account?
            <NavLink to={"/signup"} className={"font-bold"}>
              Sign Up
            </NavLink>
          </p>
        </div>

        {/* Right side (image) */}
        <div className='bg-yellow-500 h-full w-1/2 rounded-r-xl'>
          <img className='pt-[74px] rounded-r-xl' src={pug} alt="Pug" />
        </div>
      </div>
    </div>
  );
}

export default Login;
