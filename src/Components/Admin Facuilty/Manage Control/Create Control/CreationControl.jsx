import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./creationControl.css";

export default function CreationControl() {
    const dispatch = useDispatch();
    const fId = useSelector((state) => state.Profile.Fid);
    const tok = useSelector((state) => state.auth.token);
    const semester = `${new Date().getFullYear()}/${new Date().getFullYear() - 1}`;

    // State variables
    const [name, setName] = useState("");
    const [faculityPhase, setFaculityPhase] = useState("");
    const [faculityNode, setFaculityNode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [acaDYear, setAcaDYear] = useState(semester);
    const [faculitySemester, setFaculitySemester] = useState("");
    const [data, setData] = useState([]);
    const [dataSubject, setDataSubject] = useState([]);
    const [dataStaff, setDataStaff] = useState([]);
    const [dataStaffColne, setDataStaffColne] = useState([]);
    const [selectedChairperson, setSelectedChairperson] = useState('');
    const [selectedChairpersons, setSelectedChairpersons] = useState([]);
    const [personsIDs, setPersonsIDs] = useState([]);
    const [selectedCommitteeMember, setSelectedCommitteeMember] = useState('');
    const [selectedCommitteeMembers, setSelectedCommitteeMembers] = useState([]);
    const [selectedCommitteeMembersId, setSelectedCommitteeMembersIDs] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedSubjectsIDs, setSelectedSubjectsIDs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        getSubject();
        getStaff();
    }, [tok, fId]);

    const getSubject = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_SUBJECTFACULTY}${fId}`, {
                    headers: {
                        Authorization: `Bearer ${tok}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setData(data);
            setDataSubject(data);
        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
    };

    const getStaff = async () => {
        try {
            const { data: dataStaff } = await axios.get(`${process.env.REACT_APP_GETUSERFORFACULITY}/${fId}`, {
                    headers: {
                        Authorization: `Bearer ${tok}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setDataStaff(dataStaff);
            setDataStaffColne(dataStaff);
        } catch (error) {
            console.error("Error fetching staff data:", error);
        }
    };

    const handleAddSubject = () => {
        if (selectedSubject && !selectedSubjectsIDs.includes(selectedSubject)) {
            const selectedSubjectObject = data.find(subject => subject.id === selectedSubject);
    
            if (selectedSubjectObject) {
                setSelectedSubjects([...selectedSubjects, selectedSubjectObject.name]);
                setSelectedSubjectsIDs([...selectedSubjectsIDs, selectedSubjectObject.id]);
                setSelectedSubject('');
    
                // Remove the used subject from dataSubject
                setData(data.filter(item => item.id !== selectedSubject));
            }
        } else {
            toast.error('غير قابل لتكرار المقرر');
        }
    };
    

    const handleRemoveSubject = (subject) => {
        const updatedSubjects = selectedSubjects.filter((s) => s !== subject);
        let subjectId ;
        for (let index = 0; index < dataSubject.length; index++) {
            if (subject === dataSubject[index].name) {
                subjectId = dataSubject[index].id;
                break; 
            }
        }
        console.log(subjectId);

        const updatedSubjectsIDs = selectedSubjectsIDs.filter(id => id !== subjectId);
        const updatedSubjectsClone = selectedSubjects.find((s) => s == subject);
        setSelectedSubjects(updatedSubjects);
        setSelectedSubjectsIDs(updatedSubjectsIDs);

        const removedSubject = {name:updatedSubjectsClone,id:subjectId};
        console.log(removedSubject);
        if (removedSubject) {
            setData([...data, removedSubject]);
        }
    };

    const handleAddChairperson = () => {
        if (selectedChairperson && !personsIDs.includes(selectedChairperson) && selectedChairpersons.length < 1) {
            const chairpersonObject = dataStaff.find(chairperson => chairperson.id === selectedChairperson);
    
            if (chairpersonObject) {
                setSelectedChairpersons([...selectedChairpersons, chairpersonObject.name]);
                setPersonsIDs([...personsIDs, chairpersonObject.id]);
                setSelectedChairperson('');
    
                // Remove the used chairperson from dataStaff
                setDataStaff(dataStaff.filter(item => item.id !== selectedChairperson));
            }
        } else {
            toast.error('اختيار رئيس كنترول واحد فقط');
        }
    };

    const handleRemoveChairperson = (chairperson) => {
        const updatedChairpersons = selectedChairpersons.filter((cp) => cp !== chairperson);
        let personId ;
        for (let index = 0; index < dataStaffColne.length; index++) {
            if (chairperson === dataStaffColne[index].name) {
                personId = dataStaffColne[index].id;
                break; 
            }
        }
        console.log(personId);
        const updatedPersonsIDs = personsIDs.filter(id => id !== personId);

        setSelectedChairpersons(updatedChairpersons);
        setPersonsIDs(updatedPersonsIDs);
        const updatedChairpersonsClone = selectedChairpersons.find((cp) => cp == chairperson);

        const removedChairperson = {name:updatedChairpersonsClone,id:personId};
        console.log(removedChairperson);
        if (removedChairperson) {
            setDataStaff([...dataStaff, removedChairperson]);
        }
    };
    const handleAddCommitteeMember = () => {
        if (selectedCommitteeMember && !selectedCommitteeMembersId.includes(selectedCommitteeMember)) {
            const committeeMemberObject = dataStaff.find(committeeMember => committeeMember.id === selectedCommitteeMember);
    
            if (committeeMemberObject) {
                setSelectedCommitteeMembers([...selectedCommitteeMembers, committeeMemberObject.name]);
                setSelectedCommitteeMembersIDs([...selectedCommitteeMembersId, committeeMemberObject.id]);
                setSelectedCommitteeMember('');
    
                // Remove the used committee member from dataStaff
                setDataStaff(dataStaff.filter(item => item.id !== selectedCommitteeMember));
            }
        } else {
            toast.error('This committee member is already added.');
        }
    };

    const handleRemoveCommitteeMember = (committeeMember) => {
        const updatedCommitteeMembers = selectedCommitteeMembers.filter((cm) => cm !== committeeMember);
        let committeeMemberId ;
        for (let index = 0; index < dataStaffColne.length; index++) {
            if (committeeMember === dataStaffColne[index].name) {
                committeeMemberId = dataStaffColne[index].id;
                break; 
            }
        }
        console.log(committeeMemberId);
        const updatedCommitteeMembersIDs = selectedCommitteeMembersId.filter(id => id !== committeeMemberId);

        setSelectedCommitteeMembers(updatedCommitteeMembers);
        setSelectedCommitteeMembersIDs(updatedCommitteeMembersIDs);
        const updatedCommitteeMembersClone = selectedCommitteeMembers.find((cm) => cm == committeeMember);
        // Add the removed chairperson back to dataStaff
        const removedCommitteeMember = {name:updatedCommitteeMembersClone,id:committeeMemberId};
        if (removedCommitteeMember) {
            setDataStaff([...dataStaff, removedCommitteeMember]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                name,
                faculity_Phase:faculityPhase,
                faculity_Semester:faculitySemester,
                acaD_YEAR:acaDYear,
                start_Date:startDate,
                end_Date:endDate,
                faculity_Node:faculityNode,
                controlManagerID: personsIDs[0],
                subjectsIds: selectedSubjectsIDs,
                usersIds: selectedCommitteeMembersId
            };
            const jsonData = JSON.stringify(formData);
            setIsLoading(true);
            console.log(jsonData);
            const response = await axios.post(
                process.env.REACT_APP_CREATECONTROL + fId,
                jsonData, {
                    headers: {
                        Authorization: `Bearer ${tok}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setIsLoading(false);
            toast.success("تم انشاء الكنترول بنجاح");
        } catch (error) {
            setIsLoading(false);
            toast.error("يرجي اعادة المحاولة");
            console.log("Control not successful:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="mb-5 col-md justify-content-center">
                    <div className="form-group">
                        <label htmlFor="controlName">اسم الكنترول</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ backgroundColor: '#E1E1E1' }}
                            placeholder='ما هو اسم الكنترول....'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="academicYear">السنة الأكاديمية</label>
                        <input
                            type="text"
                            className="form-control"
                            id="acaDYear"
                            name="acaDYear"
                            value={acaDYear}
                            onChange={(e) => setAcaDYear(e.target.value)}
                            style={{ backgroundColor: '#E1E1E1' }}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="term">الفصل الدراسي</label>
                        <select
                            className="form-select"
                            id="faculitySemester"
                            name="faculitySemester"
                            value={faculitySemester}
                            onChange={(e) => setFaculitySemester(e.target.value)}
                            style={{ backgroundColor: '#E1E1E1', color: 'black' }}
                        >
                            <option value="">اختر الفصل الدراسي</option>
                            <option value="الفصل الأول">الفصل الدراسي الأول</option>
                            <option value="الفصل الثاني">الفصل الدراسي الثاني</option>
                            <option value="الفصل الصيفي">الفصل الدراسي الصيفي</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="faculityPhase">السنة الدراسية</label>
                        <select
                            className="form-select"
                            id="faculityPhase"
                            name="faculityPhase"
                            value={faculityPhase}
                            onChange={(e) => setFaculityPhase(e.target.value)}
                            style={{ backgroundColor: '#E1E1E1', color: 'black' }}
                        >
                            <option value="">اختر السنة الدراسية</option>
                            <option value="الفرقة الأولى">الفرقة الأولى</option>
                            <option value="الفرقة الثانية">الفرقة الثانية</option>
                            <option value="الفرقة الثالثة">الفرقة الثالثة</option>
                            <option value="الفرقة الرابعة">الفرقة الرابعة</option>
                            <option value="الفرقة الرابعة">الفرقة الخامسة</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="faculityNode">الشعبة</label>
                        <select
                            className="form-select"
                            id="faculityNode"
                            name="faculityNode"
                            value={faculityNode}
                            onChange={(e) => setFaculityNode(e.target.value)}
                            style={{ backgroundColor: '#E1E1E1', color: 'black' }}
                        >
                            <option value="">اختر الشعبة</option>
                            <option value="عام">شعبة عام</option>
                            <option value="شعبة علوم حاسب">شعبة علوم حاسب</option>
                            <option value=" تكنولوجيا المعلومات<">شعبة تكنولوجيا المعلومات</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">تاريخ البداية</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{ backgroundColor: '#E1E1E1' }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">تاريخ النهاية</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="endDate"
                            name="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{ backgroundColor: '#E1E1E1' }}
                            required
                        />
                    </div>
                </div>
                <div className="mb-5 col-md justify-content-center">
                    <div className="form-group">
                        <label htmlFor="committeeChairperson">رئيس الكنترول</label>
                        <div className="input-group">
                            <select
                                className="form-select"
                                id="committeeChairperson"
                                name="committeeChairperson"
                                value={selectedChairperson}
                                onChange={(e) => setSelectedChairperson(e.target.value)}
                                style={{ backgroundColor: '#E1E1E1', color: 'black' }}
                            >
                                <option value="">اختر رئيس الكنترول</option>
                                {dataStaff.map((chairperson) => (
                                    <option key={chairperson.id} value={chairperson.id}>
                                        {chairperson.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleAddChairperson}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        <ul className="list-group">
                            {selectedChairpersons.map((chairperson) => (
                                <li key={chairperson} className="list-group-item d-flex justify-content-between align-items-center">
                                    {chairperson}
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleRemoveChairperson(chairperson)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="form-group">
                        <label htmlFor="committeeMembers">أعضاء الكنترول</label>
                        <div className="input-group">
                            <select
                                className="form-select"
                                id="committeeMembers"
                                name="committeeMembers"
                                value={selectedCommitteeMember}
                                onChange={(e) => setSelectedCommitteeMember(e.target.value)}
                                style={{ backgroundColor: '#E1E1E1', color: 'black' }}
                            >
                                <option value="">اختر أعضاء الكنترول</option>
                                {dataStaff.map((committeeMember) => (
                                    <option key={committeeMember.id} value={committeeMember.id}>
                                        {committeeMember.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleAddCommitteeMember}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        <ul className="list-group">
                            {selectedCommitteeMembers.map((committeeMember) => (
                                <li key={committeeMember} className="list-group-item d-flex justify-content-between align-items-center">
                                    {committeeMember}
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleRemoveCommitteeMember(committeeMember)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">المقررات</label>
                        <div className="input-group">
                            <select
                                className="form-select"
                                id="subject"
                                name="subject"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                style={{ backgroundColor: '#E1E1E1', color: 'black' }}
                            >
                                <option value="">اختر المقرر</option>
                                {data.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleAddSubject}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        <ul className="list-group">
                            {selectedSubjects.map((subject) => (
                                <li key={subject} className="list-group-item d-flex justify-content-between align-items-center">
                                    {subject}
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleRemoveSubject(subject)}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className="form-group form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="includeMajor"
                            name="includeMajor"
                            checked={includeMajor}
                            onChange={handleIncludeMajorChange}
                        />
                        <label className="form-check-label" htmlFor="includeMajor">
                            تضمين الشعبة التخصصية
                        </label>
                    </div>
                    {includeMajor && (
                        <div className="form-group">
                            <label htmlFor="major">الشعبة التخصصية</label>
                            <select
                                className="form-select"
                                id="major"
                                name="major"
                                value={selectedMajor}
                                onChange={(e) => setSelectedMajor(e.target.value)}
                                style={{ backgroundColor: '#E1E1E1', color: 'black' }}
                            >
                                <option value="">اختر الشعبة التخصصية</option>
                                <option value="التخصص الأول">التخصص الأول</option>
                                <option value="التخصص الثاني">التخصص الثاني</option>
                            </select>
                        </div>
                    )} */}
                </div>
            </div>
            <div className='text-center'>
            <button type="submit" className="btn-control" >
            إرسال
            </button>
            </div>
            <ToastContainer />
        </form>
    );
}
