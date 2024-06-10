import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faChevronDown, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Create Control/creationControl.css";
import { Link } from 'react-router-dom';
function Edite_Control() {
  const fId = useSelector((state) => state.Profile.Fid);
  const CId = useSelector((state) => state.Profile.IdControl);
  const token = useSelector((state) => state.auth.token);
  const [dataMember, setDataMember] = useState([]);
  const [Head, setHead] = useState([]);
  const [Member, setMember] = useState([]);
  const [dataSubjectEdite, setDataSubjectEdite] = useState([]);
  //     
  // ===================================================================
  const [values, setValues] = useState({
    name: '',
    faculity_Phase: '',
    faculity_Node: '',
    start_Date: '',
    end_Date: '',
    acaD_YEAR: '',
    faculity_Semester: '',
    selectedMajor: ''
  })
  const [dataControl, setDataControl] = useState('');
  const fetchData = async () => {
    try {
      // Fetch data from the API using axios
      const response = await axios.get(`${process.env.REACT_APP_DETAILSCONTROL}${CId}`,
        {
          headers: {
            Authorization: "Bearer " + token, // Authorization token
            "Content-Type": "application/json", // Content type
          },
        });
      // Set the fetched data
      setDataControl(response.data);
      setValues({
        ...values,
        name: response.data.name,
        faculity_Phase: response.data.faculity_Phase,
        faculity_Node: response.data.faculity_Node,
        start_Date: response.data.start_Date,
        end_Date: response.data.end_Date,
        acaD_YEAR: response.data.acaD_YEAR,
        faculity_Semester: response.data.faculity_Semester,
      })

    } catch (error) {
      toast.error(error);
    }
  };
  const [selectedMajor, setSelectedMajor] = useState(dataControl.selectedMajor);
  const [includeMajor, setIncludeMajor] = useState(false);
  const [facultyNode, setFacultyNode] = useState([]);
  const getNode = useCallback(() => {
    async function getCurUser() {
      try {
        const response = await axios.get(process.env.REACT_APP_CURRENTUSER, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        // console.log(response.data);
        const facultyID = response.data.faculityLeaderID;
        try {
          const responseNode = await axios.get(
            process.env.REACT_APP_GETFACULITYNODE + facultyID,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          // console.log("Faculty node fetched successfully:", responseNode);
          setFacultyNode(responseNode.data); // Update facultyNode state here
        } catch (error) {
          // console.error("Error fetching faculty node:", error);
          toast.error("Failed to fetch faculty node. Please try again.");
        }
      } catch (error) {
        // console.error("Error fetching current user:", error);
        toast.error("Failed to fetch current user. Please try again.");
      }
    }
    getCurUser();
  }, [token]);

  useEffect(() => {
    getSubjectControl();
    fetchDataMemeber();
    getSubject();
    fetchData();
    getStaff();
    getNode();
  }, [fId, CId, token]);

  // =======================================================
  //  controlSubjectsIDs
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectsIDs, setSelectedSubjectsIDs] = useState([]);
  const [dataSubject, setDataSubject] = useState([])
  // Function to fetch subject data
  const getSubject = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_SUBJECTFACULTY + fId, // API endpoint URL
        {
          headers: {
            Authorization: "Bearer " + token, // Authorization token
            "Content-Type": "application/json", // Content type
          },
        }
      );
      setDataSubject(data);
      setDataSubjectEdite(data)
    } catch (error) {
      toast.error(error);
    }
  };
  const getSubjectControl = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_SUBJECTSOFCONTROL,
        {
          params: { Cid: CId },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Using functional updates to avoid stale closures
      setSelectedSubjects(prevSubjects => [
        ...prevSubjects,
        ...data.map(subject => subject.name)
      ]);
      setSelectedSubjectsIDs(prevIDs => [
        ...prevIDs,
        ...data.map(subject => subject.id)
      ]);
    } catch (error) {
      toast.error(error);
    }
  };

  const subjects=dataSubject
  const handleAddSubject = () => {
    if (selectedSubject && !selectedSubjectsIDs.includes(selectedSubject)) {
      const selectedSubjectObject = subjects.find(chairperson => chairperson.id === selectedSubject);

      if (selectedSubjectObject) {
        setSelectedSubjects([...selectedSubjects, selectedSubjectObject.name]);
        setSelectedSubjectsIDs([...selectedSubjectsIDs, selectedSubjectObject.id]);
        setSelectedSubject('');
      }
    } else {
      // Subject is already selected, you can show a message or handle it as per your requirement
      toast.error('غير قابل لتكرار المقرر');
    }
  }

  const handleRemoveSubject = (subject) => {
    const updatedSubject = selectedSubjects.filter((cp) => cp !== subject);
    let Subjects = dataSubject.filter((sb) => updatedSubject.find(s => s == sb.name));
    const updatedSubjectNowIDs = Subjects.map((s) => s.id);
    console.log(updatedSubjectNowIDs);
    setSelectedSubjects(updatedSubject);
    setSelectedSubjectsIDs(updatedSubjectNowIDs);


  };
  // =================================================
  // controlManagerID
  const [selectedChairperson, setSelectedChairperson] = useState('');
  const [selectedChairpersons, setSelectedChairpersons] = useState([]);
  const [personsIDs, setPersonsIDs] = useState([]);
  const [dataStaff, setDataStaff] = useState([]);
  const getStaff = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_GETUSERFORFACULITY}/${fId}`, // API endpoint URL
        {
          headers: {
            Authorization: "Bearer " + token, // Authorization token
            "Content-Type": "application/json", // Content type
          },
        }
      );
      setDataStaff(data); // Set the retrieved data to the state variable 'dataStaff'
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchDataMemeber = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_GETUSERSFORCONTROL,
        {
          params: { controlId: CId },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDataMember(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (dataMember.length === 0) return;

    const chairpersons = [];
    const chairpersonIDs = [];
    const committeeMembers = [];
    const committeeMemberIDs = [];

    for (let i = 0; i < dataMember.length; i++) {
      if (dataMember[i].jobType === "Head") {
        chairpersons.push(dataMember[i].user.name);
        chairpersonIDs.push(dataMember[i].user.id);
      } else {
        committeeMembers.push(dataMember[i].user.name);
        committeeMemberIDs.push(dataMember[i].user.id);
      }
    }

    setSelectedChairpersons((prev) => [...prev, ...chairpersons]);
    setPersonsIDs((prev) => [...prev, ...chairpersonIDs]);
    setSelectedCommitteeMembers((prev) => [...prev, ...committeeMembers]);
    setSelectedCommitteeMembersIDs((prev) => [...prev, ...committeeMemberIDs]);

  }, [dataMember]);
  // console.log("Head", Head);
  // console.log("Member",Member);
  const [chairpers, setChairpers] = useState([]);
  useEffect(() => {
    if (dataStaff && dataStaff.data) {
      console.log(dataMember, dataStaff.data);
      const temp = dataStaff.data.filter((member) => !dataMember.find(m => m.user.id == member.id));
      setChairpers([...temp]);
    }
  }, [dataStaff,dataMember ]); 
  console.log("chairpers : ", chairpers);
  const handleAddChairperson = () => {
    if (selectedChairperson && !personsIDs.includes(selectedChairperson) && selectedChairpersons.length < 1) {
      const selectedChairpersonObject = chairpers.find(chairperson => chairperson.id === selectedChairperson);

      if (selectedChairpersonObject) {
        setSelectedChairpersons([...selectedChairpersons, selectedChairpersonObject.name]);
        setPersonsIDs([...personsIDs, selectedChairpersonObject.id]);
        setSelectedChairperson('');
        setChairpers((prev) => prev.filter((m) => m.id != selectedChairperson));
      }
    } else {
      // Chairperson is already selected or the input is empty
      toast.error('اختيار رئيس كنترول واحد فقط');
    }
  };
  const handleRemoveChairperson = (chairperson) => {
    const updatedChairpersons = selectedChairpersons.filter(cp => cp !== chairperson);
    let updatedPersonsID;
    for (let index = 0; index < dataStaff.data.length; index++) {
      if (chairperson === dataStaff.data[index].name) {
        setChairpers((prev) => [...prev, dataStaff.data[index]]);
        updatedPersonsID = dataStaff.data[index].id;
        break; // Once found, exit the loop
      }
    }
    const updatedPersonsIDs = personsIDs.filter(id => id !== updatedPersonsID);
    setSelectedChairpersons(updatedChairpersons);
    setPersonsIDs(updatedPersonsIDs);
  };
  const [selectedCommitteeMember, setSelectedCommitteeMember] = useState('');
  const [selectedCommitteeMembers, setSelectedCommitteeMembers] = useState([]);
  const [selectedCommitteeMembersId, setSelectedCommitteeMembersIDs] = useState([]);
  const handleAddCommitteeMember = () => {
    if (selectedCommitteeMember && !selectedCommitteeMembersId.includes(selectedCommitteeMember)) {
      const selectedCommitteeMembersObject = chairpers.find(chairperson => chairperson.id === selectedCommitteeMember);
      if (selectedCommitteeMembersObject) {
        setSelectedCommitteeMembers([...selectedCommitteeMembers, selectedCommitteeMembersObject.name]);
        setSelectedCommitteeMembersIDs([...selectedCommitteeMembersId, selectedCommitteeMembersObject.id]);
        setSelectedCommitteeMember('');
        setChairpers((prev) =>
          prev.filter((m) => m.id != selectedCommitteeMember)
        );

      }
    }
    else {
      // committee member is already selected, you can show a message or handle it as per your requirement
      toast.error('This Member member is already added.');
    }
  };
  const handleRemoveCommitteeMember = (committeeMember) => {
    const updatedCommitteeMember = selectedCommitteeMembers.filter((cp) => cp !== committeeMember);
    let updatedcommitteeMemberID;
    for (let index = 0; index < dataStaff.data.length; index++) {
      if (committeeMember === dataStaff.data[index].name) {
        setChairpers((prev) => [...prev, dataStaff.data[index]]);
        updatedcommitteeMemberID = dataStaff.data[index].id;
        break; // Once found, exit the loop
      }
    }
    const updatedcommteeMemberIDs = selectedCommitteeMembersId.filter(id => id !== updatedcommitteeMemberID);
    setSelectedCommitteeMembers(updatedCommitteeMember);
    setSelectedCommitteeMembersIDs(updatedcommteeMemberIDs);
  };


  // ==========================================
  let controlManagerID = personsIDs[0];
  let SubjectsIds = selectedSubjectsIDs;
  let UsersIds = selectedCommitteeMembersId;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = values.name;
      const faculity_Phase = values.faculity_Phase;
      const faculity_Node = values.faculity_Node;
      const start_Date = values.start_Date;
      const end_Date = values.end_Date;
      const acaD_YEAR = values.acaD_YEAR;
      const faculity_Semester = values.faculity_Semester;
      const formData = { name, faculity_Phase, faculity_Node, start_Date, end_Date, acaD_YEAR, faculity_Semester, controlManagerID, SubjectsIds, UsersIds };
      const jsonData = JSON.stringify(formData);

      console.log(jsonData);
      console.log(formData);
      // // Make a POST request to the authentication endpoint
      const response = await axios.put(
        `${process.env.REACT_APP_EDITECONTROL}${CId}`,
        jsonData, {
        params: { cid: CId }, // Parameters passed to the API endpoint
        headers: {
          Authorization: "Bearer " + token, // Authorization token
          "Content-Type": "application/json",
        },
      }
      );
      // Handle successful login
      toast.success(response.data);

    } catch (error) {
      toast.error(error);
    }
  };
  //-===================================-=======================-==================
  
  return (
    <>
    <Link className="return-link" to="/Admin_Faculity/"><FontAwesomeIcon icon={faUndo} /> الرجوع</Link>
      <form onSubmit={handleSubmit}>
        <div className="row m-5 rtl">
          <div className="mb-5 col-md justify-content-center">
            <div className="form-group">
              <label htmlFor="controlName">اسم الكنترول</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
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
                value={values.acaD_YEAR}
                onChange={(e) => setValues({ ...values, acaD_YEAR: e.target.value })}
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
                value={values.faculity_Semester}
                onChange={(e) => setValues({ ...values, faculity_Semester: e.target.value })}
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
                value={values.faculity_Phase}
                onChange={(e) => setValues({ ...values, faculity_Phase: e.target.value })}
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
                value={values.faculity_Node}
                onChange={(e) => setValues({ ...values, faculity_Node: e.target.value })}
                style={{ backgroundColor: '#E1E1E1', color: 'black' }}
              >
                {facultyNode.map(fn => {
                    return (
                        <option key={fn.id} value={fn.id}>
                        {fn.name}
                        </option>
                    );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">تاريخ البداية</label>
              <input
                type="datetime-local"
                className="form-control"
                id="startDate"
                name="startDate"
                value={values.start_Date}
                onChange={(e) => setValues({ ...values, start_Date: e.target.value })}
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
                value={values.end_Date}
                onChange={(e) => setValues({ ...values, end_Date: e.target.value })}
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
                  {chairpers &&
                    chairpers.map((chairperson, index) => (
                      <option key={index} value={chairperson.id}>
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
                  {chairpers &&
                    chairpers.map((committeeMember, index) => (
                      <option key={index} value={committeeMember.id}>
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
                  {dataSubject.filter(sb => sb.faculityNodeID === values.faculity_Node).map((subject, index) => (
                    <option key={index} value={subject.id}>
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
          </div>
        </div>
        <div className='text-center'>
          <button type="submit" className="btn-control" >
            تعديل
          </button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
}

export default Edite_Control