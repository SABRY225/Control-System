import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./FromRegisterStyle.css";

export default function Materiales() {
  const tok = useSelector((state) => state.auth.token);
  const [facultyNode, setFacultyNode] = useState([]);

  const getNode = useCallback(() => {
    async function getCurUser() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_CURRENTUSER,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        console.log(response.data);
        const facultyID  = response.data.faculityLeaderID;
        try {
          const responseNode = await axios.get(
            process.env.REACT_APP_GETFACULITYNODE + facultyID,
            {
              headers: {
                Authorization: "Bearer " + tok,
              },
            }
          );
          console.log("Faculty node fetched successfully:", responseNode);
          setFacultyNode(responseNode.data); // Update facultyNode state here
        } catch (error) {
          console.error("Error fetching faculty node:", error);
          toast.error("Failed to fetch faculty node. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        toast.error("Failed to fetch current user. Please try again.");
      }
    }
    getCurUser();
  }, [tok]);

  // Call getNode() within useEffect to ensure it's called after component mount
  useEffect(() => {
    getNode();
  }, [getNode]);

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
        process.env.REACT_APP_ADDSUBJECT,
        jsonData, // Pass JSON data here
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      event.target.reset();
      console.log("Subject added successfully:", response.data);
      toast.success("Subject registered successfully!");
    } catch (error) {
      console.error("Error adding subject:", error);
      toast.error("Failed to register subject. Please try again.");
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
            <div className="control-row-register col col-lg-6">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" required/>
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="code">Code</label>
              <input id="code" type="text" name="code" required/>
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="credit_Hours">Credit Hours</label>
              <input id="credit_Hours" type="number" name="credit_Hours" required />
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="faculty_node">Faculty Node</label>
              <select
                className="form-select"
                id="faculty_node"
                name="faculityNodeID"
                required
              >
                {facultyNode.map(fn => {
                  return <option key={fn.code} value={fn.code}>{fn.name}</option>
                })}
              </select>
            </div>
          </div>
          <button type="submit" className="mt-3">
            اضافة مادة جديد
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
