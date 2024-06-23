import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDetails } from "../../Redux/detailsSlice.jsx";

export default function HomeOfHead() {
  const [controls, setControls] = useState([]);
  const Uid = useSelector((state) => state.Profile.id)
  const Fid = useSelector((state) => state.Profile.Fid);
  const tok = useSelector((state) => state.auth.token);
  const [headID,setHeadID]= useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const semester = `${new Date().getFullYear()}/${new Date().getFullYear() - 1
    }`;
  const getControls = useCallback(() => {
    const getControls = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_GETCONTROLSFORUSER}/${Uid}`,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        console.log(data);
        // setControls(data)
        for (const DetilesControl of data) {
          const control = DetilesControl.control
          console.log(control);
          try {
            if (control.acaD_YEAR == semester) {
              const res= await axios.get(
                process.env.REACT_APP_GETHEADOFCONTROL+control.id,
                {
                  headers: {
                    Authorization: "Bearer " + tok,
                  },
                }
              );
                console.log(res);
                const Head=res.data.name
                const HeadID=res.data.id
                setHeadID(res.data.id);
              setControls((prev) => [...prev, { Head,HeadID, control }]);
            }
          } catch (e) {
            console.log(e.message);
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
  }, [getControls, Fid]);

  const handleSendControl = async(control) => {
    console.log(control);
    // console.log(headID);
    console.log(Uid);
    try {
        const res= await axios.get(
          process.env.REACT_APP_GETHEADOFCONTROL+control.control.id,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
          console.log(res.data.id);
          console.log(control.HeadID);
          dispatch(setDetails({ control: control }));
          if (res.data.id === Uid) navigate("./control");
          else navigate("controlMember");
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(controls);
  return (
    <div className="container HomeClassInfoControls">
      {/* Semes_Acad_Title */}
      <div className="container ClassesControls">
        <div className="row justify-content-center">
          {
            controls.length>0 ? <>
              {controls.map((control,index) => {
                // console.log(control.control);
                return (
                  <div
                    className="col-4 m-3 boxControl pointer-event"
                    onClick={() => handleSendControl(control)}
                    key={index}
                  >
                    <div className="row">
                      <div className="col-6 dataofControl">
                        <div className="nameOfHeadControl">{control.Head}</div>
                        <div className="nameOfJob">رئيس الكنترول</div>
                      </div>
                      <div className="col-6 text-center nameOfControl">
                        <div>{control.control.name}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
              :
              <>
                <div className="col-md-12 my-3">
                  <p className="text-center fs-2 fw-bold">لم يتم انشاء كنترولات حتى الان</p>
                </div>
              </>
          }

        </div>
      </div>
    </div>
  );
}