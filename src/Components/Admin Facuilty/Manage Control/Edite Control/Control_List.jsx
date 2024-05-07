import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import { updateControlDetails, clearControlDetails,removeControl  } from '../../../../Redux/controlSlice';
import axios from 'axios';

const ControlList = () => {
  const tok = useSelector((state) => state.auth.token);
  // const controls = useSelector((state) => state.control.controls);
  // const [controls,setControls] = useState([]);
  const controlDetails = useSelector((state) => state.control.controlDetails);
  const dispatch = useDispatch(); 

  const isSmallScreen = window.matchMedia('(max-width: 576px)').matches;
  const isMediumScreen = window.matchMedia('(min-width: 576px) and (max-width: 992px)').matches;
  const isLargeScreen = window.matchMedia('(min-width: 992px)').matches;
  

  const handleControlClick = (control) => {
    // dispatch(updateControlDetails(control)); // Update control details in Redux state
  };

  // allControllers
  useEffect(() => {
    getControl();
  }, []);
  
  const [dataControl,setDataControl]=useState([]);
  const getControl = async () => {
    try {
        const dataOFControl = await axios.get(
            'http://localhost:5120/Controls/allControllers', // API endpoint URL
            {
                headers: {
                    Authorization: "Bearer " + tok, // Authorization token
                    "Content-Type": "application/json", // Content type
                },
            }
        );
        setDataControl(dataOFControl); // Set the retrieved data to the state variable 'dataStaff'
    } catch (error) {
        console.error("Error fetching Data Control data:", error); // Log any errors that occur during fetching
    }
  }



//   // HeadOfControl
//   const [HeadControl,setHeadControl]=useState([]);
//   const getHeadControl = async () => {
//     try {
//         const headControl = await axios.get(
//             `http://localhost:5120/Users/headConrol/`, // API endpoint URL
//             {
//                 headers: {
//                     Authorization: "Bearer " + tok, // Authorization token
//                     "Content-Type": "application/json", // Content type
//                 },
//             }
//         );
//         setHeadControl(headControl); // Set the retrieved data to the state variable 'dataStaff'
//     } catch (error) {
//         console.error("Error fetching Head Data Control data:", error); // Log any errors that occur during fetching
//     }
// };
// useEffect(() => {
//   getHeadControl();
// }, [])
//   const HeadsOfControl = HeadControl.data;
//   console.log(HeadsOfControl);


// Delete
console.log(dataControl);
const handleDeleteControl = async(control) => {
  console.log(control);
  try {

    // Make a POST request to the authentication endpoint
    const response = await axios.delete(
        `http://localhost:5120/Controls/delete/${control}`,
        {
            headers: {
                Authorization: "Bearer " + tok, // Authorization token
                "Content-Type": "application/json",
            },
        }
    );
    setDataControl(dataControl.data.filter(data => data.id !== control));
    // Handle successful login
    console.log("Control successful:", response.data);
    alert(response.data)

} catch (error) {
    console.log("Control error:", error);
}
};



  return (
    
    <div className="container mt-4">
      <div className="page rtl" >
      {!dataControl.data ? (
            <div className="col-md-12 my-3">
              <p className="text-center fs-2 fw-bold">لا يوجد لجان كنترول في الوقت الحالي</p>
            </div>
          ) : (
        <div className="row justify-content-center text-center years-of-controls">
        <div className="col-md-12 my-3">
            <h4>{controlDetails.term} - {controlDetails.academicYear}</h4>
          </div>
          {/* Displaying Controls */}
          {dataControl.data.map((control) => (
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
