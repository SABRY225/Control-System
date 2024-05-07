import React from "react";
import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import Login from "../Components/Login/Login";

export default function JustFirst() {
  return (
    <>
     {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable /> */}

      <Login />
      {/* <Outlet /> */}
    </>
  );
}
