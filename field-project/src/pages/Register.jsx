import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import '../Style/Register.css';

function Register() {
    const { register, handleSubmit, watch } = useForm();
    const navigate = useNavigate();
    const [err, setErr] = useState(null);
    const password = watch("password");

    const handleFormSubmit = async (formObj) => {
        if (formObj.password !== formObj.confirmPassword) {
            setErr({ message: "Passwords do not match" });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/users', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formObj.username,
                    email: formObj.email,
                    password: formObj.password
                })
            });

            if (response.status === 201) {
                navigate('/login');
            } else {
                setErr({ message: "Failed to register. Please try again." });
            }
        } catch (error) {
            setErr({ message: error.message });
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Register</h1>
                {err && <p className="error-message">{err.message}</p>}
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Username" {...register('username')} required />

                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder="Email" {...register('email')} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" {...register('password')} required />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" {...register('confirmPassword')} required />

                    <button type="submit" className="btn btn-success">Register</button>
                </form>
                <p className="text-center">
                    Already Registered? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
