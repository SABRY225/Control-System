import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoUniversity from "../../assets/Logo.png"

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const email = useSelector((state) => state.auth.email);


    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.put(process.env.REACT_APP_RESETPASSWORD, { otp, newPassword, email });
            setMessage('Password reset successfully.');
            navigate('/signin'); 
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className='HomeLogin  '>
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="wrapper-reset-password wrapper">
                        <div className="logo">
                            <img src={LogoUniversity} alt="LogoUniversity" className='ImageLogo' />
                        </div>
                        <div className="text-center mt-4 name">
                            South Valley Universtiy
                        </div>
                        <form className="p-3 mt-3" onSubmit={handleSubmit}>
                            <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    placeholder="Enter OTP" 
                                    onChange={handleOtpChange}
                                    required
                                    style={{ color: "#34495E" ,fontSize:"14px"}}
                                />
                            </div>
                            <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    placeholder="Enter New Password" 
                                    onChange={handleNewPasswordChange}
                                    required
                                    style={{ color: "#34495E" ,fontSize:"14px"}}
                                />
                            </div>
                            <button type="submit" className='btn'>Reset Password</button>
                        </form>
                        {message && <p className="success-message">{message}</p>}
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
