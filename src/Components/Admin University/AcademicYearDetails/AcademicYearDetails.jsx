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
          process.env.REACT_APP_SUBJECTSOFCONTROL ,
          {
            params:{Cid:control.id},
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
          process.env.REACT_APP_GETHEADOFCONTROL + control.id,
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
          process.env.REACT_APP_NOTESENDHEADUNIVARSITY+ control.id,
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
    labels: ["المواد التي تم انجازها", "المواد التي لم يتم انجازها"],
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
      <div className="details-line my-5 d-sm-inline-block d-lg-flex justify-content-start align-items-center" style={{fontSize:"1rem"}}>
        <span className=" fs-5">
          كنترول {control.name} كلية {faculty.name} لعام{" "}
          {control.acaD_YEAR} {" "}
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

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h4>المواد</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">اسم المادة</th>
                  <th scope="col">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>
                      {subject.isDone ? (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          style={{ color: "#44AA44" }}
                        />
                      ) : (
                        "لم يتم الانتهاء"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="col-md-6">
            <Doughnut data={data} options={options}></Doughnut>
          </div> */}
        </div>
      </div>

      <div className="container m-3">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h4>ملاحظات عميد الكلية</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">الملاحظة</th>
                  <th scope="col">المكتوب بواسطة</th>
                  <th scope="col">تاريخ الكتابة</th>
                </tr>
              </thead>
              <tbody>
                {Notes.map((note) => (
                  <tr key={note.id}>
                    <td>{note.description}</td>
                    <td>{note.writeBy.name}</td>
                    <td>
                      {new Date(note.writeDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicYearDetails;
