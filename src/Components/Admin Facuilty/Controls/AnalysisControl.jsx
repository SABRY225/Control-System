import React, { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

// ChartJS registration
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnalysisControl() {
  // State variables and Redux selectors
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  const HeadControl = control.user;
  const [controlSubjects, setControlsSubject] = useState([]);
  const [Notes, setNotes] = useState([]);
  const [countIsDone, setCountIsDone] = useState(0);

  // Function to fetch control subjects
  const getControlSubject = useCallback(() => {
    const getControlSubject = async () => {
      try {
        // API call to fetch control subjects
        const { data } = await axios.get(
          process.env.REACT_APP_SUBJECTSOFCONTROL,
          {
            params:{Cid:control.control.id},
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        // Logic to calculate countIsDone
        let cnt = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].isDone) cnt++;
        }
        setCountIsDone((cnt / data.length) * 100);
        setControlsSubject(data);
      } catch (error) {
        toast.error('Error fetching control subjects: ' + error.message);
      }
    };
    getControlSubject();
  }, [control.control.id, tok]);

  // Function to fetch notes
  const getNote = useCallback(() => {
    const getNote = async () => {
      try {
        // API call to fetch notes
        const { data } = await axios.get(
          process.env.REACT_APP_NOTESENDHEADFACULTY + control.control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setNotes(data);
      } catch (error) {
        toast.error('Error fetching notes: ' + error.message);
      }
    };
    getNote();
  }, [control.control.id, tok]);

  // useEffect to fetch data on component mount
  useEffect(() => {
    getControlSubject();
    getNote();
  }, [getControlSubject, getNote]);

  // Function to handle sending note
  const onSendNote = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    try {
      // API call to send note
      const response = await axios.post(
        `${process.env.REACT_APP_CREATENOTE}${control.control.id}` ,
        JSON.stringify(formData),
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success('Note is sent successfully');
      event.target.reset();
    } catch (error) {
      toast.error('Error sending note: ' + error.message);
    }
  };

  // Chart data and options
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
  const options = {};
  return (
    <>
    <ToastContainer />
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
{/* Table Material Control */}
<div className="container">
  <div className="row justify-content-center Table-data m-0">
    <div className="col-md-4 text-center">
      <Doughnut data={data} options={options}></Doughnut>
    </div>
    <div className="col-md-8 rtl">
      <table className="table">
        <thead>
          <tr>
            <th>اسم المقرر</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {controlSubjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.name}</td>
              <td>
                {subject.isDone > 0 && (
                  <FontAwesomeIcon
                    className="mx-3 fw-bold"
                    icon={faCircleCheck}
                    style={{
                      color: "#44AA44",
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
