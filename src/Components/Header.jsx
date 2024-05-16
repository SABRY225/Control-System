import React, { useEffect, useState } from 'react'
import "./Style.css"
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess, setName } from '../Redux/authSlice';
import {setFid, setId} from '../Redux/ProfileSlice'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Header() {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);
    const tok = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const { data } = await axios.get('http://localhost:5120/Users/current-user', {
            headers: {
                'Authorization': 'Bearer ' + tok,
                "Content-Type": "application/json"
            }
        });
        setData(data);
        } catch (error) {
            if(error.message ==="Request failed with status code 401"){
                dispatch(loginSuccess(""))
            }
        }

    };
    useEffect(() => {
        getData();
    }, []);
    console.log(data);
    dispatch(setId(data.id))  
    dispatch(setFid(data.facultyID))  
    dispatch(setName(data.name));

    const logout = () => {
        dispatch(logoutSuccess())
        navigate('/signin')

    };
    if (role === 'AdminFaculty') {
        return (
            <>
                <nav className="navbar navbar-expand-lg " style={{ background: "rgba(152, 218, 255, 1)" }}>
                    <div className="container-fluid">
                        <div className="navbar-brand Logo" style={{ marginLeft: "5%" }} >لجان الكنترولات</div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item nav-item-navbar">
                                    <Link class="nav-link " to='/Admin_Facuilty/'>الكنترولات </Link>
                                </li>
                                <li class="nav-item nav-item-navbar">
                                    <Link class="nav-link " to="/Admin_Facuilty/CreateControl">ادارة الكنترولات </Link>
                                </li>
                                <li class="nav-item nav-item-navbar">
                                    <Link class="nav-link" to='/Admin_Facuilty/Register'>التسجيل </Link>
                                </li>
                                <li class="nav-item nav-item-navbar">
                                    <Link class="nav-link" to='/Admin_Facuilty/Records'>السجل </Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <div className='User'>
                                    <div className='UserText'>{data.name}</div>
                                    <div ><img className='UserImage' src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="" /></div>
                                </div>
                                <button class="btn btn-outline-dark " type="submit" onClick={logout}>LOGOUT</button>
                            </div>

                        </div>
                    </div>
                </nav>
            </>
        )
    } else if (role === 'AdminUniversity') {
        return (
            <>
                <nav className="navbar navbar-expand-lg " style={{ background: "rgba(152, 218, 255, 1)" }}>
                    <div className="container-fluid">
                        <div className="navbar-brand Logo" style={{ marginLeft: "5%" }} >لجان الكنترولات</div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item nav-item-navbar">
                                    <Link class="nav-link active" to="/Admin_University/">الكنترولات </Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <div className='User'>
                                    <div className='UserText'>{data.name}</div>
                                    <div ><img className='UserImage' src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="" /></div>
                                </div>
                                <button class="btn btn-outline-dark " type="submit" onClick={logout}>LOGOUT</button>
                            </div>

                        </div>
                    </div>
                </nav>
            </>
        )
    } else if (role === 'Staff') {
        return (
          <>
            <nav
              className="navbar navbar-expand-lg "
              style={{ background: "rgba(152, 218, 255, 1)" }}
            >
              <div className="container-fluid">
                <div className="navbar-brand Logo" style={{ marginLeft: "5%" }}>
                  لجان الكنترولات
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item nav-item-navbar">
                      <Link className="nav-link active" to="/Staff/">
                        الكنترولات
                      </Link>
                    </li>
                  </ul>
                  <div className="d-flex">
                    <div className="User">
                      <div className="UserText">{data.name}</div>
                      <div>
                        <img
                          className="UserImage"
                          src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <button
                      class="btn btn-outline-dark "
                      type="submit"
                      onClick={logout}
                    >
                      LOGOUT
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </>
        );
    } 
    
}



