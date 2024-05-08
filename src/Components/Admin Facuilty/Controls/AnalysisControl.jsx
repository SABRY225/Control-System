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
  const [countIsDone, setCountIsDone] = useState(0);

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
        let cnt = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].isDone) cnt++;
        }
        // console.log(cnt,(cnt / data.length) * 100);
        setCountIsDone((cnt / data.length) * 100);
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
  }, [getControlSubject, getNote]);

  const onSendNote = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    console.log(formData);
    const jsonNote = JSON.stringify(formData);
    try {
      const response = await axios.post(
        "http://localhost:5120/controlnotes?Cid=" + control.control.id,
        jsonNote,
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      event.target.reset();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const data = {
    labels: ["المواد التي تم انجازها", "المواد التي لو يتم انجازها"],
    datasets: [
      {
        lable: "Poll",
        data: [countIsDone, 100 - countIsDone],
        backgroundColor: ["rgba(68, 170, 68, 1)", "red"],
        borderColor: ["black", "red"],
      },
    ],
  };
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
                <Doughnut data={data} options={options}></Doughnut>
              </div>
              <div className="col-md-8">
                {controlSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="subject fs-5 d-flex flex-row-reverse"
                  >
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
            </div>
          </div>
        </div>
      </div>
      {/*  Notes Control */}
      {/* Send Nots */}
      <div className="continer">
        <div className="row justify-content-center m-1 ">
          <div className="col-10 border border-info p-3 rounded">
            <form onSubmit={onSendNote}>
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
      {/* resever Nots */}
      <div className="continer">
        <div className="row justify-content-end m-3 ">
          <div className="col-md-12 text-center ">
            <div className="Table-title">ملاحظات رئيس الكنترول</div>
          </div>
        </div>
        <div className="row justify-content-center">
          {Notes.map((note) => {
            let dateObj = new Date(note.writeDate);
            // Extract year, month, and day from the date object
            let year = dateObj.getFullYear();
            let month = dateObj.getMonth() + 1; // Months are zero-indexed, so add 1
            let day = dateObj.getDate();

            return (
              <div class="col-12 box_Notes  m-3">
                <div className="boxNotes_Title">{note.description}</div>
                <div className="d-flex justify-content-between">
                  <div className="nameOfMemberNotes rtl mx-4">
                    <div>
                      {year}-{month}-{day}
                    </div>
                  </div>
                  <div className="nameOfMemberNotes rtl mx-4">
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
