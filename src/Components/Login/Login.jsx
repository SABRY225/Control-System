
import React, {useState } from "react";
import { useDispatch } from 'react-redux';
import { loginSuccess, isAdminUniversity, isAdminFaculty, isStaff } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import LogoUniversity from "../../assets/Logo.png"

function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userName.trim() === "" || password.trim() === "") {
            alert("Please enter both username and password.");
            return;
        }
        try {
            // Make a POST request to the authentication endpoint
            const response = await axios.post(
                'http://localhost:5120/Account/login',
                { userName, password },{
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // Handle successful login
            console.log("Login successful:", response.data);
            if (response.data.roles === 'AdminUniversity') {
                dispatch(isAdminUniversity());
                navigate('/Admin_University');
            } else if (response.data.roles === 'AdminFaculty')  {
                dispatch(isAdminFaculty());
                navigate('/Admin_Facuilty');
            }else if (response.data.roles === 'Staff')  {
                dispatch(isStaff());
                navigate('/Staff');
            }
            dispatch(loginSuccess(response.data.token));
            console.log(response.data);
        } catch (error) {
            console.log("Login error:", error);
        }
    };

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
                        <form class="p-3 mt-3" onSubmit={handleSubmit}>
                            <div class="form-field d-flex align-items-center">
                                <span class="far fa-user"></span>
                                <input type="text" name="userName" id="userName" placeholder="Username" value={userName}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{color:"#34495E"}} />
                            </div>
                            <div class="form-field d-flex align-items-center">
                                <span class="fas fa-key"></span>
                                <input type="password" name="password" id="pwd" placeholder="Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
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