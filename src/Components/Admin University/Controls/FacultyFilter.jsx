import React, { useCallback, useState } from 'react';
import DetailsOfControl from '../DetailsOfControl/DetailsOfControl'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const FacultyFilter = () => {
  const tok = useSelector((state) => state.auth.token);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [Faculties, setFaculties] = useState([]);
  const getAllFaculty = useCallback(() => {
    async function getAllFaculty() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_GETALLFACULTIES,
          {
            headers: {
              Authorization: "Bearer " + tok,
            },
          }
        );
        setFaculties(response.data);
        // console.log("Login successful:", response.data);
      } catch (error) {
        console.log("Login error:", error);
      }
    }
    getAllFaculty();
  }, [tok]);

  // Call getNode() within useEffect to ensure it's called after component mount
  useEffect(() => {
    getAllFaculty();
  }, [getAllFaculty]);

  const handleFacultyChange = (e) => {
    const faculty = Faculties.find(f => f.id == e.target.value);
    // console.log(faculty);
    setSelectedFaculty(faculty);
  };

  // Mocked control status data (replace with actual data)
  
  console.log(Faculties);
  
  // console.log(selectedFaculty.controls);
  return (
    <div className="container my-5">
      <div className="page">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="form-group">
              <select
                className="form-select fw-bold fs-5"
                value={selectedFaculty || ""}
                onChange={handleFacultyChange}
                style={{
                  // background: "#43BBFF",
                  //   color: "white",
                  textAlign: "center",
                }}
              >
                <option value="#">اختر الكلية</option>
                {Faculties.map((faculty) => {
                  return (
                    <option
                      key={faculty.id}
                      value={faculty.id}
                      className={`text-center fs-5`}
                      style={{ background: "#ffffff", color: "black" }}
                    >
                      {faculty.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        {selectedFaculty && selectedFaculty.controls.length > 0 && (
          <DetailsOfControl
            faculty={selectedFaculty}
          />
        )}
        {selectedFaculty && selectedFaculty.controls.length == 0 && (
          <p style={{ textAlign: "center", margin: "2rem" }}>
            Not Found Controls
          </p>
        )}
      </div>
    </div>
  );
};

export default FacultyFilter;
