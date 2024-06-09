import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const SendOtp = ({ onOtpSent }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const emailUser = useSelector((state) => state.Profile.email);
    console.log(emailUser);

    useEffect(() => {
        if (emailUser) {
            setEmail(emailUser);
        }
    }, [emailUser]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_SENDOTP}?email=${ email }`);
            setMessage('OTP sent successfully!');
            setError('');
            onOtpSent(email);
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="send-otp">
            <h2>Would you like to change your password?</h2>
            <form onSubmit={handleSendOtp}>
                <button type="submit">Change Password <FontAwesomeIcon icon={faKey} /></button>
            </form>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default SendOtp;
