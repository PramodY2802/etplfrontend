import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; // Import the CSS file
import { BsEnvelope, BsKey } from 'react-icons/bs';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [modalMessage, setModalMessage] = useState(''); // State for modal message
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://etplbackend.onrender.com/auth/forget-password', { email });
            setIsOtpSent(true);
            setError('');
            setModalMessage('OTP sent successfully to your email.');
            setShowModal(true); // Show modal
        } catch (error) {
            console.error(error);
            setError('Error sending OTP. Please try again.');
            setModalMessage('Error sending OTP. Please try again.');
            setShowModal(true); // Show modal
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://etplbackend.onrender.com/auth/verify-otp-email', { email, otp });
            setModalMessage('OTP verified successfully. You can now reset your password.');
            setShowModal(true); // Show modal
            navigate('/rpass');
        } catch (error) {
            console.error(error);
            setError('Incorrect OTP. Please try again.');
            setModalMessage('Incorrect OTP. Please try again.');
            setShowModal(true); // Show modal
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal
    };

    return (

        
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                      
                         {/* Modal component for showing alerts */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{error ? 'Error' : 'Success'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


                        <h3 className="card-title text-center mb-4">
                            {isOtpSent ? 'Verify OTP' : 'Forget Password'}
                        </h3>
                        <div className="card-body">
                            {!isOtpSent ? (
                                <form onSubmit={handleEmailSubmit}>
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <BsEnvelope />
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
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    >
                                        Send OTP
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleOtpSubmit}>
                                    <div className="form-group input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <BsKey />
                                            </span>
                                        </div>
                                        <input
                                            placeholder='Enter OTP'
                                            type="text"
                                            className="form-control"
                                            id="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    >
                                        Verify OTP
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

         
        </div>
    );
};

export default ForgetPassword;
