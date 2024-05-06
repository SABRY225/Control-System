import React, { useState } from 'react'
import Subtract from '../../../../assets/Subtract.png'
import Trash from '../../../../assets/Trash.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faChevronDown ,faPaperPlane, faClose} from '@fortawesome/free-solid-svg-icons';
import { subjects } from '../../../Admin Facuilty/Manage Control/Create Control/subjects';
import { useDispatch, useSelector } from 'react-redux';
import {
    addControl,
    addSelectedSubject,
    removeSelectedSubject,
    clearSelectedSubjects,
} from '../../../../Redux/controlSlice';
export default function EditeTask() {
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
    const [closeTab, setCloseTab] = useState(false);

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
    const handleRemoveSubject = (subject) => {
        dispatch(removeSelectedSubject(subject));
    };
    const handelClose = () => {
        setCloseTab(true)
    }
    return (
        <>
            <div className="container EditeTaskNow" style={{
                display: closeTab ? 'none' : 'block'
            }}>
                <div className="row text-end ">
                    <div className="col-12 " >
                        <FontAwesomeIcon icon={faClose} className='closeIcon' onClick={handelClose} />
                    </div>
                </div>
                <form  >
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="col">
                                <div className="d-flex justify-content-center mb-3">
                                    {/* Dropdown */}
                                    <select
                                        className="form-select"
                                        style={{ backgroundColor: '#CFEEFF', color: 'black', width: '35%', }}
                                        onChange={(e) => setControlDetails({ ...controlDetails, selectedSubject: e.target.value })}
                                        value={controlDetails.selectedSubject}
                                    >
                                        <option value="">

                                            الأعضاء <FontAwesomeIcon icon={faChevronDown} style={{ color: 'gray' }} />

                                        </option>
                                        {subjects.map((subject, index) => (
                                            <option key={index} value={subject.name}>
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Add button */}
                                    <button
                                        className="btn mx-3 "
                                        onClick={() => handleAddSubject(controlDetails.selectedSubject)}
                                        style={{ backgroundColor: '#43BBFF', color: 'white' }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                {/* Display selected subjects */}
                                <div className="rectangle-container fs-5 rounded-2" style={{ backgroundColor: '#EBF8FF' }}>

                                    <h5 className='mx-3 pt-2'>أعضاء الكنترول</h5>
                                    <div className="row justify-content-center align-items-center">
                                        {selectedSubjects.map((subject, index) => (
                                            <div key={index} className="subject-row col-md-5 rounded-2 mx-3 my-2" style={{ backgroundColor: '#D9D9D9', color: 'black' }}>
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
                        </div>
                        <div className="col-md-1 text-center toTask">
                            <div>To</div>
                        </div>
                        <div className="col-md-4">
                            <div className="col">
                                <div className="d-flex justify-content-center mb-3">
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
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                {/* Display selected subjects */}
                                <div className="rectangle-container fs-5 rounded-2" style={{ backgroundColor: '#EBF8FF' }}>

                                    <h5 className='mx-3 pt-2'>المواد </h5>
                                    <div className="row justify-content-center align-items-center">
                                        {selectedSubjects.map((subject, index) => (
                                            <div key={index} className="subject-row col-md-5 rounded-2 mx-3 my-2" style={{ backgroundColor: '#D9D9D9', color: 'black' }}>
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
                        </div>
                        <div className="col-md-2 ">

                            <input type="date" className='dateInput form-control ' />
                        </div>
                    </div>
                    <div className="row text-center m-3">
                        <div className="col">

                            <button className='btn btn-info p-2' style={{ width: '200px', fontSize: "20px", background: "rgb(67, 187, 255)", color: "#FFFFFF" }}>ارسال المهمة <FontAwesomeIcon icon={faPaperPlane} /> </button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

