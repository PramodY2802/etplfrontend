import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BsPersonCircle, BsLock } from 'react-icons/bs';
import '../css/login.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://etplbackend.onrender.com/auth/login', { email, password }); // Replace with your backend URL
            const token = response.data.token;
            localStorage.setItem('token', token); // Store JWT in local storage

            navigate('/home'); // Navigate to the home route
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || 'An error occurred during login');
        }
    };

    const handleProfileImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <h3 className="card-title text-center mb-4">Sign In</h3>
                        {errorMessage && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                        <div className="card-body">
                            
                            <div className="text-center mb-4">
                                <label htmlFor="profileImageInput">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="rounded-circle"
                                            style={{ width: '170px', height: '170px', objectFit: 'cover', cursor: 'pointer' }}
                                        />
                                    ) : (
                                        <BsPersonCircle
                                            style={{ width: '170px', height: '170px', cursor: 'pointer' }}
                                        />
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="profileImageInput"
                                    accept="image/*"
                                    onChange={handleProfileImageChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="bi bi-person-fill"></i>
                                        </span>
                                    </div>
                                    <input
                                        placeholder='Email'
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <BsLock />
                                        </span>
                                    </div>
                                    <input
                                        placeholder='Password'
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-between">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="rememberMe"
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="/fpass">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                >
                                    Login
                                </button>
                                <br />
                                <center>   
                                    <p>Don`t Have an Account? <Link to="/register">Register Here</Link></p> 
                                </center> 
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
