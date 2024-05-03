import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { subjects } from './subjects';

const AcademicYearDetails = () => {
  // Retrieve yearInfo from Redux store using useSelector
  const { year, committeeName, committeeNickname, status,faculty, semester } = useSelector((state) => state.details);

  // Function to render progress circles based on subject status
  const renderProgressCircles = () => {
    return subjects.map((subject, index) => {
      const isFinished = subject.finished;
      const circleColor = isFinished ? 'green' : 'gray';
      const checkColor = isFinished ? 'green' : 'gray';

      return (
        <div key={index} className="progress-circle" style={{ borderColor: circleColor }}>
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: checkColor }} />
        </div>
      );
    });
  };

  // Function to calculate and render progress percentage
  // const calculateProgressPercentage = () => {
  //   const finishedCount = subjects.filter((subject) => subject.finished).length;
  //   const progressPercentage = (finishedCount / subjects.length) * 100;
  //   return progressPercentage.toFixed(2); // Round to two decimal places
  // };

  return (
    <div className="academic-year-details-container rtl container page">
      <div className="details-line my-5 d-sm-inline-block d-lg-flex justify-content-start align-items-center">
        <span className='fw-bold fs-5'>
         كنترول {year} كلية {faculty} لعام {semester} تحت ادارة عميد الكلية {committeeName} ورئيس الكنترول {committeeName}
        </span>
        <div className={`status-indicator ${status}`} style={{marginRight:'2vh'}} />
      </div>

      <div className="subjects-container">
        <div className="subjects-column">
          <h4>المواد</h4>
          {subjects.map((subject, index) => (
            <div key={index} className="subject fs-5">
              <span>{subject.name}</span>
              { subject.finished&& <FontAwesomeIcon className='mx-3 fw-bold' icon={faCircleCheck} style={{ color:'#44AA44', }} />}
            </div>
          ))}
        </div>

        {/* <div className="progress-circle-container">
          {renderProgressCircles()}
          <div className="progress-percentage">
            <span>{calculateProgressPercentage()}%</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AcademicYearDetails;
