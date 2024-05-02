
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, isStudent, isTeacher, setName } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import icon_user from "../../assets/icon_user.png";
import icon_password from "../../assets/icon_password.png";
import LogoUniversity from "../../assets/Logo.png"
const onEscape = function (action) {
    window && window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            action();
        };
    });
};
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [removeFocus, setRemoveFocus] = useState(false);
    const myInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "") {
            setError("Please enter both username and password.");
            return;
        }
        // try {
        //     // Make a POST request to the authentication endpoint
        //     const response = await axios.post(
        //         'https://edume-app-88352f017fde.herokuapp.com/auth/login',
        //         { username, password }
        //     );
        //     // Handle successful login
        //     console.log("Login successful:", response.data);
        //     console.log("role:", response.data.role);
        //     if (response.data.role === 'student') {
        //         dispatch(isStudent());
        //     } else {
        //         dispatch(isTeacher());
        //     }
        //     let name = response.data.firstName + " " + response.data.lastName;
        //     dispatch(setName(name));

        //     dispatch(loginSuccess());
        //     toast.success(`Wellcome ${response.data.firstName}😊`);
        //     navigate('/Home');

        // } catch (error) {
        //     // Handle login error
        //     console.error("Login error:", error);
        //     setError("Invalid username or password. Please try again.");
        // }
    };
    const descRef = useRef();
    onEscape(() => {
        descRef.blur();
    });

    return (
        <div className='HomeLogin  '>
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="col-12 BorderLogin m-5">
                        {/* Start Logo */}
                        <div className="Logo text-center">
                            <img src={LogoUniversity} alt="LogoUniversity" className='ImageLogo' />
                            <div className="TextLogo">
                                <div className='Text '>South Valley Universtiy</div>
                            </div>
                        </div>
                        {/* End Logo */}
                        <form onSubmit={handleSubmit} className="m-3">
                            <div className="BlockInput">
                                <img src={icon_user} alt="" className="icon_user" />
                                <input type="email"
                                    name="username"
                                    id="username"
                                    ref={descRef}
                                    className="inputFiled"
                                    placeholder="Enter your Username / Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="BlockInput">
                                <img src={icon_password} alt="" className="icon_user" />
                                <input type="Password"
                                    name="Password"
                                    id="Password"
                                    ref={descRef}
                                    className="inputFiled"
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="text-center">
                                <button className="btnSend">Login</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login