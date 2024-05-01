import React from 'react';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../../Redux/detailsSlice';
import { academicYears } from './academicYears';
import './DetailsOfControl.css';
import { useNavigate } from 'react-router-dom'; 

const DetailsOfControl = ({ faculty }) => {
  const semester = "23/24"; // Mocked semester value (can be fetched from admin settings or API)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleYearClick = (yearInfo) => {
    const { year, committeeName, committeeNickname, status } = yearInfo;
    dispatch(setDetails({ year, committeeName, committeeNickname, status, faculty, semester}));
    console.log("clicked !!");
    console.log(year, committeeName, committeeNickname, status, faculty, semester);
    navigate('/AcademicYearDetails');
  };

  return (
    <div className="container mt-4">
      <div className="page">
        <div className="row justify-content-center text-center years-of-controls">
          <div className="col-md-12 my-3">
            <h4>Semester - {semester}</h4>
          </div>

          {/* Displaying Academic Years */}
          {academicYears.map((yearInfo, index) => (
            <div key={index} className="col-md-5">
              <div
                style={{ cursor: 'pointer' }}
                className="d-flex flex-column justify-content-center align-items-center rounded-2 mt-4 p-3 border border-3"
                onClick={() => handleYearClick(yearInfo)} // Call handleYearClick on click
              >
                <div className="d-flex">
                  <h5 className="mx-5">{yearInfo.year}</h5>
                  <p className="mx-5">
                    {yearInfo.committeeName} <br />
                    <span className="fw-bold" style={{ color: "#43BBFF" }}>
                      {yearInfo.committeeNickname}
                    </span>
                  </p>
                </div>
                <div className={`status-indicator ${yearInfo.status}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsOfControl;