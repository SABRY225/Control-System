import React, { useCallback, useEffect, useState } from "react";
import "./styleControls.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setDetails } from "../../../Redux/detailsSlice";


export default function InformationControl() {
  const [controls, setControls] = useState([]);
  const [stateOfControls, setStateOfControls] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tok = useSelector((state) => state.auth.token);
  const Fid = useSelector((state) => state.Profile.Fid);
  const semester = `${new Date().getFullYear()}/${
    new Date().getFullYear() - 1
  }`;
  const getControls = useCallback(() => {
    const getControls = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_CONTROLS + Fid,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        for (const control of data) {
          console.log(control.acaD_YEAR);
          if (control.acaD_YEAR==semester) {
            setStateOfControls(true)
            try {
            const {
              data: { user },
            } = await axios.get(
              process.env.REACT_APP_HEADCONTROL + control.id,
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
          }else{
            console.log("plaplaplaplalapala");
          }

        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getControls();
  }, [Fid]);

  useEffect(() => {
    getControls();
  }, [getControls]);

  const handleSendControl = (control) => {
    console.log(control);
    dispatch(setDetails({ control: control }));
    navigate("control");
  };
console.log(stateOfControls);
  return (
    <div className="container HomeClassInfoControls">
      {/* Semes_Acad_Title */}
      <div className="row  text-center Semes_Acad_Title m-2">
        <div className="col  Semes_Acad_Title-col">{semester}</div>
      </div>
      {/* Semes_Acad_Title */}
      <div className="container ClassesControls">
        <div className="row justify-content-center">
          {stateOfControls===true ? <>
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
          })}</>:<>
          
          <div className="col-md-12 my-3">
                <p className="text-center fs-2 fw-bold">لم يتم انشاء كنترولات لحد الان</p>
              </div>
          </>}
        </div>
      </div>
    </div>
  );
}
