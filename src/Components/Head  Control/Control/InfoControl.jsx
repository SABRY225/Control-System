import React, { useCallback, useEffect, useState } from "react";
import accepted from "../../../assets/accepted.png";
import notaccepted from "../../../assets/notAccepted.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function InfoControl() {
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  console.log(control);
  const HeadControl = control.user;
  const [controlMembers, setControlsMember] = useState([]);
  const [controlSubjects, setControlsSubject] = useState([]);

  // Fetch control members
  const getControlMember = useCallback(() => {
    const fetchControlMember = async () => {
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
        toast.success("Members fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch members: " + error.message);
      }
    };
    fetchControlMember();
  }, [control.control.id, tok]);

  // Fetch control subjects
  const getControlSubject = useCallback(() => {
    const fetchControlSubject = async () => {
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
        toast.success("Subjects fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch subjects: " + error.message);
      }
    };
    fetchControlSubject();
  }, [control.control.id, tok]);

  useEffect(() => {
    getControlMember();
    getControlSubject();
  }, [getControlMember, getControlSubject]);

  return (
    <div className="container rtl">
      <ToastContainer />
        {/* Title control */}
        <div className="row text-center">
          <div className="col-12">
            <div className="Title-Control rtl">
              كنترول لعام {control.control.acaD_YEAR} تحت ادارة رئيس الكنترول د/{" "}
              {HeadControl}
            </div>
          </div>
        </div>
      {/* Members Table */}
      <div className="row Table-title m-5">
        <div className="text-end">
          <h3>أعضاء الكنترول</h3>
        </div>
      </div>
      <div className="row justify-content-center Table-data">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">الاسم</th>
              <th scope="col">الوظيفة</th>
            </tr>
          </thead>
          <tbody>
            {controlMembers.map((member, index) => (
              member.jobType === "Member" && (
                <tr key={index}>
                  <td>د/ {member.user.name}</td>
                  <td>عضو كنترول</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      {/* Subjects Table */}
      <div className="row Table-title m-5">
        <div className="text-end">
          <h3>المقرارات</h3>
        </div>
      </div>
      <div className="row justify-content-center Table-data">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">اسم المقرر</th>
              <th scope="col">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {controlSubjects.map((subject, index) => (
              <tr key={index}>
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
  );
}
