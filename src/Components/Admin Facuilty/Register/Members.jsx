import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./FromRegisterStyle.css";

export default function Members() {
  const tok = useSelector((state) => state.auth.token);
  const onSubmit = async (event) => {
    event.preventDefault();

    // Convert form data to JSON
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    console.log(formData);

    try {
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);

      const response = await axios.post(
        process.env.REACT_APP_REGISTER,
        jsonData, // Pass JSON data here
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      event.target.reset();
      toast.success("User registered successfully!");
    } catch (error) {
      alert("يرجي اعادة المحاولة ")

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
              <input id="username" type="text" name="userName" required/>
            </div>
            <div className="control-row-register col">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </div>
            <div className="control-row-register col">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" required/>
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
