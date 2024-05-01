import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { subjects } from './subjects';
import { chairpers } from './chairpers';
import {
  addControl,
  addSelectedSubject,
  removeSelectedSubject,
  clearSelectedSubjects,
} from '../../../../Redux/controlSlice';

const ControlManagement = () => {
    const dispatch = useDispatch();
    const selectedSubjects = useSelector((state) => state.control.selectedSubjects);
  
    const [controlDetails, setControlDetails] = useState({
      controlName: '',
      academicYear: '',
      term: '',
      startDate: '',
      endDate: '',
      selectedSubject: '',
    });
  
    const [isCreateActive, setIsCreateActive] = useState(false);
    const [isEditActive, setIsEditActive] = useState(false);

    
  const [selectedChairperson, setSelectedChairperson] = useState('');
  const [selectedChairpersons, setSelectedChairpersons] = useState([]);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setControlDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };
  
    const handleAddSubject = () => {
        const { selectedSubject } = controlDetails;
      
        if (selectedSubject) {
          // Check if the selectedSubject is already in the selectedSubjects array
          const isSubjectAlreadySelected = selectedSubjects.includes(selectedSubject);
      
          if (!isSubjectAlreadySelected) {
            dispatch(addSelectedSubject(selectedSubject));
            setControlDetails((prevDetails) => ({
              ...prevDetails,
              selectedSubject: '',
            }));
          } else {
            // Subject is already selected, you can show a message or handle it as per your requirement
            alert('This subject is already added.');
          }
        }
      };

      const handleAddChairperson = () => {
        if (selectedChairperson && !selectedChairpersons.includes(selectedChairperson)) {
          setSelectedChairpersons([...selectedChairpersons, selectedChairperson]);
          setSelectedChairperson('');
        }
      };
    
      const handleRemoveChairperson = (chairperson) => {
        const updatedChairpersons = selectedChairpersons.filter((cp) => cp !== chairperson);
        setSelectedChairpersons(updatedChairpersons);
      };
  
    const handleRemoveSubject = (subject) => {
      dispatch(removeSelectedSubject(subject));
    };
  
    
    const handleSubmit = () => {
        const { controlName, academicYear, term, startDate, endDate } = controlDetails;
        const newControl = {
          name: controlName,
          academicYear,
          term,
          startDate,
          endDate,
          subjects: selectedSubjects,
          chairpersons: selectedChairpersons, // Include selected chairpersons in the control data
        };
        dispatch(addControl(newControl));
        dispatch(clearSelectedSubjects());
        setControlDetails({
          controlName: '',
          academicYear: '',
          term: '',
          startDate: '',
          endDate: '',
          selectedSubject: '',
        });
        setSelectedChairperson('');
        setSelectedChairpersons([]);
      };
    
  

  return (
    <div className="container mt-4 rtl page">
      <div className="container mt-4 rtl">
      <div className="row mb-4 align-items-center justify-content-center">
        {/* Create Control Button */}
        <button
          className="btn col-2 mx-3"
          style={{
            backgroundColor: isCreateActive ? '#43BBFF' : '#98DAFF',
            color: isCreateActive ? 'white' : 'black',
            boxShadow: isCreateActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
          }}
          onClick={() => {
            setIsCreateActive(true);
            setIsEditActive(false);
            setControlDetails({
              controlName: '',
              academicYear: '',
              term: '',
              startDate: '',
              endDate: '',
              selectedSubject: '',
            });
          }}
        >
          إنشاء كنترول
        </button>

        {/* Edit Control Button */}
        <button
          className="btn col-2 mx-3"
          style={{
            backgroundColor: isEditActive ? '#43BBFF' : '#98DAFF',
            color: isEditActive ? 'white' : 'black',
            boxShadow: isEditActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
          }}
          onClick={() => {
            setIsEditActive(true);
            setIsCreateActive(false);
          }}
        >
          تعديل كنترول
        </button>
      </div>
      </div>
      

      {/* Control Details Form */}
      <div className="row page">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="controlName">اسم الكنترول</label>
            <input
              type="text"
              className="form-control"
              id="controlName"
              name="controlName"
              value={controlDetails.controlName}
              onChange={handleInputChange}
              style={{
                backgroundColor: '#E1E1E1',
                color: controlDetails.controlName ? 'black' : '#646464',
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="academicYear">السنة الأكاديمية</label>
            <input
              type="text"
              className="form-control"
              id="academicYear"
              name="academicYear"
              value={controlDetails.academicYear}
              onChange={handleInputChange}
              style={{
                backgroundColor: '#E1E1E1',
                color: controlDetails.academicYear ? 'black' : '#646464',
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="term">الفصل</label>
            <input
              type="text"
              className="form-control"
              id="term"
              name="term"
              value={controlDetails.term}
              onChange={handleInputChange}
              style={{
                backgroundColor: '#E1E1E1',
                color: controlDetails.term ? 'black' : '#646464',
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">تاريخ البدء</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={controlDetails.startDate}
              onChange={handleInputChange}
              style={{
                backgroundColor: '#E1E1E1',
                color: controlDetails.startDate ? 'black' : '#646464',
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">تاريخ الانتهاء</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={controlDetails.endDate}
              onChange={handleInputChange}
              style={{
                backgroundColor: '#E1E1E1',
                color: controlDetails.endDate ? 'black' : '#646464',
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            ارسال
          </button>
        </div>

        
         {/* Selected Subjects Section */}
         
        <div className="col-md-6">
          <div className="d-flex align-items-center justify-content-start mb-3">
            {/* Dropdown */}
            <select
              className="form-control"
              style={{ backgroundColor: '#CFEEFF', color: 'black',width: '15%',  }} 
              onChange={(e) => setControlDetails({ ...controlDetails, selectedSubject: e.target.value })}
              value={controlDetails.selectedSubject}
            >
              <option value="">
              
                المواد <FontAwesomeIcon icon={faChevronDown} style={{ color: 'gray' }} />
              
              </option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
            {/* Add button */}
            <button
              className="btn mx-3"
              onClick={() => handleAddSubject(controlDetails.selectedSubject)}
              style={{ backgroundColor: '#43BBFF', color: 'white' }}
            >
              اضافة <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {/* Display selected subjects */}
          <div className="rectangle-container fs-5 rounded-2" style={{ backgroundColor: '#EBF8FF'}}>

            <h5 className='mx-3 pt-2'>مواد الكنترول</h5>
            <div className="row justify-content-center align-items-center">
            {selectedSubjects.map((subject, index) => (
              <div key={index} className="subject-row col-5 rounded-2 mx-3 my-2" style={{ backgroundColor: '#D9D9D9', color: 'black' }}>
                <span>{subject}</span>
                <FontAwesomeIcon
               
                  icon={faTrashAlt}
                  style={{ color: '#FF0000', cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => handleRemoveSubject(subject)}
                />
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Committee Members Section */}
        <div className="col-md-3">
        <h5>بيانات أعضاء الكنترول</h5>
        <select
                className="form-select"
                value={selectedChairperson}
                onChange={(e) => setSelectedChairperson(e.target.value)}
              >
                <option value="">اختر رئيس لجنة الكنترول</option>
                {/* Populate options dynamically from chairpersons data */}
                {chairpers.map((chairperson, index) => (
                  <option key={index} value={chairperson}>
                    {chairperson}
                  </option>
                ))}
              </select>
              <button
                className="btn mt-2"
                onClick={handleAddChairperson}
                style={{ backgroundColor: '#43BBFF', color: 'white' }}
              >
                اضافة
              </button>
              <div>
              {selectedChairpersons.map((chairperson, index) => (
                <div key={index} className="subject-row col-5 rounded-2 mx-3 my-2" style={{ backgroundColor: '#D9D9D9', color: 'black' }}>
                  <span>{chairperson}</span>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ color: '#FF0000', cursor: 'pointer', marginRight: '10px', }}
                    onClick={() => handleRemoveChairperson(chairperson)}
                  />
                </div>
              ))}
        </div>
            </div>

            {/* Display Selected Chairpersons */}
            
      </div>
        </div>
      
  );
};

export default ControlManagement;