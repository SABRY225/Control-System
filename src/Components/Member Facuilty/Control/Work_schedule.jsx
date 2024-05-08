import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import DetaliesWork_schedule from "./DetaliesWork_schedule";
import Task_schedule from "./Task_schedule";
export default function Work_schedule() {
  const [isControlActive, setIsControlActive] = useState(true);
  const [isTaskActive, setIsTaskActive] = useState(false);

  const [showanalysis, setShowanalysis] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showControl, setShowControl] = useState(true);

  const handelAnalaysisClick = () => {
    setIsControlActive(false);
    setIsTaskActive(false);

    setShowanalysis(true);
    setShowTask(false);
    setShowControl(false);
  };
  const handelControlClick = () => {
    setIsControlActive(true);
    setIsTaskActive(false);

    setShowanalysis(false);
    setShowTask(false);
    setShowControl(true);
  };
  const handelTaskClick = () => {
    setIsControlActive(false);
    setIsTaskActive(true);

    setShowanalysis(false);
    setShowTask(true);
    setShowControl(false);
  };
  return (
    <>
      <div className="container text-center ">
        <div className="d-flex pt-2 pl-2 ">
          <div className="col-md m-2 ">
            <button
              className="btn mx-3"
              style={{
                backgroundColor: isTaskActive ? "#43BBFF" : "#98DAFF",
                color: isTaskActive ? "white" : "black",
                boxShadow: isTaskActive ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
              }}
              onClick={handelTaskClick}
            >
              المهام
            </button>
          </div>
          <div className="col-md  m-2">
            <button
              className="btn mx-3"
              style={{
                backgroundColor: isControlActive ? "#43BBFF" : "#98DAFF",
                color: isControlActive ? "white" : "black",
                boxShadow: isControlActive
                  ? "0 4px 8px rgba(0,0,0,0.2)"
                  : "none",
              }}
              onClick={handelControlClick}
            >
              الكنترول
            </button>
          </div>
        </div>
        {showControl && <DetaliesWork_schedule />}
        {showTask && <Task_schedule />}
      </div>
    </>
  );
}
