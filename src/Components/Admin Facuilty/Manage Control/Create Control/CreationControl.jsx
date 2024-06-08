import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import "./creationControl.css"
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
    const [dataStaff, setDataStaff] = useState([]);
    const [selectedChairperson, setSelectedChairperson] = useState('');
    const [selectedChairpersons, setSelectedChairpersons] = useState([]);
    const [personsIDs, setPersonsIDs] = useState([]);
    const [selectedCommitteeMember, setSelectedCommitteeMember] = useState('');
    const [selectedCommitteeMembers, setSelectedCommitteeMembers] = useState([]);
    const [selectedCommitteeMembersId, setSelectedCommitteeMembersIDs] = useState([]);
    const [includeMajor, setIncludeMajor] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState('');
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
        } catch (error) {
            console.error("Error fetching subject data:", error);
        }
    };

    const getStaff = async () => {
        try {
            const { data: dataStaff } = await axios.get(
                process.env.REACT_APP_USEROFFACULTY, {
                    params: { id: fId },
                    headers: {
                        Authorization: `Bearer ${tok}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setDataStaff(dataStaff);
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
            }
        } else {
            alert('غير قابل لتكرار المقرر');
        }
    };

    const handleRemoveSubject = (subject) => {
        const updatedSubjects = selectedSubjects.filter((s) => s !== subject);
        const subjectId = data.find((s) => s.name === subject)?.id;
        const updatedSubjectsIDs = selectedSubjectsIDs.filter(id => id !== subjectId);

        setSelectedSubjects(updatedSubjects);
        setSelectedSubjectsIDs(updatedSubjectsIDs);
    };

    const handleAddChairperson = () => {
        if (selectedChairperson && !personsIDs.includes(selectedChairperson) && selectedChairpersons.length < 2) {
            const chairpersonObject = dataStaff.find(chairperson => chairperson.id === selectedChairperson);

            if (chairpersonObject) {
                setSelectedChairpersons([...selectedChairpersons, chairpersonObject.name]);
                setPersonsIDs([...personsIDs, chairpersonObject.id]);
                setSelectedChairperson('');
            }
        } else {
            alert('اختيار رئيس كنترول واحد فقط');
        }
    };

    const handleRemoveChairperson = (chairperson) => {
        const updatedChairpersons = selectedChairpersons.filter((cp) => cp !== chairperson);
        const personId = dataStaff.find((cp) => cp.name === chairperson)?.id;
        const updatedPersonsIDs = personsIDs.filter(id => id !== personId);

        setSelectedChairpersons(updatedChairpersons);
        setPersonsIDs(updatedPersonsIDs);
    };

    const handleAddCommitteeMember = () => {
        if (selectedCommitteeMember && !selectedCommitteeMembersId.includes(selectedCommitteeMember)) {
            const committeeMemberObject = dataStaff.find(chairperson => chairperson.id === selectedCommitteeMember);
            if (committeeMemberObject) {
                setSelectedCommitteeMembers([...selectedCommitteeMembers, committeeMemberObject.name]);
                setSelectedCommitteeMembersIDs([...selectedCommitteeMembersId, committeeMemberObject.id]);
                setSelectedCommitteeMember('');
            }
        } else {
            alert('This committee member is already added.');
        }
    };

    const handleRemoveCommitteeMember = (committeeMember) => {
        const updatedCommitteeMembers = selectedCommitteeMembers.filter((cm) => cm !== committeeMember);
        const committeeMemberId = dataStaff.find((cm) => cm.name === committeeMember)?.id;
        const updatedCommitteeMembersIDs = selectedCommitteeMembersId.filter(id => id !== committeeMemberId);

        setSelectedCommitteeMembers(updatedCommitteeMembers);
        setSelectedCommitteeMembersIDs(updatedCommitteeMembersIDs);
    };

    const handleIncludeMajorChange = (e) => {
        setIncludeMajor(e.target.checked);
        if (!e.target.checked) {
            setSelectedMajor('');
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
                SubjectsIds: selectedSubjectsIDs,
                UsersIds: selectedCommitteeMembersId
            };
            const jsonData = JSON.stringify(formData);
            console.log(jsonData);
            setIsLoading(true);
            const response = await axios.post(
                process.env.REACT_APP_CREATECONTROLS + fId,
                jsonData, {
                    headers: {
                        Authorization: `Bearer ${tok}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setIsLoading(false);
            console.log("Control successful:", response);
            alert("تم انشاء الكنترول بنجاح");
            
        } catch (error) {
            console.log("Control not successful:", error);

            alert("يرجي اعادة المحاولة ");
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
                            <option value="رياضة">شعبة رياضة</option>
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
                    <div className="form-group form-check">
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
                    )}
                </div>
            </div>
            <button type="submit" className="btn btn-primary" >
            إرسال
            </button>
            {isLoading ? alert("......جاري انشاء كنترول جديد"): ''}

        </form>
    );
}
