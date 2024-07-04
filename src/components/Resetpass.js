import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsLock } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = [];

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.push('Invalid email format.');
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{5,}$/;
        if (!passwordPattern.test(password)) {
            errors.push('Password must be at least 5 characters long, include one special character, and one uppercase letter.');
        }

        if (password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await axios.post('https://etplbackend.onrender.com/auth/reset-password', { email, password });
            setShowSuccessModal(true); // Show success modal on successful password reset
        } catch (error) {
            console.error(error);
            setErrors(['Failed to reset password. Please try again.']);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/'); // Navigate to login or home page after closing modal
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <h3 className="card-title text-center mb-4">Reset Password</h3>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {errors.length > 0 && (
                                    <div className="alert alert-danger">
                                        <ul>
                                            {errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="form-group input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope-fill"></i>
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
                                <div className="form-group input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <BsLock />
                                        </span>
                                    </div>
                                    <input
                                        placeholder='Enter New Password'
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <BsLock />
                                        </span>
                                    </div>
                                    <input
                                        placeholder='Confirm Password'
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                >
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Reset Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your password has been successfully reset. You can now log in with your new password.
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleCloseModal}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ResetPassword;
