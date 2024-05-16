import React, { useCallback, useEffect, useState } from "react";
import accepted from "../../../assets/accepted.png";
import notaccepted from "../../../assets/notAccepted.png";
import { useSelector } from "react-redux";
import axios from "axios";
export default function TableOfControl() {
  const control = useSelector((state) => state.details.control);
  const tok = useSelector((state) => state.auth.token);

  const HeadControl = control.user.name;
  const isAccepted = true;
  const [controlMembers, setControlsMember] = useState([]);
  const [controlSubjects, setControlsSubject] = useState([]);

  const getControlMember = useCallback(() => {
    const getControlMember = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_USEROFCONTROL,
          {
            params:{controlId:control.control.id},
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setControlsMember(data);
        //   console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getControlMember();
  }, []);

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

  return (
    <div className="container rtl">
      {/* Title control */}
      <div className="rtl details-line my-5 d-sm-inline-block d-lg-flex justify-content-start align-items-center">
        <span className="fw-bold fs-5">
          كنترول لعام {control.control.acaD_YEAR} تحت ادارة رائس الكنترول د/{" "}
          {HeadControl}
        </span>
      </div>
      {/* Title Table*/}
      <div className="row Table-title m-5">
        <div className=" text-end">
          <div>اعضاء الكنترول</div>
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
    </div>
  );
}
