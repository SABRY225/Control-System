import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./FromRegisterStyle.css";

export default function Members() {
  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const response = await axios.post(
        process.env.REACT_APP_REGISTER,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      event.target.reset();
      toast.success("User registered successfully!");
    } catch (error) {
      toast.error("Registration failed, please try again.");
    }
  };

  return (
    <>
      <div className="containerRegister">
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="row">
            <div className="control-row-register col">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" required />
            </div>
            <div className="control-row-register col">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" name="userName" required />
            </div>
            <div className="control-row-register col">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </div>
            <div className="control-row-register col">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" required />
            </div>
            <div className="control-row-register col">
              <label htmlFor="cp">Confirm Password</label>
              <input id="cp" type="password" name="confirmPassword" required />
            </div>
            <div className="control-row-register col">
              <label htmlFor="scientificDegree">Scientific Degree</label>
              <input
                id="scientificDegree"
                type="text"
                name="scientificDegree"
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-3">
            اضافة عضو جديد
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
