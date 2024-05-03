import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { subjects } from './subjects';
import { chairpers } from './chairpers';
import { committeeMem } from './committeeMem';
import {
    addControl,
    addSelectedSubject,
    removeSelectedSubject,
    clearSelectedSubjects,
} from '../../../../Redux/controlSlice';
import ControlList from '../Edite Control/Control_List';

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
    const isSmallScreen = window.matchMedia('(max-width: 576px)').matches;
    const isMediumScreen = window.matchMedia('(min-width: 576px) and (max-width: 992px)').matches;
    const isLargeScreen = window.matchMedia('(min-width: 992px)').matches;

    // const [isCreateControl, setIsCreateControl] = useState(false);
    const [isCreateActive, setIsCreateActive] = useState(false);
    const [isEditActive, setIsEditActive] = useState(false);


    const [selectedChairperson, setSelectedChairperson] = useState('');
    const [selectedChairpersons, setSelectedChairpersons] = useState([]);

    const [selectedCommitteeMember, setSelectedCommitteeMember] = useState('');
    const [selectedCommitteeMembers, setSelectedCommitteeMembers] = useState([]);

    const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
    const [includeMajor, setIncludeMajor] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState('');

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
        else {
            // chairperson is already selected, you can show a message or handle it as per your requirement
            alert('This chairperson is already added.');
        }
    };

    const handleAddCommitteeMember = () => {
        if (selectedCommitteeMember && !selectedCommitteeMembers.includes(selectedCommitteeMember)) {
            setSelectedCommitteeMembers([...selectedCommitteeMembers, selectedCommitteeMember]);
            setSelectedCommitteeMember('');
        }
        else {
            // committee member is already selected, you can show a message or handle it as per your requirement
            alert('This committee member is already added.');
        }
    };

    const handleRemoveChairperson = (chairperson) => {
        const updatedChairpersons = selectedChairpersons.filter((cp) => cp !== chairperson);
        setSelectedChairpersons(updatedChairpersons);
    };

    const handleRemoveCommitteeMember = (committeeMember) => {
        const updatedCommitteeMember = selectedCommitteeMembers.filter((cp) => cp !== committeeMember);
        setSelectedCommitteeMembers(updatedCommitteeMember);
    };

    const handleRemoveSubject = (subject) => {
        dispatch(removeSelectedSubject(subject));
    };

    // Handle checkbox toggle for including major
    const handleIncludeMajorChange = (e) => {
        setIncludeMajor(e.target.checked);
        // Reset selected major when unchecking the checkbox
        if (!e.target.checked) {
            setSelectedMajor('');
        }
    };


    const handleSubmit = () => {
        const { controlName, academicYear, term, startDate, endDate } = controlDetails;
        const newControl = {
            name: controlName,
            academicYear,
            selectedAcademicYear,
            term,
            startDate,
            endDate,
            subjects: selectedSubjects,
            chairpersons: selectedChairpersons, // Include selected chairpersons in the control data
            committeeMembers: selectedCommitteeMembers, // Include selected chairpersons in the control data
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
        setSelectedCommitteeMember('');
        setSelectedCommitteeMembers([]);
    };



    return (
        <div className="container mt-4 rtl page">
            <div className="container my-4 rtl">
                <div className="row mb-4 align-items-center justify-content-center">
                    {/* Create Control Button */}
                    <button
                        className="btn mx-3 col-lg-2"
                        style={{
                            backgroundColor: isCreateActive ? '#43BBFF' : '#98DAFF',
                            color: isCreateActive ? 'white' : 'black',
                            boxShadow: isCreateActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                            // marginBottom: '15px',
                            width:isLargeScreen?'15%':'35%',

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
                        className="btn mx-3"
                        style={{
                            backgroundColor: isEditActive ? '#43BBFF' : '#98DAFF',
                            color: isEditActive ? 'white' : 'black',
                            boxShadow: isEditActive ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                            width:isLargeScreen?'15%':'35%',
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
            {isCreateActive && <div className="row page">
                <div className="mb-5 col-md-3" style={{width:isLargeScreen?'25%':'95%',justifyContent:'center'}}>
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
                            placeholder='ex: 23/24'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="term">الفصل الدراسي</label>
                        <select
                            className="form-select"
                            id="term"
                            name="term"
                            value={controlDetails.term}
                            onChange={handleInputChange}
                            style={{
                                backgroundColor: '#E1E1E1',
                                color: 'black',
                            }}
                        >
                            <option value="">اختر الفصل الدراسي</option>
                            <option value="الفصل الدراسي الأول">الفصل الدراسي الأول</option>
                            <option value="الفصل الدراسي الثاني">الفصل الدراسي الثاني</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="academicYear">السنة الدراسية</label>
                        <select
                            className="form-select"
                            id="academicYear"
                            name="academicYear"
                            value={selectedAcademicYear}
                            onChange={(e) => setSelectedAcademicYear(e.target.value)}
                            style={{
                                backgroundColor: '#E1E1E1',
                                color: 'black',
                            }}
                        >
                            <option value="">اختر السنة الدراسية</option>
                            <option value="السنة الدراسية الأولى">السنة الدراسية الأولى</option>
                            <option value="السنة الدراسية الثانية">السنة الدراسية الثانية</option>
                            <option value="السنة الدراسية الثالثة">السنة الدراسية الثالثة</option>
                            <option value="السنة الدراسية الرابعة">السنة الدراسية الرابعة</option>
                            <option value="السنة الدراسية الخامسة">السنة الدراسية الخامسة</option>
                        </select>
                    </div>

                    {/* Checkbox for including major */}
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="includeMajorCheckbox"
                            checked={includeMajor}
                            onChange={handleIncludeMajorChange}
                            style={{
                                backgroundColor: '#43BBFF',
                                color: 'black',
                            }}
                        />
                        <label className="form-check-label" htmlFor="includeMajorCheckbox">
                            تحديد التخصص / الشعبة
                        </label>
                    </div>

                    {/* Render select dropdown for major if includeMajor is true */}
                    {includeMajor && (
                        <div>
                            <select
                                className="form-select"
                                id="major"
                                name="major"
                                value={selectedMajor}
                                onChange={(e) => setSelectedMajor(e.target.value)}
                                style={{
                                    backgroundColor: '#E1E1E1',
                                    color: 'black',
                                }}
                            >
                                <option value="">اختر التخصص / الشعبة</option>
                                {/* Populate options dynamically based on available majors */}
                                {/* Example: */}
                                <option value="علوم الحاسب">علوم الحاسب</option>
                                <option value="هندسة البرمجيات">هندسة البرمجيات</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    )}

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


                </div>


                {/* Selected Subjects Section */}

                <div className="col-md-5 mb-5">
                    <div className="d-flex align-items-center justify-content-start mb-3">
                        {/* Dropdown */}
                        <select
                            className="form-select"
                            style={{ backgroundColor: '#CFEEFF', color: 'black', width: '35%', }}
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
                    <div className="rectangle-container fs-5 rounded-2" style={{ backgroundColor: '#EBF8FF' }}>

                        <h5 className='mx-3 pt-2'>مواد الكنترول</h5>
                        <div className="row justify-content-center align-items-center">
                            {selectedSubjects.map((subject, index) => (
                                <div key={index} className="subject-row rounded-2 mx-3 my-2" style={{ backgroundColor: '#D9D9D9', color: 'black', width: '40%', }}>
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

                {/* Chairpersons Section */}
                <div className="col-md-4">
                    <h5>بيانات أعضاء الكنترول</h5>
                    <div className="d-flex align-items-center justify-content-start mb-3">
                        <select
                            className="form-select"
                            style={{ backgroundColor: '#CFEEFF', color: 'black', width: '55%', }}
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
                            className="btn mx-3"
                            onClick={handleAddChairperson}
                            style={{ backgroundColor: '#43BBFF', color: 'white' }}
                        >
                            اضافة <FontAwesomeIcon icon={faPlus} />

                        </button>
                    </div>
                    <div className="rectangle-container fs-5 rounded-2" style={{ backgroundColor: '#EBF8FF' }}>
                        <h5 className='mx-3 p-2 my-2'> رئيس لجنة الكنترول</h5>
                        <div className="row justify-content-center align-items-center">
                            {selectedChairpersons.map((chairperson, index) => (
                                <div key={index} className="subject-row col-sm-10 rounded-2 mx-3 my-2" style={{ backgroundColor: '#D9D9D9', color: 'black', width: '40%', }}>
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

                    {/* Committee Members Section */}
                    <div className="my-3">
                        <div className="d-flex align-items-center justify-content-start mb-3">
                            <select
                                className="form-select "
                                style={{ backgroundColor: '#CFEEFF', color: 'black', width: '55%', }}
                                value={selectedCommitteeMember}
                                onChange={(e) => setSelectedCommitteeMember(e.target.value)}
                            >
                                <option value="">اختر اعضاء لجنة الكنترول</option>
                                {/* Populate options dynamically from chairpersons data */}
                                {committeeMem.map((committeeMember, index) => (
                                    <option key={index} value={committeeMember}>
                                        {committeeMember}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="btn mx-3"
                                onClick={handleAddCommitteeMember}
                                style={{ backgroundColor: '#43BBFF', color: 'white' }}
                            >
                                اضافة <FontAwesomeIcon icon={faPlus} />

                            </button>
                        </div>
                        <div className="rectangle-container fs-5 rounded-2" style={{ backgroundColor: '#EBF8FF' }}>

                            <h5 className='mx-3 p-2 my-2'> اعضاء لجنة الكنترول</h5>
                            <div className="row justify-content-center align-items-center">
                                {selectedCommitteeMembers.map((committeeMember, index) => (
                                    <div key={index} className="subject-row col-sm-10 rounded-2 mx-3 my-2" style={{ backgroundColor: '#D9D9D9', color: 'black', width: '40%' }}>                  <span>{committeeMember}</span>
                                        <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            style={{ color: '#FF0000', cursor: 'pointer', marginRight: '10px', }}
                                            onClick={() => handleRemoveCommitteeMember(committeeMember)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-center align-items-center w-100 my-5'>
                    <button className="btn fw-bold" onClick={handleSubmit}
                        style={{ backgroundColor: '#74E474', boxShadow: '0 0px 8px rgba(0,0,0,0.35)', width:isLargeScreen?'10%':'25%', }}>
                        ارسال
                    </button>
                </div>

            </div>
            }
            {isEditActive && <ControlList />}



        </div>

    );
};

export default ControlManagement;