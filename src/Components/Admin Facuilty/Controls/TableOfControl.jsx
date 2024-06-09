import React, { useCallback, useEffect, useState } from "react";
import accepted from "../../../assets/accepted.png";
import notaccepted from "../../../assets/notAccepted.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function TableOfControl() {
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);
  const HeadControl = control.user;
  const [controlMembers, setControlsMember] = useState([]);
  const [controlSubjects, setControlsSubject] = useState([]);

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
        // toast.success("Members data fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch members data: " + error.message);
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
        // toast.success("Subjects data fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch subjects data: " + error.message);
      }
    };
    getControlSubject();
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
              كنترول لعام {control.control.acaD_YEAR} تحت ادارة رائس الكنترول د/{" "}
              {HeadControl}
            </div>
          </div>
        </div>

      {/* Control Members Table */}
      <div className="row Table-title m-5">
        <div className="text-end">
          <h5>اعضاء الكنترول</h5>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th scope="col">الاسم</th>
              </tr>
            </thead>
            <tbody>
              {controlMembers
                .filter((member) => member.jobType === "Member")
                .map((member) => (
                  <tr key={member.user.id}>
                    <td>د/ {member.user.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Control Subjects Table */}
      <div className="row Table-title m-5">
        <div className="text-end">
          <h5>المقرارات</h5>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th scope="col">المقرر</th>
                <th scope="col">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {controlSubjects.map((subject) => (
                <tr key={subject.id}>
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
  );
}
