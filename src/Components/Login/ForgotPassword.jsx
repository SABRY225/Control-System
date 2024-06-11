import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setEmail } from "../../Redux/authSlice";
import { useDispatch } from 'react-redux';
import "./Login.css"
import LogoUniversity from "../../assets/Logo.png"


const ForgotPassword = () => {
    const [email, setEmailInput] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_FORGETPASSWORD}?email=${encodeURIComponent(email)}`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data.message);
            dispatch(setEmail(email))
            navigate('/new-password'); // استخدام navigate بدلاً من navigator
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className='HomeLogin  '>
            <div className="container">
                <div className="row justify-content-center ">
                    <div className=" wrapper-forgot-password wrapper">
                        <div className="logo">
                            <img src={LogoUniversity} alt="LogoUniversity" className='ImageLogo' />
                        </div>
                        <div className="text-center mt-4 name">
                            South Valley Universtiy
                        </div>
                        <form className="p-3 mt-3" onSubmit={handleSubmit}>

                            <div  className="form-field d-flex align-items-center">
                            <span className="far fa-user"></span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Your Email" 
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    style={{ color: "#34495E" ,fontSize:"14px"}}
                                />
                            </div>
                            <button type="submit" className='btn'>Send code </button>
                        </form>
                        {message && <p className="success-message">{message}</p>}
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ForgotPassword;
