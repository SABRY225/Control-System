import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const tok = useSelector((state) => state.auth.token);
    const handleChangePassword = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(process.env.REACT_APP_CHANGEPASSWORD, {
                currentPassword,
                otp,
                newPassword,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                }
            });
            toast.success('Password changed successfully!');
        } catch (error) {
            console.log(error);
            toast.error('Failed to change password. Please try again.');
        }
    }, [email, otp, newPassword, currentPassword, tok]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="wrapper-chande-password wrapper">
                    <h2 className='name text-center'>Change Password <FontAwesomeIcon icon={faKey} /></h2>
                    <form className="p-3 mt-3" onSubmit={handleChangePassword}>
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                            <input
                                type="text"
                                value={otp}
                                placeholder='Enter OTP'
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                style={{ color: "#34495E", fontSize: "14px" }}
                            />
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                            <input
                                type="password"
                                value={currentPassword}
                                placeholder='Enter Current Password'
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                style={{ color: "#34495E", fontSize: "14px" }}
                            />
                        </div>
                        <div className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                            <input
                                type="password"
                                value={newPassword}
                                placeholder='Enter New Password'
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                style={{ color: "#34495E", fontSize: "14px" }}
                            />
                        </div>
                        <button type="submit" className='btn'>Change Password</button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
