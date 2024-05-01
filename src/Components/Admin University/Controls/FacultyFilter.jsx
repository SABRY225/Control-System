import React, { useState } from 'react';
import { Faculties } from './Faculties';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailsOfControl from '../DetailsOfControl/DetailsOfControl'; 

const FacultyFilter = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const arrow = <FontAwesomeIcon icon="fa-solid fa-arrow-down-long" style={{ color: 'white' }} />;
  
  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
  };

  // Mocked control status data (replace with actual data)
  const facultyControlStatus = [
    { faculty: "كلية العلوم", status: 'not_finished' },
    { faculty: "كلية التربية", status: 'finished' },
    { faculty: "كلية الآداب", status: 'not_started' },
    { faculty: "كلية الطب البيطرى", status: 'not_started' },
    { faculty: "كلية التربية النوعية", status: 'finished' },
    { faculty: "كلية التجارة", status: 'not_finished' },
    { faculty: "كلية الزراعة", status: 'not_started' },
    { faculty: "كلية الحقوق", status: 'finished' },
    { faculty: "كلية التربية الرياضية", status: 'finished' },
    { faculty: "كلية التمريض", status: 'not_started' },
    { faculty: "كلية الهندسة", status: 'finished' },
    { faculty: "كلية الطب", status: 'not_finished' },
    { faculty: "كلية الآثار", status: 'finished' },
    { faculty: "كلية التربية بالغردقة", status: 'not_started' },
    { faculty: "كلية طب الفم والأسنان", status: 'finished' },
    { faculty: "كلية الإعلام وتكنولوجيا الاتصال", status: 'not_started' },
    { faculty: "كلية الصيدلة", status: 'not_started' },
    { faculty: "كلية العلاج الطبيعي", status: 'finished' },
    { faculty: "كلية الحاسبات والمعلومات", status: 'not_finished' },
    { faculty: "كلية الحاسبات والذكاء الاصطناعي", status: 'not_started' },
  ];

  // Function to determine color based on control status
  const getColorByStatus = (status) => {
    switch (status) {
      case 'finished':
        return 'green';
      case 'not_finished':
        return 'red';
      case 'not_started':
        return 'black';
      default:
        return 'black';
    }
  };

  return (
    <div className="container my-5">
      <div className="page">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="form-group">
              <select
                className="form-control fw-bold fs-5"
                value={selectedFaculty || ''}
                onChange={handleFacultyChange}
                style={{ background: '#43BBFF', color: 'white' }}
              >
                <option value="">اختر الكلية</option>
                {Faculties.map((faculty, index) => {
                  const statusInfo = facultyControlStatus.find((item) => item.faculty === faculty);
                  const color = statusInfo ? getColorByStatus(statusInfo.status) : 'black';
                  return (
                    <option key={index} value={faculty} className={`text-center fs-5`} style={{ background: '#ffffff', color }}>
                      {faculty}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        {selectedFaculty && <DetailsOfControl faculty={selectedFaculty} />}
      </div>
    </div>
  );
};

export default FacultyFilter;
