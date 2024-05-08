import React, { useCallback, useEffect, useState } from "react";
import accepted from "../../../assets/accepted.png";
import notaccepted from "../../../assets/notAccepted.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function AnalysisControl() {
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  const HeadControl = control.user.name;
  const [controlSubjects, setControlsSubject] = useState([]);
  const [Notes, setNotes] = useState([]);
  const getControlSubject = useCallback(() => {
    const getControlSubject = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5120/Subject/subjects-of-control?controld=" +
            control.control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setControlsSubject(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getControlSubject();
  }, []);
    
  const getNote = useCallback(() => {
    const getNote = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5120/controlnotes/notetoheadfaculty/" +
            control.control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setNotes(data);
        // console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNote();
  }, []);

  useEffect(() => {
    getControlSubject();
    getNote();
  }, [getControlSubject,getNote]);

//   const onSendNote = async (event) => {
//     event.preventDefault();

//     const fd = new FormData(event.target);
//     const formData = Object.fromEntries(fd.entries());
//     console.log(formData);
//       const jsonNote = JSON.stringify(formData);
//     try {
//       const response = await axios.post(
//         "http://localhost:5120/controlnotes?Cid=" + control.control.id,
//         jsonNote,
//         {
//           headers: {
//             Authorization: "Bearer " + tok,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

  //   const data = {
  //     labels: ["المواد التي تم انجازها", "المواد التي لو يتم انجازها"],
  //     datasets: [
  //       {
  //         lable: "Poll",
  //         data: [60, 40],
  //         backgroundColor: ["rgba(68, 170, 68, 1)", "red"],
  //         borderColor: ["black", "red"],
  //       },
  //     ],
  //     };
  //   console.log(controlSubjects);
  const options = {};
  const isAccepted = true;
  return (
    <>
      <div className="container">
        {/* Title control */}
        <div className="row text-center">
          <div className="col-12">
            <div className="Title-Control rtl">
              كنترول لعام {control.control.acaD_YEAR} تحت ادارة رائس الكنترول د/{" "}
              {HeadControl}
            </div>
          </div>
        </div>

        {/* Title Table*/}
        <div className="row Table-title m-5">
          <div className="m-0">
            <div className=" text-end">المقرارت</div>
          </div>
          {/* Table Material Control */}
          <div className="container">
            <div className="row justify-content-center Table-data m-0">
              <div className="col-md-4 text-center ">
                {/* <Doughnut data={data} options={options}></Doughnut> */}
              </div>
              <div className="col-md-8 rtl ">
                {controlSubjects.map((subject) => (
                  <div key={subject.id} className="subject fs-5">
                    <span>{subject.name}</span>
                    <FontAwesomeIcon
                      className="mx-3 fw-bold"
                      icon={faCircleCheck}
                      style={{ color: subject.isDone ? "#44AA44" : "#757575" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Notes Control */}
      {/* Send Nots */}
      <div className="continer">
        <div className="row justify-content-center m-1 ">
          <div className="col-10 border border-info p-3 rounded">
            <form >
              <textarea
                placeholder="....ما هي ملاحظاتك"
                rows="5"
                cols="65"
                className="col-12 TextAreaFiled text-end"
                name="note"
              ></textarea>
              <button className="btnSendNotes">Send</button>
            </form>
          </div>
        </div>
      </div>
      {/* resever Nots */}
      <div className="continer">
        <div className="row justify-content-end m-3 ">
          <div className="col-md-12 text-center ">
            <div className="Table-title">ملاحظات رئيس الكنترول</div>
          </div>
        </div>
        <div className="row justify-content-center">
          {Notes.map((note) => {
            return (
              <div class="col-12 box_Notes  m-3">
                <div className="boxNotes_Title">{note.description}</div>
                <div className="row justify-content-center">
                  <div className="col-md-6 nameOfMemberNotes">
                    <div>{note.writeDate}</div>
                  </div>
                  <div className="col-md-6  nameOfMemberNotes rtl">
                    <div>د/ {note.writeBy.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
