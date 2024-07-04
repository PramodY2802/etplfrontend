import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { Modal, Button } from 'react-bootstrap';
import '../css/register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (name.length <= 5) {
            setErrorMessage('Name must be greater than 5 characters');
            setShowAlert(true);
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage('Invalid email format');
            setShowAlert(true);
            return false;
        }
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{5,}$/;
        if (!passwordPattern.test(password)) {
            setErrorMessage('Password must be at least 5 characters long, include one special character, and one uppercase letter');
            setShowAlert(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('dateOfBirth', dateOfBirth);
            formData.append('email', email);
            formData.append('password', password);
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }

            await axios.post('https://etplbackend.onrender.com/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setShowModal(true); // Show the success modal
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || 'An error occurred during registration');
            setShowAlert(true);
        }
    };

    const handleProfileImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    return (
        <div style={{ background: 'linear-gradient(to bottom, #0fcae3, #88b3a6)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='card1'>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    {showAlert && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="mb-3">
                        <center>
                            <label htmlFor="profileImageInput">
                                {profileImage ? (
                                    <img
                                        src={URL.createObjectURL(profileImage)}
                                        alt="Profile"
                                        className="rounded-circle"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                                    />
                                ) : (
                                    <BsPersonCircle
                                        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                                    />
                                )}
                            </label>
                        </center>
                        <input
                            type="file"
                            id="profileImageInput"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                            <input
                                placeholder='Enter Name Here'
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-calendar"></i>
                            </span>
                            <input
                                placeholder='Select date of birth'
                                type="date"
                                className="form-control"
                                id="dateOfBirth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input
                                placeholder='Enter Email Here'
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input
                                placeholder='Enter Password Here'
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-4">Register</button>
                    <br />
                    <center>
                        <p>Already have an Account? <Link to="/">Go to Login</Link></p>
                    </center>
                </form>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your account has been created successfully.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => navigate('/')}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Register;
