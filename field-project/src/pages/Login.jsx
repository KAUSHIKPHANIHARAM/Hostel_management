import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { loginContextObj } from '../contexts/LoginContext.jsx'
import '../Style/Login.css';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { currentUser, loginStatus, loginError, userLogin, userLogout } = useContext(loginContextObj)

    useEffect(() => {
        if (loginStatus === true) {
            navigate('/user-profile')
        }
    }, [loginStatus])
    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="text-center">User Login</h1>
                <form onSubmit={handleSubmit(userLogin)}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Username" {...register('username')} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" {...register('password')} required />

                    <button type="submit" className="btn btn-success">Login</button>
                </form>
                <p className="text-center">
                    New User? <Link to="/register">Register Here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
