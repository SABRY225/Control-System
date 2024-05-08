import React, { useCallback, useEffect, useState } from "react";
import "./styleControls.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setDetails } from "../../../Redux/detailsSlice";


export default function InformationControl() {
  const [controls, setControls] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tok = useSelector((state) => state.auth.token);
  const Fid = useSelector((state) => state.Profile.Fid);
  const semester = `${new Date().getFullYear()}/${
    new Date().getFullYear() + 1
  }`;
  const getControls = useCallback(() => {
    const getControls = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5120/Controls/" + Fid,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        for (const control of data) {
          // console.log(control);
          try {
            const {
              data: { user },
            } = await axios.get(
              "http://localhost:5120/users/headConrol/" + control.id,
              {
                headers: {
                  Authorization: "Bearer " + tok,
                },
              }
            );
            // console.log(user);
            setControls((prev) => [...prev, { user, control }]);
          } catch (e) {
            console.log(e.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getControls();
  }, []);

  useEffect(() => {
    getControls();
  }, [getControls]);

  const handleSendControl = (control) => {
    console.log(control);
    dispatch(setDetails({ control: control }));
    navigate("control");
  };

  return (
    <div className="container HomeClassInfoControls">
      {/* Semes_Acad_Title */}
      <div className="row  Semes_Acad_Title m-2">
        <div className="col-5  text-end Semes_Acad_Title-col">{semester}</div>
        <div className="col-2   Semes_Acad_Title-col">-</div>
        <div className="col-5   text-start Semes_Acad_Title-col">
          semester 2
        </div>
      </div>
      {/* Semes_Acad_Title */}
      <div className="container ClassesControls">
        <div className="row justify-content-center">
          {/* Start  */}
          {controls.map((control) => {
            // console.log(control.control);
            return (
              <div
                className="col-4 m-3 boxControl pointer-event"
                onClick={() => handleSendControl(control)}
              >
                <div className="row">
                  <div className="col-6 dataofControl">
                    <div className="nameOfHeadControl">{control.user.name}</div>
                    <div className="nameOfJob">رئيس الكنترول</div>
                  </div>
                  <div className="col-6 text-center nameOfControl">
                    <div>{control.control.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
