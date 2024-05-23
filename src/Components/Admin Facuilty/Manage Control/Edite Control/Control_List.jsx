import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { setIdControl } from '../../../../Redux/ProfileSlice';
import { useNavigate } from 'react-router-dom';

const ControlList = () => {
  const fId = useSelector((state) => state.Profile.Fid);
  const tok = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const semester = `${new Date().getFullYear()}/${
    new Date().getFullYear() - 1
  }`;
  // allControllers
  useEffect(() => {
    getControl();
  },[]);

  const [dataControl, setDataControl] = useState([]);

  const getControl = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_CONTROLS,
        {
          params:{Fid:fId},
          headers: {
            Authorization: "Bearer " + tok,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      
      const controlsMatchingSemester = response.data.filter(control => control.acaD_YEAR === semester);
  
      if (controlsMatchingSemester.length > 0) {
        setDataControl(controlsMatchingSemester);
      } else {
        // Handle case where no controls match the semester
        console.log("No controls found for the specified semester.");
      }
    } catch (error) {
      console.error("Error fetching Data Control data:", error);
      // Handle errors, such as displaying an error message to the user
    }
  };
  

  // Delete
  console.log("dataControl :",dataControl);
  const handleDeleteControl = async (control) => {
    console.log(control);
    try {
      if (window.confirm("هل تريد ازالة الكنترول نهائيا ؟")){
      const response = await axios.delete(
        process.env.REACT_APP_DELETECONTROLS,
        {
          params:{id:control},
          headers: {
            Authorization: "Bearer " + tok, // Authorization token
            "Content-Type": "application/json",
          },
        }
      );
      getControl();
      // Filter out the deleted control from the dataControl state
      const updatedDataControl = dataControl.filter(data => data.id !== control);
      setDataControl(updatedDataControl);
    }
    } catch (error) {
      console.log("Control deletion error:", error);
    }
  };

  const handleEditeControl = (control) => {
    dispatch(setIdControl(control));
    navigate('/Admin_Facuilty/Edite_Control')
  }

  return (

    <div className="container mt-4">
      <div className="page rtl" >
        {!dataControl ? (
          <div className="col-md-12 my-3">
            <p className="text-center fs-2 fw-bold">لا يوجد لجان كنترول في الوقت الحالي</p>
          </div>
        ) : (
          <div className="row justify-content-center text-center years-of-controls">
            {/* Displaying Controls */}
            {dataControl.map((control) => (
              <div key={control.id} className="col-md-5">
                <div
                  className="d-flex flex-column justify-content-center align-items-center rounded-2 mt-4 p-3 border border-3 control-card"
                // onClick={() => handleControlClick(control)} // Call handleControlClick on click
                >
                  <div className="d-flex">
                    <h5>{control.name}</h5>
                  </div>
                  {/* Icons for delete and settings */}
                  <div className="d-flex align-items-center mt-3">
                    <FontAwesomeIcon
                      className='mx-5'
                      icon={faTrashAlt}
                      style={{ color: '#FF0000', cursor: 'pointer', marginRight: '10px' }}
                      onClick={() => handleDeleteControl(control.id)} // Pass control ID or unique identifier
                    />
                    <FontAwesomeIcon className='mx-5' icon={faCog} style={{ color: '#6C757D', cursor: 'pointer' }} onClick={() => handleEditeControl(control.id)} />
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
