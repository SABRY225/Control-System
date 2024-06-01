// src/components/ChangePassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const ChangePassword = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5120/change-password', {
                email,
                otp,
                newPassword,
            });
            setMessage('Password changed successfully!');
        } catch (error) {
            setMessage('Failed to change password. Please try again.');
        }
    };

    return (
        <div className="change-password">
            <h2>  Change Password <FontAwesomeIcon icon={faKey} /></h2>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ChangePassword;
