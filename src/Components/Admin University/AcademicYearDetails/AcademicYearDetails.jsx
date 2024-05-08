import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
// import { subjects } from "./subjects";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const AcademicYearDetails = () => {
  // Retrieve yearInfo from Redux store using useSelector
  const [HeadControl, setHeadControl] = useState("");
  const [subjects, setSubjects] = useState([]);
  const { control, faculty } = useSelector((state) => state.details);
  const tok = useSelector((state) => state.auth.token);
  // console.log(control);
  const getControlSubject = useCallback(() => {
    async function getControlSubject() {
      try {
        const response = await axios.get(
          "http://localhost:5120/Subject/subjects-of-control?controld=" +
            control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setSubjects(response.data);
        console.log("Login successful:", response.data);
      } catch (error) {
        console.log("Login error:", error);
      }
    }
    getControlSubject();
  }, [tok]);

  const getHead = useCallback(() => {
    async function getHead() {
      try {
        const response = await axios.get(
          "http://localhost:5120/users/headConrol/" + control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setHeadControl(response.data.user.name);
        // console.log("Login successful:", response.data);
      } catch (error) {
        console.log("Login error:", error);
      }
    }
    getHead();
  }, [tok]);
  // Call getNode() within useEffect to ensure it's called after component mount
  useEffect(() => {
    getHead();
    getControlSubject();
  }, [getHead]);

  // Function to render progress circles based on subject status
  const renderProgressCircles = () => {
    return subjects.map((subject) => {
      const isFinished = subject.isDone;
      const circleColor = isFinished ? "green" : "gray";
      const checkColor = isFinished ? "green" : "gray";

      return (
        <div
          key={subject.id}
          className="progress-circle"
          style={{ borderColor: circleColor }}
        >
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: checkColor }} />
        </div>
      );
    });
  };

  // Function to calculate and render progress percentage
  const calculateProgressPercentage = () => {
    const finishedCount = subjects.filter((subject) => subject.finished).length;
    const progressPercentage = (finishedCount / subjects.length) * 100;
    return progressPercentage.toFixed(2); // Round to two decimal places
  };

  const data = {
    labels: ["المواد التي تم انجازها", "المواد التي لو يتم انجازها"],
    datasets: [
      {
        lable: "Poll",
        data: [
          calculateProgressPercentage(),
          100 - calculateProgressPercentage(),
        ],
        backgroundColor: ["rgba(68, 170, 68, 1)", "red"],
        borderColor: ["black", "red"],
      },
    ],
  };
  const options = {};

  return (
    <div className="academic-year-details-container rtl container page">
      <div className="details-line my-5 d-sm-inline-block d-lg-flex justify-content-start align-items-center">
        <span className="fw-bold fs-5">
          كنترول {control.acaD_YEAR} كلية {faculty.name} لعام{" "}
          {control.faculity_Semester} تحت ادارة عميد الكلية{" "}
          {control.userCreator.name} ورئيس الكنترول {HeadControl}
        </span>
      </div>

      <div className="subjects-container">
        <div
          className="progress-circle-container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="subjects-column">
            <h4>المواد</h4>
            {subjects.map((subject) => (
              <div key={subject.id} className="subject fs-5">
                <span>{subject.name}</span>
                {subject.isDone > 0 && (
                  <FontAwesomeIcon
                    className="mx-3 fw-bold"
                    icon={faCircleCheck}
                    style={{
                      color: "#44AA44",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center ">
            <Doughnut data={data} options={options}></Doughnut>
          </div>
        </div>
      </div>
      <div className="continer">
        <div className="row justify-content-center m-1 ">
          <div className="col-10 border border-info p-3 rounded">
            <form>
              <textarea
                placeholder="....ما هي ملاحظاتك"
                rows="5"
                cols="65"
                className="col-12 TextAreaFiled text-end"
                name="description"
              ></textarea>
              <button className="btnSendNotes">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicYearDetails;
