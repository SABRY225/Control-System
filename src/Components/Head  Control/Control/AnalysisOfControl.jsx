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

export default function AnalysisOfControl() {
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  const HeadControl = control.user;
  const [controlSubjects, setControlsSubject] = useState([]);
  const [Notes, setNotes] = useState([]);
  const [countIsDone, setCountIsDone] = useState(0);

  const getControlSubject = useCallback(() => {
    const getControlSubject = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SUBJECTSOFCONTROL,
          {
            params: { Cid: control.control.id },
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        let cnt = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].isDone) cnt++;
        }
        setCountIsDone((cnt / data.length) * 100);
        setControlsSubject(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getControlSubject();
  }, [control.control.id, tok]);

  const getNote = useCallback(() => {
    const getNote = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_NOTESENDHEADCONTROL + control.control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setNotes(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNote();
  }, [control.control.id, tok]);

  useEffect(() => {
    getControlSubject();
    getNote();
  }, [getControlSubject, getNote]);

  const onSendNote = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    const jsonNote = JSON.stringify(formData);
    try {
      const response = await axios.post(
        process.env.REACT_APP_CREATENOTE + control.control.id,
        jsonNote,
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      event.target.reset();
      getNote();
    } catch (error) {
      console.log(error.message);
    }
  };

  const makeSubjectDone = async ({ id }) => {
    console.log(id);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SUBJECTISDONE}${id}/${control.control.id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + tok,
          },
        }
      );
      getControlSubject();
    } catch (error) {
      console.log(error.message);
    }
  };

  const data = {
    labels: ["المواد التي تم انجازها", "المواد التي لم يتم انجازها"],
    datasets: [
      {
        label: "Poll",
        data: [countIsDone, 100 - countIsDone],
        backgroundColor: ["rgba(68, 170, 68, 1)", "red"],
        borderColor: ["black", "red"],
      },
    ],
  };

  const options = {};

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

        {/* Subjects Table */}
        <div className="row Table-title m-5">
          <div className="m-0">
            <div className="text-end">المقرارت</div>
          </div>
          <div className="container m-1">
            <div className="row justify-content-center Table-data m-0">
              <div className="col-md-4 text-center ">
                <Doughnut data={data} options={options}></Doughnut>
              </div>
              <div className="col-md-8">
                <table className="table table-bordered m-2">
                  <thead>
                    <tr>
                      <th scope="col">اسم المقرر</th>
                      <th scope="col">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {controlSubjects.map((subject) => (
                      <tr key={subject.id} onClick={() => makeSubjectDone(subject)} style={{ cursor: "pointer" }}>
                        <td>{subject.name}</td>
                        <td>
                          {subject.isDone ? (
                            <img src={accepted} alt="accepted" className="ImagIconState" />
                          ) : (
                            <img src={notaccepted} alt="notaccepted" className="ImagIconState" />
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

        {/* Notes Control */}
        <div className="container">
          <div className="row justify-content-center m-1">
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

        {/* Display Notes */}
        <div className="container">
          <div className="row justify-content-center m-3">
            <div className="col-md-12 text-center">
              <div className="Table-title">ملاحظات من أعضاء الكنترول</div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">الوصف</th>
                    <th scope="col">التاريخ</th>
                    <th scope="col">كاتب الملاحظة</th>
                  </tr>
                </thead>
                <tbody>
                  {Notes.map((note) => {
                    let dateObj = new Date(note.writeDate);
                    let year = dateObj.getFullYear();
                    let month = dateObj.getMonth() + 1;
                    let day = dateObj.getDate();
                    return (
                      <tr key={note.id}>
                        <td>{note.description}</td>
                        <td>{`${year}-${month}-${day}`}</td>
                        <td>{`د/ ${note.writeBy.name}`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
