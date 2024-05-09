import React from "react";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
import { toast } from "react-toastify";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function LayoutAPP() {
  const notifyOffline = () => {
    toast.error("You are currently offline", {
      position: "top-right",
    });
  };

  return (
    <>
{/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable /> */}

      <Header />
      <Offline>{notifyOffline()}</Offline>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
