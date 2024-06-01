// src/components/SendOtp.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faKey } from '@fortawesome/free-solid-svg-icons';

const SendOtp = ({ onOtpSent }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5120/send-otp', { email });
            setMessage('OTP sent successfully!');
            onOtpSent(email);
        } catch (error) {
            setMessage('Failed to send OTP. Please try again.');
        }
    };

    return (
        <div className="send-otp">
            <h2>Would you like to change your password ?</h2>
            <form onSubmit={handleSendOtp}>
                <button type="submit">Change Password <FontAwesomeIcon icon={faKey} /></button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SendOtp;
