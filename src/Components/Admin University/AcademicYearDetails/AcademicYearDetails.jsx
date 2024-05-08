import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const AcademicYearDetails = () => {
  const [HeadControl, setHeadControl] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [Notes, setNotes] = useState([]);
  const { control, faculty } = useSelector((state) => state.details);
  const tok = useSelector((state) => state.auth.token);

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
      } catch (error) {
        console.log("Error fetching subjects:", error);
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
      } catch (error) {
        console.log("Error fetching head:", error);
      }
    }
    getHead();
  }, [tok]);

  const getNote = useCallback(() => {
    async function getNote() {
      try {
        const { data } = await axios.get(
          "http://localhost:5120/controlnotes/notetoheadunivarsity/" +
            control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setNotes(data);
      } catch (error) {
        console.log("Error fetching notes:", error);
      }
    }
    getNote();
  }, [tok]);

  useEffect(() => {
    getHead();
    getControlSubject();
    getNote();
  }, [getHead, getControlSubject, getNote]);

  const calculateProgressPercentage = () => {
    const finishedCount = subjects.filter((subject) => subject.isDone).length;
    return (finishedCount / subjects.length) * 100;
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

  // Calculate circle color based on whether all subjects are finished or not
  const circleColor = subjects.every((subject) => subject.isDone)
    ? "#44AA44" // Green if all subjects are finished
    : "red"; // Red if not all subjects are finished

  return (
    <div className="academic-year-details-container rtl container page">
      <div className="details-line my-5 d-sm-inline-block d-lg-flex justify-content-start align-items-center">
        <span className="fw-bold fs-5">
          كنترول {control.acaD_YEAR} كلية {faculty.name} لعام{" "}
          {control.faculity_Semester} تحت ادارة عميد الكلية{" "}
          {control.userCreator.name} ورئيس الكنترول {HeadControl}
          {/* Render circle with dynamic color */}
        </span>
        <span
          className="circle mx-3"
          style={{
            backgroundColor: circleColor,
            borderRadius: "50%",
            width: "25px",
            height: "25px",
            display: "inline-block",
          }}
        ></span>
      </div>

      <div className="subjects-container d-flex justify-content-between flex-row-reverse">
        <div className="col-md-4 text-center ">
          <Doughnut data={data} options={options}></Doughnut>
        </div>
        <div className="subjects-column">
          <h4>المواد</h4>
          {subjects.map((subject) => (
            <div key={subject.id} className="subject fs-5">
              <span>{subject.name}</span>
              {subject.isDone > 0 && (
                <FontAwesomeIcon
                  className="mx-3 fw-bold"
                  icon={faCircleCheck}
                  style={{ color: "#44AA44" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="continer">
        <div className="row justify-content-end m-3 ">
          <div className="col-md-12 text-center ">
            <div className="Table-title">ملاحظات رئيس الكنترول</div>
          </div>
        </div>
        <div className="row justify-content-center">
          {Notes.map((note) => {
            let dateObj = new Date(note.writeDate);
            let year = dateObj.getFullYear();
            let month = dateObj.getMonth() + 1;
            let day = dateObj.getDate();

            return (
              <div class="col-12 box_Notes  m-3 rtl">
                <div className="m-3 rtl" style={{ fontSize: "20px" }}>
                  {note.description}
                </div>
                <div className="d-flex justify-content-between">
                  <div className="nameOfMemberNotes rtl mx-4">
                    <div>د/ {note.writeBy.name}</div>
                  </div>
                  <div className="nameOfMemberNotes rtl mx-4">
                    <div>
                      {year}-{month}-{day}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AcademicYearDetails;
