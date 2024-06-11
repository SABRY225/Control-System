import React, { useCallback, useEffect, useState } from "react";
import accepted from "../../../assets/accepted.png";
import notaccepted from "../../../assets/notAccepted.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function DetaliesWork_schedule() {
  const [controlMembers, setControlsMember] = useState([]);
  const [controlSubjects, setControlsSubject] = useState([]);
  const [Notes, setNotes] = useState([]);
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  console.log(control);
  const HeadControl = control.user;

  const getControlMember = useCallback(() => {
    const getControlMember = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_GETUSERSFORCONTROL,
          {
            params: { controlId: control.control.id },
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setControlsMember(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getControlMember();
  }, [control.control.id, tok]);

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
        setControlsSubject(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getControlSubject();
  }, []);

  useEffect(() => {
    getControlMember();
    getControlSubject();
  }, [getControlMember]);

  const onSendNote = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    console.log(formData);
    const jsonNote = JSON.stringify(formData);
    try {
      const response = await axios.post(
        process.env.REACT_APP_CREATENOTE+control.control.id,
        jsonNote,
        {
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data)
      event.target.reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container rtl">
     <ToastContainer />

      <div className="rtl details-line my-5 d-sm-inline-block d-lg-flex justify-content-start align-items-center">
        <span className="Title-Control rtl">
          كنترول لعام {control.control.acaD_YEAR} تحت ادارة رئيس الكنترول د/{" "}
          {HeadControl}
        </span>
      </div>

      <div className="row Table-title m-5">
        <div className="col text-end">
          <div>أعضاء الكنترول</div>
        </div>
      </div>

      <div className="row justify-content-center Table-data">
        <table className="table table-bordered">
          <tbody>
            {controlMembers.map((member) => {
              if (member.jobType === "Member") {
                return (
                  <tr key={member.user.id}>
                    <td>د/ {member.user.name}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      <div className="row Table-title m-5">
        <div className="col text-end">
          <div>المقرارات</div>
        </div>
      </div>

      <div className="row justify-content-center Table-data">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>اسم المقرر</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {controlSubjects.map((subject) => {
              console.log(subject.isDone);
              return (
                <tr key={subject.id}>
                  <td>{subject.name}</td>
                  <td>
                    <img
                      src={subject.isDone ? accepted : notaccepted}
                      alt={subject.isDone ? "accepted" : "notaccepted"}
                      className="ImagIconState"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="container " style={{ marginBottom: "3rem" }}>
        <div className="row justify-content-center m-1 ">
          <div className="col-10 border  p-3 rounded">
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
    </div>
  );
}
