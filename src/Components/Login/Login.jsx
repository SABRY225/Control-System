import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginSuccess, isAdminUniversity, isAdminFaculty, isStaff } from '../../Redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import LogoUniversity from "../../assets/Logo.png";

const Login = () => {
    const [credentials, setCredentials] = useState({ userName: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userName, password } = credentials;
        
        if (!userName.trim() || !password.trim()) {
            toast.error("Please enter both username and password.");
            return;
        }
        
        try {
            const response = await axios.post(
                process.env.REACT_APP_LOGIN,
                { userName, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.success) {
                toast.success('Login successfully.');
                dispatch(loginSuccess(response.data.token));

                switch (response.data.roles) {
                    case 'AdminUniversity':
                        dispatch(isAdminUniversity());
                        navigate('/Admin_University');
                        break;
                    case 'AdminFaculity':
                        dispatch(isAdminFaculty());
                        navigate('/Admin_Faculity');
                        break;
                    case 'Staff':
                        dispatch(isStaff());
                        navigate('/Staff');
                        break;
                    default:
                        toast.error('Unknown role.');
                }
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error("Login error:", error);
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
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Username"
                                    value={credentials.userName}
                                    onChange={handleChange}
                                    style={{ color: "#34495E" }}
                                />
                            </div>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="checkbox-container wrapper-forgot-password">
                                <Link to="/forgotpassword">Forgot your password ?</Link>
                            </div>
                            <button className="btn mt-3" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
