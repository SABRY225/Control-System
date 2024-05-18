import React, { useCallback, useEffect, useState } from "react";
import accepted from "../../../assets/accepted.png";
import notaccepted from "../../../assets/notAccepted.png";
import { useSelector } from "react-redux";
import axios from "axios";

export default function DetaliesWork_schedule() {
  const [controlMembers, setControlsMember] = useState([]);
  const [controlSubjects, setControlsSubject] = useState([]);
  const [Notes, setNotes] = useState([]);
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);

  const HeadControl = control.user.name;

  const getControlMember = useCallback(() => {
    const getControlMember = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_USEROFCONTROL ,
          {
            params:{controlId:control.control.id},
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
  }, [control.control.id,tok]);

  const getControlSubject = useCallback(() => {
    const getControlSubject = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SUBJECTOFCONTROL,
          {
            params:{controld:control.control.id},
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
        process.env.REACT_APP_CONTROLNOTES ,
        jsonNote,
        {
          params:{Cid:control.control.id},
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
    
  return (
    <div className="container rtl">
      {/* Title control */}
      <div className="rtl details-line my-5 d-sm-inline-block d-lg-flex justify-content-start align-items-center">
        <span className="Title-Control rtl">
          كنترول لعام {control.control.acaD_YEAR} تحت ادارة رئيس الكنترول د/{" "}
          {HeadControl}
        </span>
      </div>
      {/* Title Table*/}
      <div className="row Table-title m-5">
        <div className=" text-end">
          <div>أعضاء الكنترول</div>
        </div>
      </div>
      {/* Table Member Control */}
      <div className="row justify-content-center Table-data">
        {controlMembers.map((member) => {
          // console.log(member.JobType);
          if (member.jobType === "Member") {
            return (
              <div className="col-md-3 Column-Table rtl">
                <div className="text-column-table">د/ {member.user.name}</div>
              </div>
            );
          }
        })}
      </div>

      {/* Title Table*/}
      <div className="row Table-title m-5">
        <div className=" text-end">
          <div>المقرارات</div>
        </div>
      </div>
      {/* Table Member Control */}
      <div className="row justify-content-center Table-data">
        {controlSubjects.map((subject) => {
          console.log(subject.isDone);
          return (
            <div className="col-md-4 Column-Table d-flex flex-row-reverse justify-content-end">
              <div className="text-2-column-table">{subject.name}</div>
              <div className="state-column-table ">
                {subject.isDone ? (
                  <img
                    src={accepted}
                    alt="accepted"
                    className="ImagIconState"
                  />
                ) : (
                  <img
                    src={notaccepted}
                    alt="notaccepted"
                    className="ImagIconState"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="continer " style={{marginBottom:"3rem"}}>
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
