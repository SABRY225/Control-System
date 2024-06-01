// src/components/Header.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../Redux/authSlice';
import { setFid, setId, setName } from '../Redux/ProfileSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import './Style.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const subMenuRef = useRef(null);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const tok = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5120/Users/current-user', {
        headers: {
          'Authorization': 'Bearer ' + tok,
          'Content-Type': 'application/json'
        }
      });
      setData(data);
      console.log(data);
      dispatch(setId(data.id));
      dispatch(setFid(data.facultyID));
      dispatch(setName(data.name));
      console.log(setName(data.name));
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        dispatch(loginSuccess(''));
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    dispatch(logoutSuccess());
    navigate('/signin');
  };

  return (
    <NavBar
      role={role}
      data={data}
      toggleMenu={toggleMenu}
      isOpen={isOpen}
      subMenuRef={subMenuRef}
      logout={logout}
    />
  );
}
