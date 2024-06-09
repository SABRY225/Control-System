import React, { useCallback, useEffect, useState } from "react";
import "./styleControls.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setDetails } from "../../../Redux/detailsSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function InformationControl() {
  const [controls, setControls] = useState([]);
  const [stateOfControls, setStateOfControls] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tok = useSelector((state) => state.auth.token);
  const Fid = useSelector((state) => state.Profile.Fid);
  const semester = `${new Date().getFullYear()}/${new Date().getFullYear() - 1}`;

  const getControls = useCallback(() => {
    const fetchControls = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_GETCONTROLSBYFACULITYID}${Fid}`,
          {
            params: { fid: Fid },
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );

        const controlsData = [];
        for (const control of data) {
          if (control.acaD_YEAR === semester) {
            setStateOfControls(true);
            try {
              const { data: nameData } = await axios.get(
                process.env.REACT_APP_GETHEADOFCONTROL + control.id,
                {
                  headers: {
                    Authorization: "Bearer " + tok,
                  },
                }
              );
              const user = nameData.name;
              controlsData.push({ user, control });
            } catch (e) {
              toast.error("Failed to fetch head of control: " + e.message);
            }
          }
        }
        setControls(controlsData);
        toast.success("Controls data fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch controls data: " + error.message);
      }
    };
    fetchControls();
  }, [Fid, tok, semester]);

  useEffect(() => {
    getControls();
  }, [getControls]);

  const handleSendControl = (control) => {
    console.log(controls);
    dispatch(setDetails({ control: control }));
    navigate("control");
  };

  return (
    <div className="container HomeClassInfoControls">
      <ToastContainer />
      {/* Semes_Acad_Title */}
      <div className="row text-center Semes_Acad_Title m-2">
        <div className="col Semes_Acad_Title-col">{semester}</div>
      </div>
      {/* Semes_Acad_Title */}
      <div className="container ClassesControls">
        <div className="row justify-content-center">
          {stateOfControls ? (
            controls.map((control) => (
              <div
                className="col-12 col-sm-6 col-md-4 m-3 boxControl pointer-event"
                onClick={() => handleSendControl(control)}
                key={control.control.id}
              >
                <div className="row">
                  <div className="col-6 dataofControl">
                    <div className="nameOfHeadControl">{control.user}</div>
                    <div className="nameOfJob">رئيس الكنترول</div>
                  </div>
                  <div className="col-6 text-center nameOfControl">
                    <div>{control.control.name}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-12 my-3">
              <p className="text-center fs-2 fw-bold">
                لم يتم انشاء كنترولات حتى الان
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
