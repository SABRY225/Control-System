import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import { updateControlDetails, clearControlDetails,removeControl  } from '../../../../Redux/controlSlice';

const ControlList = () => {
  const controls = useSelector((state) => state.control.controls);
  const controlDetails = useSelector((state) => state.control.controlDetails);
  const dispatch = useDispatch(); 
  

  const handleControlClick = (control) => {
    // dispatch(updateControlDetails(control)); // Update control details in Redux state
  };

  const handleDeleteControl = (control) => {
    dispatch(removeControl(control)); // Dispatch removeControl action with control ID
    console.log('Deleting control:', control);
    // dispatch(clearControlDetails()); // Clear control details from Redux state
    // Additional logic can be added here (e.g., showing a confirmation modal)
  };

  return (
    
     <div className="container mt-4">
      <div className="page rtl" >
      {controls.length === 0 ? (
            <div className="col-md-12 my-3">
              <p className="text-center fs-2 fw-bold">لا يوجد لجان كنترول في الوقت الحالي</p>
            </div>
          ) : (
        <div className="row justify-content-center text-center years-of-controls">
        <div className="col-md-12 my-3">
            <h4>{controlDetails.term} - {controlDetails.academicYear}</h4>
          </div>
          {/* Displaying Controls */}
          {controls.map((control, index) => (
            <div key={index} className="col-md-5">
              <div
                className="d-flex flex-column justify-content-center align-items-center rounded-2 mt-4 p-3 border border-3 control-card"
                // onClick={() => handleControlClick(control)} // Call handleControlClick on click
              >
                <div className="d-flex">
                  <h5 className="mx-5">{control.selectedAcademicYear}</h5>
                  <p className="mx-5">
                  {control.chairpersons} <br />
                    <span className="fw-bold" style={{ color: "#43BBFF" }}>
                      رئيس الكنترول
                    </span>
                  </p>
                </div>
                {/* Icons for delete and settings */}
                <div className="d-flex align-items-center mt-3">
                  <FontAwesomeIcon
                    className='mx-5'
                    icon={faTrashAlt}
                    style={{ color: '#FF0000', cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => handleDeleteControl(control)} // Pass control ID or unique identifier
                  />
                  <FontAwesomeIcon  className='mx-5' icon={faCog} style={{ color: '#6C757D', cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          ))}
        </div>)}
      </div>

      
    </div>

  );
};

export default ControlList;
