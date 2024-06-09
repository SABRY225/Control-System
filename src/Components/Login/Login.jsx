import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginSuccess, isAdminUniversity, isAdminFaculty, isStaff } from '../../Redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import LogoUniversity from "../../assets/Logo.png";

function Login() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (userName.trim() === "" || password.trim() === "") {
            toast.error("Please enter both username and password.");
            return;
        }
        try {
            console.log(process.env.REACT_APP_LOGIN);
            const response = await axios.post(
                process.env.REACT_APP_LOGIN,
                { userName, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.success) {
                setMessage('Login successfully.');
                toast.success('Login successfully.');
                if (response.data.roles === 'AdminUniversity') {
                    dispatch(isAdminUniversity());
                    navigate('/Admin_University');
                } else if (response.data.roles === 'AdminFaculity') {
                    dispatch(isAdminFaculty());
                    navigate('/Admin_Faculity');
                } else if (response.data.roles === 'Staff') {
                    dispatch(isStaff());
                    navigate('/Staff');
                }
                dispatch(loginSuccess(response.data.token));
            } else {
                setError('An error occurred. Please try again.');
                toast.error('An error occurred. Please try again.');
            }
        } catch (error) {
            console.log("Login error:", error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className='HomeLogin'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="wrapper">
                        <div className="logo">
                            <img src={LogoUniversity} alt="LogoUniversity" className='ImageLogo' />
                        </div>
                        <div className="text-center mt-4 name">
                            South Valley University
                        </div>
                        <form className="p-3 mt-3" onSubmit={handleSubmit}>
                            <div className="form-field d-flex align-items-center">
                                <span className="far fa-user"></span>
                                <input type="text" name="userName" id="userName" placeholder="Username" value={userName}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{ color: "#34495E" }} />
                            </div>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <input type="password" name="password" id="pwd" placeholder="Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="checkbox-container">
                                <Link to="/forgotpassword">
                                    Forgot your password?
                                </Link>
                            </div>
                            <button className="btn mt-3">Login</button>
                        </form>
                        {message && <p className="success-message">{message}</p>}
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
