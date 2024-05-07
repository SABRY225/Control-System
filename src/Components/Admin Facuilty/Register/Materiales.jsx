import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./FromRegisterStyle.css";

export default function Materiales() {
  const tok = useSelector((state) => state.auth.token);
  const [facultyNode, setFacultyNode] = useState([]);

  const getNode = useCallback(() => {
    async function getCurUser() {
      try {
        const response = await axios.get(
          "http://localhost:5120/users/current-user",
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        const { facultyID } = response.data;
        console.log(facultyID);
        try {
          const responseNode = await axios.get(
            "http://localhost:5120/faculty/node/" + facultyID,
            {
              headers: {
                Authorization: "Bearer " + tok,
              },
            }
          );
          console.log("Login successful:", responseNode.data);
          setFacultyNode(responseNode.data); // Update facultyNode state here
        } catch (error) {
          console.log("Login error:", error);
        }
      } catch (error) {
        console.log("Login error:", error);
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
        "http://localhost:5120/subject/add",
        jsonData, // Pass JSON data here
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      event.target.reset();
      console.log("Login successful:", response.data);
    } catch (error) {
      console.log("Login error:", error);
    }
  };
  // console.log(facultyNode);
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
              <input id="name" type="text" name="name" />
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="code">Code</label>
              <input id="code" type="text" name="code" />
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="credit_Hours">Credit Hours</label>
              <input id="credit_Hours" type="number" name="credit_Hours" />
            </div>
            <div className="control-row-register col col-lg-6">
              <label htmlFor="faculty_node">Faculty Node</label>
              <select
                class="form-select"
                id="faculty_node"
                name="faculityNodeID"
              >
                {facultyNode.map(fn => {
                  return <option value={fn.code}>{fn.name}</option>
                })}
              </select>
            </div>
          </div>
          <button type="submit" class="mt-3">
            اضافة مادة جديد
          </button>
        </form>
      </div>
    </>
  );
}
