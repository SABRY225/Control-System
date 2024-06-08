import axios from "axios";
import "./FromRegisterStyle.css";
import React from "react";
import { useSelector } from "react-redux";

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
      alert("تم تسجيل المستخدم بنجاح")
    } catch (error) {
      let err;
      if (error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessages = [];
        for (let key in errors) {
          if (errors.hasOwnProperty(key)) {
            errorMessages.push(errors[key]);
          }
        }
        err = errorMessages.join("\n");
      }
      else err = error.response.data;
      console.log(error);
      alert(err);

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
              <label htmlFor="username">name-user</label>
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
    </>
  );
}