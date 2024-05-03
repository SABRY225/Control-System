
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
                    <div class="wrapper">
                        <div class="logo">
                            <img src={LogoUniversity} alt="LogoUniversity" className='ImageLogo' />
                        </div>
                        <div class="text-center mt-4 name">
                        South Valley Universtiy
                        </div>
                        <form class="p-3 mt-3">
                            <div class="form-field d-flex align-items-center">
                                <span class="far fa-user"></span>
                                <input type="text" name="userName" id="userName" placeholder="Email / Username" />
                            </div>
                            <div class="form-field d-flex align-items-center">
                                <span class="fas fa-key"></span>
                                <input type="password" name="password" id="pwd" placeholder="Password" />
                            </div>
                            <button class="btn mt-3">Login</button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login