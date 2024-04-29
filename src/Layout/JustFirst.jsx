import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Component/Header";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { Home } from "../Components/Admin Facuilty";

export default function JustFirst() {
  return (
    <>
     {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable /> */}

      <Header/>
      <Home />
      <Outlet />
    </>
  );
}
