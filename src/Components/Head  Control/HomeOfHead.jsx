import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDetails } from "../../Redux/detailsSlice.jsx";

export default function HomeOfHead() {
  const [controls, setControls] = useState([]);
  const [me, setMe] = useState();
  const Fid = useSelector((state) => state.Profile.Fid);
  const tok = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            //   console.log( control);
            setControls((prev) => [...prev, { user, control }]);
          } catch (e) {
            console.log(e.message);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const getMe = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5120/users/current-user",
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setMe(data.id);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMe();
    getControls();
  }, [Fid]);

  useEffect(() => {
    getControls();
  }, [getControls, Fid]);

  const handleSendControl = (control) => {
    // console.log(control);
    dispatch(setDetails({ control: control }));
    if (control.user.id == me) navigate("./control");
    else navigate("controlMember");
  };
  return (
    <div className="container HomeClassInfoControls">
      {/* Semes_Acad_Title */}
      <div className="container ClassesControls">
        <div className="row justify-content-center">
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
