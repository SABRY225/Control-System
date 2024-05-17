import React from "react";
import { useDispatch } from "react-redux";
import { setDetails } from "../../../Redux/detailsSlice";
import "./DetailsOfControl.css";
import { useNavigate } from "react-router-dom";

const DetailsOfControl = ({ faculty }) => {
  const { controls } = faculty;

  const semester = `${new Date().getFullYear()}/${
    new Date().getFullYear() - 1
  }`;
  // Mocked semester value (can be fetched from admin settings or API)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleYearClick = (yearInfo) => {
    dispatch(setDetails({ control:yearInfo, faculty }));
    navigate("./AcademicYearDetails");
  };
  return (
    <div className="container mt-4">
      <div className="page">
        <div className="row justify-content-center text-center years-of-controls">
          <div className="col-md-12 my-3">
            <h4>{semester}</h4>
          </div>

          {/* Displaying Academic Years */}
          {controls.map((control) => (
            <div key={control.id} className="col-md-5">
              <div
                style={{ cursor: "pointer" }}
                className="d-flex flex-column justify-content-center align-items-center rounded-2 mt-4 p-3 border border-3"
                onClick={() => handleYearClick(control)} // Call handleYearClick on click
              >
                <div className="d-flex w-100 justify-content-evenly">
                  <h5>{control.name}</h5>
                  <p>
                    {control.userCreator.name} <br />
                    <span className="fw-bold" style={{ color: "#43BBFF" }}>
                      عميد الكلية
                    </span>
                  </p>
                </div>
                {/* <div className={`status-indicator ${yearInfo.status}`} /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsOfControl;
